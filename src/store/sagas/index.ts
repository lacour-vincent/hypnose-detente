import { all } from "redux-saga/effects";

import alerting from "@/store/sagas/alerting";
import battery from "@/store/sagas/battery";
import player from "@/store/sagas/player";
import recording from "@/store/sagas/recording";
import storage from "@/store/sagas/storage";

export default function* () {
  yield all([alerting(), battery(), player(), recording(), storage()]);
}
