import { createReducer } from "@reduxjs/toolkit";

import type { Alert } from "@/typings/alerting";

import { addAlert, removeAlert } from "@/store/actions/alerting";

export type AlertingState = Alert[];

const initialState: AlertingState = [];

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(addAlert, (state, action) => {
      state = state.concat(action.payload.alert);
      return state;
    })
    .addCase(removeAlert, (state, action) => {
      state = state.filter(({ id }) => action.payload.alert.id !== id);
      return state;
    });
});
