import type { SagaIterator } from "redux-saga";
import { all, call, getContext, put, takeLeading } from "redux-saga/effects";

import type { Sample } from "@/typings/recording";

import type { Context } from "@/store/context";

import { retrieveSampleById, retrieveSamples } from "../actions/recording";

function* handleRetrieveSamples(): SagaIterator {
  const repositories: Context["repositories"] = yield getContext("repositories");
  try {
    const samples: Sample[] = yield call(repositories.recording.fetchSamples);
    yield put(retrieveSamples.success({ samples }));
  } catch (err: unknown) {
    yield put(retrieveSamples.failure({ err }));
  }
}

function* handleRetrieveSampleById(action: ReturnType<typeof retrieveSampleById.request>): SagaIterator {
  const repositories: Context["repositories"] = yield getContext("repositories");
  try {
    const sample: Sample = yield call(repositories.recording.fetchSampleById, action.payload.id);
    yield put(retrieveSampleById.success({ sample }));
  } catch (err: unknown) {
    yield put(retrieveSampleById.failure({ err }));
  }
}

export default function* () {
  yield all([
    takeLeading(retrieveSamples.request, handleRetrieveSamples),
    takeLeading(retrieveSampleById.request, handleRetrieveSampleById),
  ]);
}
