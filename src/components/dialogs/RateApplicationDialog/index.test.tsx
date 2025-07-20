import React from "react";

import { openDialog } from "@/store/actions/dialog";

import { DialogId } from "@/referential/dialog";
import { render } from "@/testing/react-native";
import { createTestStore } from "@/testing/store";

import RateApplicationDialog from "./index";

describe("<RateApplicationDialog />", () => {
  it("should render without crashing", () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.RATE_APPLICATION }));
    const { getByText, getByRole } = render(<RateApplicationDialog />, { store });
    expect(getByText("Donnez-nous votre avis !")).toBeDefined();
    expect(getByText(/Si vous souhaitez soutenir notre application/)).toBeDefined();
    expect(getByRole("button", { name: "PLUS TARD" })).toBeDefined();
    expect(getByRole("button", { name: "NOTATION" })).toBeDefined();
  });

  it("should close the dialog by pressing 'PLUS TARD'", async () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.RATE_APPLICATION }));
    const { queryByText, getByRole, event } = render(<RateApplicationDialog />, { store });
    expect(queryByText("Donnez-nous votre avis !")).toBeDefined();
    await event.press(getByRole("button", { name: "PLUS TARD" }));
    expect(queryByText("Donnez-nous votre avis !")).toBeNull();
  });

  it("should close the dialog by pressing 'NOTATION'", async () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.RATE_APPLICATION }));
    const { queryByText, getByRole, event } = render(<RateApplicationDialog />, { store });
    expect(queryByText("Donnez-nous votre avis !")).toBeDefined();
    await event.press(getByRole("button", { name: "NOTATION" }));
    expect(queryByText("Donnez-nous votre avis !")).toBeNull();
  });
});
