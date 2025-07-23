import React from "react";

import { render } from "@/testing/react-native";

import AudioPlayer from "./index";

describe("<AudioPlayer />", () => {
  it("should render without crashing", () => {
    const props = {};
    const { getByTestId, getByRole } = render(<AudioPlayer {...props} />);
    expect(getByTestId("slider")).toBeDefined();
    expect(getByRole("button", { name: "Lecture" })).toBeDefined();
    expect(getByTestId("play")).toBeDefined();
  });
});
