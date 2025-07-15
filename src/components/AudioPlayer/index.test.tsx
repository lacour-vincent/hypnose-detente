import React from "react";

import { render } from "@/testing/react-native";

import AudioPlayer from "./index";

describe("<AudioPlayer />", () => {
  it("should render without crashing", async () => {
    const props = {};
    const { findByTestId, getByTestId, getByRole } = render(<AudioPlayer {...props} />);
    expect(await findByTestId("play")).toBeDefined();
    expect(getByTestId("slider")).toBeDefined();
    expect(getByRole("button", { name: "Lecture" })).toBeDefined();
  });
});
