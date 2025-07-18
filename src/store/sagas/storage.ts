import type { SagaIterator } from "redux-saga";
import { all, call, getContext, put, takeLeading } from "redux-saga/effects";

import type { AssetPackStates } from "@/typings/storage";

import { retrieveAssetPackStates } from "@/store/actions/storage";
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

export default function* () {
  yield all([takeLeading(retrieveAssetPackStates.request, handleRetrieveAssetPackStates)]);
}
