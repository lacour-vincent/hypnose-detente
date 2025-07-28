import { type EventChannel, type SagaIterator, eventChannel } from "redux-saga";
import { all, call, getContext, put, take, takeEvery, takeLeading } from "redux-saga/effects";

import { type AssetPack, type AssetPackState, type AssetPackStates, AssetPackStatus } from "@/typings/storage";

import { retrieveAssetPack, retrieveAssetPackStates } from "@/store/actions/storage";
import type { Context } from "@/store/context";

import { AssetPackError } from "@/referential/errors";

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
  const { pack, network } = action.payload;
  const retrieval = network ? retrieveAssetPackFromNetwork : retrieveAssetPackFromStorage;
  yield call(retrieval, pack);
}

function createOnAssetPackStateUpdateChannel(
  pack: AssetPack["name"],
  storage: Context["repositories"]["storage"],
): EventChannel<AssetPackState> {
  return eventChannel((emitter) => {
    const listener = (state: AssetPackState) => {
      if (state.name === pack) emitter(state);
    };
    storage.addAssetPackStateUpdateListener(listener);
    return () => {
      storage.removeAssetPackStateUpdateListener();
    };
  });
}

function* retrieveAssetPackFromNetwork(pack: AssetPack): SagaIterator {
  const repositories: Context["repositories"] = yield getContext("repositories");
  const channel: EventChannel<AssetPackState> = yield call(
    createOnAssetPackStateUpdateChannel,
    pack.name,
    repositories.storage,
  );
  try {
    yield call(repositories.storage.fetchAssetPack, pack);
    while (true) {
      const state: AssetPackState = yield take(channel);
      if (state.status === AssetPackStatus.UNKNOWN) continue;
      if (state.status === AssetPackStatus.PENDING) continue;
      if (state.status === AssetPackStatus.DOWNLOADING) continue;
      if (state.status === AssetPackStatus.TRANSFERRING) continue;
      if (state.status === AssetPackStatus.COMPLETED) break;
      if (state.status === AssetPackStatus.FAILED) throw new AssetPackError(state.errorCode);
      if (state.status === AssetPackStatus.CANCELED) throw new Error();
      if (state.status === AssetPackStatus.WAITING_FOR_WIFI) continue;
      if (state.status === AssetPackStatus.NOT_INSTALLED) continue;
      if (state.status === AssetPackStatus.REQUIRES_USER_CONFIRMATION) continue;
      throw new Error();
    }
    const file: string = yield call(repositories.storage.fetchAssetPackFileLocation, pack);
    yield put(retrieveAssetPack.success({ pack: { ...pack, file } }));
  } catch (err: unknown) {
    yield put(retrieveAssetPack.failure({ err }));
  } finally {
    channel.close();
  }
}

function* retrieveAssetPackFromStorage(pack: AssetPack): SagaIterator {
  const repositories: Context["repositories"] = yield getContext("repositories");
  try {
    const file: string = yield call(repositories.storage.fetchAssetPackFileLocation, pack);
    yield put(retrieveAssetPack.success({ pack: { ...pack, file } }));
  } catch (err: unknown) {
    yield put(retrieveAssetPack.failure({ err }));
  }
}

export default function* () {
  yield all([
    takeLeading(retrieveAssetPackStates.request, handleRetrieveAssetPackStates),
    takeEvery(retrieveAssetPack.request, handleRetrieveAssetPack),
  ]);
}
