import React from "react";

import { render } from "@/testing/render";

import SampleHeader from "./index";

describe("<SampleHeader />", () => {
  it("should render header right without crashing", () => {
    const { getByRole, getByTestId } = render(<SampleHeader.HeaderRight />);
    expect(getByRole("button", { name: "Information" })).toBeDefined();
    expect(getByTestId("information-outline")).toBeDefined();
  });
});
