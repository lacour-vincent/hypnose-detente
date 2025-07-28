import { PermissionsAndroid } from "react-native";

import { type EventChannel, type SagaIterator, eventChannel } from "redux-saga";
import { all, call, cancel, fork, getContext, put, select, take, takeLeading } from "redux-saga/effects";

import { type PlayerState, PlayerStatus } from "@/typings/player";

import {
  onPlayerStateEnded,
  onPlayerStateUpdate,
  pause,
  play,
  prepare,
  release,
  seekTo,
  startListenPlayerState,
  stopListenPlayerState,
} from "@/store/actions/player";
import type { Context } from "@/store/context";
import { getSelectedSample } from "@/store/selectors/recording";

function createOnPlayerStateUpdateChannel(player: Context["services"]["player"]): EventChannel<PlayerState> {
  return eventChannel((emitter) => {
    const listener = (event: PlayerState) => {
      emitter(event);
    };
    player.addPlayerStateListener(listener);
    return () => {
      player.removePlayerStateListener();
    };
  });
}

function* handlePreparePlayer(action: ReturnType<typeof prepare.request>): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  try {
    yield call(services.player.prepare, action.payload.file);
    const channel: EventChannel<PlayerState> = yield call(createOnPlayerStateUpdateChannel, services.player);
    while (true) {
      const state: PlayerState = yield take(channel);
      if (state.status === PlayerStatus.BUFFERING) continue;
      if (state.status === PlayerStatus.READY) break;
      if (state.status === PlayerStatus.IDLE) break;
      if (state.status === PlayerStatus.ENDED) break;
    }
    channel.close();
    const state: PlayerState = yield call(services.player.getPlayerState);
    if (state.status !== PlayerStatus.READY) throw new Error();
    yield put(prepare.success({ state }));
  } catch (err: unknown) {
    yield put(prepare.failure({ err }));
  }
}

function* handleReleasePlayer(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  yield put(stopListenPlayerState());
  yield call(services.player.setPause);
  yield call(services.player.release);
}

function* handlePlay(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  const sample = getSelectedSample(yield select());
  yield call(services.permissions.request, PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  yield call(services.player.setPlay);
  yield call(services.foreground.start, sample.label);
  yield put(startListenPlayerState());
  yield put(play.success());
}

function* handlePause(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  yield call(services.player.setPause);
  yield call(services.foreground.stop);
  yield put(stopListenPlayerState());
}

function* handleSeekTo(action: ReturnType<typeof seekTo>): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  yield call(services.player.seekTo, action.payload.position);
}

function* handleOnPlayerStateEnded(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  yield call(services.player.setPause);
  yield call(services.player.seekTo, 0);
  yield call(services.foreground.stop);
  yield put(stopListenPlayerState());
}

function* handleListenPlayerState(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  const channel: EventChannel<PlayerState> = yield call(createOnPlayerStateUpdateChannel, services.player);
  try {
    while (true) {
      const state: PlayerState = yield take(channel);
      yield put(onPlayerStateUpdate({ state }));
      const isEnded = state.status === PlayerStatus.ENDED;
      if (isEnded) yield put(onPlayerStateEnded());
    }
  } finally {
    channel.close();
  }
}

function* handleStartListenPlayerState(): SagaIterator {
  const task = yield fork(handleListenPlayerState);
  yield take(stopListenPlayerState);
  yield cancel(task);
}

export default function* () {
  yield all([
    takeLeading(prepare.request, handlePreparePlayer),
    takeLeading(release, handleReleasePlayer),
    takeLeading(play.request, handlePlay),
    takeLeading(pause, handlePause),
    takeLeading(seekTo, handleSeekTo),
    takeLeading(onPlayerStateEnded, handleOnPlayerStateEnded),
    takeLeading(startListenPlayerState, handleStartListenPlayerState),
  ]);
}
