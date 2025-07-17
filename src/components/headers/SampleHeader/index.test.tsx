import React from "react";

import { render } from "@/testing/render";

import SampleHeader from "./index";

describe("<SampleHeader />", () => {
  it("should render header right without crashing", async () => {
    const { findByTestId, getByRole } = render(<SampleHeader.HeaderRight />);
    expect(await findByTestId("information-outline")).toBeDefined();
    expect(getByRole("button", { name: "Information" })).toBeDefined();
  });
});
