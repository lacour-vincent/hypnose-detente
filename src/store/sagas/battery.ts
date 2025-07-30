import type { SagaIterator } from "redux-saga";
import { all, call, getContext, put, takeLeading } from "redux-saga/effects";

import { ignoreBatteryOptimizations } from "@/store/actions/battery";
import type { Context } from "@/store/context";

import { addSuccess } from "../actions/alerting";

function* handleIgnoreBatteryOptimizations(): SagaIterator {
  const services: Context["services"] = yield getContext("services");
  try {
    const ignoring: boolean = yield call(services.battery.isIgnoringBatteryOptimizations);
    if (ignoring) throw new Error("Already ignoring battery optimizations.");
    yield call(services.battery.requestIgnoreBatteryOptimizations);
    yield put(ignoreBatteryOptimizations.success());
  } catch (err: unknown) {
    yield put(addSuccess("L'optimisation de la batterie est désactivée sur votre appareil."));
    yield put(ignoreBatteryOptimizations.failure({ err }));
  }
}

export default function* () {
  yield all([takeLeading(ignoreBatteryOptimizations.request, handleIgnoreBatteryOptimizations)]);
}
