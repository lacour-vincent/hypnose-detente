import { type EventChannel, type SagaIterator, eventChannel } from "redux-saga";
import { all, call, cancel, delay, fork, getContext, put, take, takeLeading } from "redux-saga/effects";

import { type PlayerState, PlayerStatus, type onPlayerStatusUpdateEvent } from "@/typings/player";

import {
  onPlayerStateUpdate,
  pause,
  play,
  prepare,
  release,
  seekTo,
  startPullPlayerState,
  stopPullPlayerState,
} from "@/store/actions/player";
import type { Context } from "@/store/context";

import { PULL_PLAYER_STATE_DELAY_IN_MS } from "@/referential/player";

function createOnPlayerStatusUpdateChannel(
  player: Context["services"]["player"],
): EventChannel<onPlayerStatusUpdateEvent> {
  return eventChannel((emitter) => {
    const listener = (event: onPlayerStatusUpdateEvent) => {
      emitter(event);
    };
    player.onPlayerStatusUpdate(listener);
    return () => {};
  });
}

function* handlePreparePlayer(action: ReturnType<typeof prepare.request>): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  const channel = yield call(createOnPlayerStatusUpdateChannel, services.player);
  try {
    yield call(services.player.prepare, action.payload.file);
    while (true) {
      const event: onPlayerStatusUpdateEvent = yield take(channel);
      if (event.status === PlayerStatus.STATE_READY) break;
      if (event.status === PlayerStatus.STATE_BUFFERING) continue;
      if (event.status === PlayerStatus.STATE_IDLE) throw new Error();
      if (event.status === PlayerStatus.STATE_ENDED) throw new Error();
      throw new Error();
    }
    const state: PlayerState = yield call(services.player.getPlayerState);
    yield put(prepare.success({ state }));
  } catch (err: unknown) {
    yield put(prepare.failure({ err }));
  } finally {
    channel.close();
  }
}

function* handleReleasePlayer(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  yield put(stopPullPlayerState());
  yield call(services.player.release);
}

function* handlePlay(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  yield call(services.player.setPlay);
  yield put(startPullPlayerState());
}

function* handlePause(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  yield call(services.player.setPause);
  yield put(stopPullPlayerState());
}

function* handleSeekTo(action: ReturnType<typeof seekTo>): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  yield call(services.player.seekTo, action.payload.position);
  const state: PlayerState = yield call(services.player.getPlayerState);
  yield put(onPlayerStateUpdate({ state }));
}

function* handlePullPlayerState(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  while (true) {
    yield delay(PULL_PLAYER_STATE_DELAY_IN_MS);
    const state: PlayerState = yield call(services.player.getPlayerState);
    yield put(onPlayerStateUpdate({ state }));
  }
}

function* handleStartPullPlayerState(): SagaIterator {
  const task = yield fork(handlePullPlayerState);
  yield take(stopPullPlayerState);
  yield cancel(task);
}

export default function* () {
  yield all([
    takeLeading(prepare.request, handlePreparePlayer),
    takeLeading(release, handleReleasePlayer),
    takeLeading(play, handlePlay),
    takeLeading(pause, handlePause),
    takeLeading(seekTo, handleSeekTo),
    takeLeading(startPullPlayerState, handleStartPullPlayerState),
  ]);
}
