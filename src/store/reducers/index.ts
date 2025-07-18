import { type UnknownAction, combineReducers } from "@reduxjs/toolkit";

import actions, { type ActionsState } from "@/store/reducers/actions";
import alerting, { type AlertingState } from "@/store/reducers/alerting";
import dialog, { type DialogState } from "@/store/reducers/dialog";
import recording, { type RecordingState } from "@/store/reducers/recording";
import storage, { type StorageState } from "@/store/reducers/storage";

export interface State {
  actions: ActionsState;
  alerting: AlertingState;
  dialog: DialogState;
  recording: RecordingState;
  storage: StorageState;
}

const createRootReducer = () => (state: State | undefined, action: UnknownAction) => {
  return combineReducers({ actions, alerting, dialog, recording, storage })(state, action);
};

export default createRootReducer;
