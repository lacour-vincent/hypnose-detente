import { createRequestAction } from "@sg/store/actions";
import { addSuccess, removeAlert } from "@sg/store/actions/alerting";
import { getAlerting } from "@sg/store/selectors/alerting";

import StoreTester from "./index";

describe("Store - alerting", () => {
  let store: StoreTester;

  beforeEach(() => {
    store = new StoreTester();
  });

  it("should perform add alert action", () => {
    const action = addSuccess("success-message");
    expect(getAlerting(store.getState())).toHaveLength(0);
    store.dispatch(action);
    expect(getAlerting(store.getState())).toHaveLength(1);
  });

  it("should perform remove alert action", () => {
    const action = addSuccess("success-message");
    store.dispatch(action);
    expect(getAlerting(store.getState())).toHaveLength(1);
    store.dispatch(removeAlert({ alert: action.payload.alert }));
    expect(getAlerting(store.getState())).toHaveLength(0);
  });

  it("should perform any success action", () => {
    const action = createRequestAction("REQUEST_ACTION");
    expect(getAlerting(store.getState())).toHaveLength(0);
    store.dispatch(action.success());
    expect(getAlerting(store.getState())).toHaveLength(0);
  });

  it("should perform any failure action", () => {
    const action = createRequestAction("REQUEST_ACTION");
    expect(getAlerting(store.getState())).toHaveLength(0);
    store.dispatch(action.failure({ err: new Error("failure") }));
    expect(getAlerting(store.getState())).toHaveLength(1);
  });
});
