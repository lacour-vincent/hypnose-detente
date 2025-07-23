import React from "react";

import { render } from "@/testing/render";

import SamplesHeader from "./index";

describe("<SamplesHeader />", () => {
  it("should render header right without crashing", () => {
    const { getByRole, getByTestId } = render(<SamplesHeader.HeaderRight />);
    expect(getByRole("button", { name: "Notation" })).toBeDefined();
    expect(getByTestId("star")).toBeDefined();
    expect(getByRole("button", { name: "Menu" })).toBeDefined();
    expect(getByTestId("dots-vertical")).toBeDefined();
  });
});
