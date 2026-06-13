import React from "react";

import { prepare } from "@/store/actions/player";

import { PLAYER_STATE_MOCK } from "@/fixtures/player";
import { render, screen } from "@/testing/react-native";
import { createTestStore } from "@/testing/store";

import AudioPlayer from "./index";

describe("<AudioPlayer />", () => {
  it("should render with unready player", async () => {
    await render(<AudioPlayer />);
    expect(screen.getAllByText("00:00")).toHaveLength(2);
    expect(screen.getByTestId("slider")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Lecture" })).toBeDisabled();
    expect(screen.getByTestId("play")).toBeDefined();
  });

  it("should render with ready player", async () => {
    const store = createTestStore();
    store.dispatch(prepare.success({ state: PLAYER_STATE_MOCK }));
    await render(<AudioPlayer />, { store });
    expect(screen.getByText("00:00")).toBeDefined();
    expect(screen.getByTestId("slider")).toBeEnabled();
    expect(screen.getByText("20:00")).toBeDefined();
    expect(screen.getByRole("button", { name: "Lecture" })).toBeEnabled();
    expect(screen.getByTestId("play")).toBeDefined();
  });
});
