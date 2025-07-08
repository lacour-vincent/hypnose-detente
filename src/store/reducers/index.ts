import { type UnknownAction, combineReducers } from "@reduxjs/toolkit";

import actions, { type ActionsState } from "@sg/store/reducers/actions";
import alerting, { type AlertingState } from "@sg/store/reducers/alerting";
import recording, { type RecordingState } from "@sg/store/reducers/recording";

export interface State {
  actions: ActionsState;
  alerting: AlertingState;
  recording: RecordingState;
}

const createRootReducer = () => (state: State | undefined, action: UnknownAction) => {
  return combineReducers({ actions, alerting, recording })(state, action);
};

export default createRootReducer;
