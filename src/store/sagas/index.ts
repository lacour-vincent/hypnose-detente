import { all } from "redux-saga/effects";

import alerting from "@/store/sagas/alerting";
import recording from "@/store/sagas/recording";
import storage from "@/store/sagas/storage";

export default function* () {
  yield all([alerting(), recording(), storage()]);
}
