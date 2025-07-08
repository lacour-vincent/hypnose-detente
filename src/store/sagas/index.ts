import { all } from "redux-saga/effects";

import alerting from "@sg/store/sagas/alerting";
import recording from "@sg/store/sagas/recording";

export default function* () {
  yield all([alerting(), recording()]);
}
