import React from "react";

import { render } from "@/testing/react-native";

import AudioPlayer from "./index";

describe("<AudioPlayer />", () => {
  it("should render without crashing", async () => {
    const props = {};
    const { getByRole } = render(<AudioPlayer {...props} />);
    expect(getByRole("button", { name: "Lecture" })).toBeDefined();
  });
});
