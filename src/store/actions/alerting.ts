import { nanoid } from "@reduxjs/toolkit";

import { type Alert, AlertLevel } from "@/typings/alerting";

import { createPayloadAction } from "@/store/actions";

export const addAlert = createPayloadAction<{ alert: Alert }>("ADD_ALERT");

export const addSuccess = (message: Alert["message"]) => {
  const alert: Alert = { id: nanoid(), level: AlertLevel.SUCCESS, message };
  return addAlert({ alert });
};

export const addError = (message: Alert["message"]) => {
  const alert: Alert = { id: nanoid(), level: AlertLevel.ERROR, message };
  return addAlert({ alert });
};

export const removeAlert = createPayloadAction<{ alert: Alert }>("REMOVE_ALERT");
