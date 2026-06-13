import React from "react";

import { openDialog } from "@/store/actions/dialog";

import { DialogId } from "@/referential/dialog";
import { render, screen } from "@/testing/react-native";
import { createTestStore } from "@/testing/store";

import RateApplicationDialog from "./index";

describe("<RateApplicationDialog />", () => {
  it("should render without crashing", async () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.RATE_APPLICATION }));
    await render(<RateApplicationDialog />, { store });
    expect(screen.getByText("Donnez-nous votre avis !")).toBeDefined();
    expect(screen.getByText(/Si vous souhaitez soutenir notre application/)).toBeDefined();
    expect(screen.getByRole("button", { name: "PLUS TARD" })).toBeDefined();
    expect(screen.getByRole("button", { name: "NOTATION" })).toBeDefined();
  });

  it("should close the dialog by pressing 'PLUS TARD'", async () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.RATE_APPLICATION }));
    const { event } = await render(<RateApplicationDialog />, { store });
    expect(screen.queryByText("Donnez-nous votre avis !")).toBeDefined();
    await event.press(screen.getByRole("button", { name: "PLUS TARD" }));
    expect(screen.queryByText("Donnez-nous votre avis !")).toBeNull();
  });

  it("should close the dialog by pressing 'NOTATION'", async () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.RATE_APPLICATION }));
    const { event } = await render(<RateApplicationDialog />, { store });
    expect(screen.queryByText("Donnez-nous votre avis !")).toBeDefined();
    await event.press(screen.getByRole("button", { name: "NOTATION" }));
    expect(screen.queryByText("Donnez-nous votre avis !")).toBeNull();
  });
});
