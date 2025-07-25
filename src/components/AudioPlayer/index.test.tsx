import React from "react";

import { prepare } from "@/store/actions/player";

import { PLAYER_STATE_MOCK } from "@/fixtures/player";
import { render } from "@/testing/react-native";
import { createTestStore } from "@/testing/store";

import AudioPlayer from "./index";

describe("<AudioPlayer />", () => {
  it("should render with unready player", () => {
    const { getAllByText, getByTestId, getByRole } = render(<AudioPlayer />);
    expect(getAllByText("00:00")).toHaveLength(2);
    expect(getByTestId("slider")).toBeDisabled();
    expect(getByRole("button", { name: "Lecture" })).toBeDisabled();
    expect(getByTestId("play")).toBeDefined();
  });

  it("should render with ready player", () => {
    const store = createTestStore();
    store.dispatch(prepare.success({ state: PLAYER_STATE_MOCK }));
    const { getByText, getByTestId, getByRole } = render(<AudioPlayer />, { store });
    expect(getByText("00:00")).toBeDefined();
    expect(getByTestId("slider")).toBeEnabled();
    expect(getByText("20:00")).toBeDefined();
    expect(getByRole("button", { name: "Lecture" })).toBeEnabled();
    expect(getByTestId("play")).toBeDefined();
  });
});
