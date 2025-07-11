import type { SagaIterator } from "redux-saga";
import { all, call, getContext, put, takeLeading } from "redux-saga/effects";

import type { Sample } from "@/typings/recording";

import type { Context } from "@/store/context";

import { retrieveSampleById, retrieveSamples } from "../actions/recording";

function* handleRetrieveSamples(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  try {
    const samples: Sample[] = yield call(services.recording.fetchSamples);
    yield put(retrieveSamples.success({ samples }));
  } catch (err: unknown) {
    yield put(retrieveSamples.failure({ err }));
  }
}

function* handleRetrieveSampleById(action: ReturnType<typeof retrieveSampleById.request>): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  try {
    const sample: Sample = yield call(services.recording.fetchSampleById, action.payload.id);
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
