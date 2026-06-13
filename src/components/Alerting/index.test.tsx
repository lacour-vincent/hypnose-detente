import React from "react";

import { addError, addSuccess } from "@/store/actions/alerting";

import { render, screen } from "@/testing/react-native";
import { createTestStore } from "@/testing/store";

import Alerting from "./index";

describe("<Alerting />", () => {
  it("should render no alerts", async () => {
    const store = createTestStore();
    await render(<Alerting />, { store });
    expect(screen.queryByRole("button", { name: "fermer" })).not.toBeOnTheScreen();
  });

  it("should render one alert without crashing", async () => {
    const store = createTestStore();
    store.dispatch(addSuccess("success-message"));
    await render(<Alerting />, { store });
    await screen.findByRole("button", { name: "fermer" });

    expect(screen.getByText("success-message")).toBeOnTheScreen();
    expect(screen.getByRole("button", { name: "fermer" })).toBeEnabled();
  });

  it("should render multiple alerts without crashing", async () => {
    const store = createTestStore();
    const actions = [addSuccess("alert-message-0"), addError("alert-message-1"), addSuccess("alert-message-2")];
    actions.forEach((action) => store.dispatch(action));
    await render(<Alerting />, { store });
    expect(await screen.findAllByRole("button", { name: "fermer" })).toHaveLength(actions.length);
  });

  it("should remove alerts without crashing", async () => {
    const store = createTestStore();
    store.dispatch(addSuccess("success-message"));
    const { event } = await render(<Alerting />, { store });
    await screen.findByRole("button", { name: "fermer" });

    await event.press(screen.getByRole("button", { name: "fermer" }));
    expect(screen.queryByRole("button", { name: "fermer" })).not.toBeOnTheScreen();
  });
});
