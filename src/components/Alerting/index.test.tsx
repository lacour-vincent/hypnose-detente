import React from "react";

import { render } from "@sg/testing/react-native";
import { createTestStore } from "@sg/testing/store";

import { addError, addSuccess } from "@sg/store/actions/alerting";

import Alerting from "./index";

describe("<Alerting />", () => {
  it("should render no alerts", async () => {
    const store = createTestStore();
    const { queryByRole } = render(<Alerting />, { store });
    expect(queryByRole("button", { name: "fermer" })).not.toBeOnTheScreen();
  });

  it("should render one alert without crashing", async () => {
    const store = createTestStore();
    store.dispatch(addSuccess("success-message"));
    const { findByRole, getByText, getByRole } = render(<Alerting />, { store });
    await findByRole("button", { name: "fermer" });

    expect(getByText("success-message")).toBeOnTheScreen();
    expect(getByRole("button", { name: "fermer" })).toBeEnabled();
  });

  it("should render multiple alerts without crashing", async () => {
    const store = createTestStore();
    const actions = [addSuccess("alert-message-0"), addError("alert-message-1"), addSuccess("alert-message-2")];
    actions.forEach((action) => store.dispatch(action));
    const { findAllByRole } = render(<Alerting />, { store });
    expect(await findAllByRole("button", { name: "fermer" })).toHaveLength(actions.length);
  });

  it("should remove alerts without crashing", async () => {
    const store = createTestStore();
    store.dispatch(addSuccess("success-message"));
    const { findByRole, getByRole, queryByRole, event } = render(<Alerting />, { store });
    await findByRole("button", { name: "fermer" });

    await event.press(getByRole("button", { name: "fermer" }));
    expect(queryByRole("button", { name: "fermer" })).not.toBeOnTheScreen();
  });
});
