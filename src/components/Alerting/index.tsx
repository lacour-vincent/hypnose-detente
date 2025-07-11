import React, { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { type Alert, AlertLevel } from "@sg/typings/alerting";

import { removeAlert } from "@sg/store/actions/alerting";
import { getAlerting } from "@sg/store/selectors/alerting";

import Snackbar from "@ui/Snackbar";

const VARIANT_FROM_ALERT_LEVEL: Record<Alert["level"], "primary" | "secondary"> = {
  [AlertLevel.SUCCESS]: "primary",
  [AlertLevel.ERROR]: "secondary",
};

const Alerting: FC = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(getAlerting);
  const onClose = (alert: Alert) => () => dispatch(removeAlert({ alert }));
  if (alerts.length === 0) return null;
  return (
    <>
      {alerts.map((alert) => {
        const variant = VARIANT_FROM_ALERT_LEVEL[alert.level];
        return <Snackbar key={alert.id} variant={variant} message={alert.message} onClose={onClose(alert)} />;
      })}
    </>
  );
};

export default Alerting;
