import { type EventChannel, type SagaIterator, eventChannel } from "redux-saga";
import { all, call, getContext, put, take, takeEvery, takeLeading } from "redux-saga/effects";

import { type AssetPack, type AssetPackState, type AssetPackStates, AssetPackStatus } from "@/typings/storage";

import { retrieveAssetPack, retrieveAssetPackStates } from "@/store/actions/storage";
import type { Context } from "@/store/context";

function* handleRetrieveAssetPackStates(action: ReturnType<typeof retrieveAssetPackStates.request>): SagaIterator {
  const repositories: Context["repositories"] = yield getContext("repositories");
  try {
    const states: AssetPackStates = yield call(repositories.storage.fetchAssetPackStates, action.payload.packs);
    yield put(retrieveAssetPackStates.success({ states }));
  } catch (err: unknown) {
    yield put(retrieveAssetPackStates.failure({ err }));
  }
}

function* handleRetrieveAssetPack(action: ReturnType<typeof retrieveAssetPack.request>): SagaIterator {
  const repositories: Context["repositories"] = yield getContext("repositories");
  const { pack } = action.payload;
  const channel: EventChannel<AssetPackState> = yield call(
    createOnAssetPackStateUpdateChannel,
    pack.name,
    repositories.storage,
  );
  try {
    yield call(repositories.storage.fetchAssetPack, pack);
    while (true) {
      const state: AssetPackState = yield take(channel);
      if (state.status === AssetPackStatus.COMPLETED) break;
      // CASE ERROR MANAGEMENT
    }
    const file: string = yield call(repositories.storage.fetchAssetPackFileLocation, pack);
    yield put(retrieveAssetPack.success({ pack: { ...pack, file } }));
  } catch (err: unknown) {
    yield put(retrieveAssetPack.failure({ err }));
  } finally {
    channel.close();
  }
}

function createOnAssetPackStateUpdateChannel(
  pack: AssetPack["name"],
  storage: Context["repositories"]["storage"],
): EventChannel<AssetPackState> {
  return eventChannel((emitter) => {
    const listener = (state: AssetPackState) => {
      if (state.name === pack) emitter(state);
    };
    storage.onAssetPackStateUpdate(listener);
    return () => {};
  });
}

export default function* () {
  yield all([
    takeLeading(retrieveAssetPackStates.request, handleRetrieveAssetPackStates),
    takeEvery(retrieveAssetPack.request, handleRetrieveAssetPack),
  ]);
}
