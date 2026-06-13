import React from "react";

import { render, screen } from "@/testing/react-native";

import SampleHeader from "./index";

describe("<SampleHeader />", () => {
  it("should render header right without crashing", async () => {
    await render(<SampleHeader.HeaderRight />);
    expect(screen.getByRole("button", { name: "Information" })).toBeDefined();
    expect(screen.getByTestId("information-outline")).toBeDefined();
  });
});
