import { all } from "redux-saga/effects";

import alerting from "@/store/sagas/alerting";
import recording from "@/store/sagas/recording";

export default function* () {
  yield all([alerting(), recording()]);
}
