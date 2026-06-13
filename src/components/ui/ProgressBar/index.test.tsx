import React from "react";

import { render, screen } from "@/testing/react-native";

import ProgressBar from "./index";

describe("<ProgressBar />", () => {
  it("should render without crashing", async () => {
    await render(<ProgressBar />);
    expect(screen.getByRole("progressbar")).toBeDefined();
  });
});
