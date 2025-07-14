import React from "react";

import { render } from "@/testing/render";

import SampleHeader from "./index";

describe("<SampleHeader />", () => {
  it("should render header right without crashing", async () => {
    const props = {};
    const { findByTestId, getByRole } = render(<SampleHeader.HeaderRight {...props} />);
    expect(await findByTestId("information-outline")).toBeDefined();
    expect(getByRole("button", { name: "Information" })).toBeDefined();
  });
});
