import React from "react";

import { render } from "@/testing/render";

import ProgressBar from "./index";

describe("<ProgressBar />", () => {
  it("should render without crashing", () => {
    const { getByRole } = render(<ProgressBar />);
    expect(getByRole("progressbar")).toBeDefined();
  });
});
