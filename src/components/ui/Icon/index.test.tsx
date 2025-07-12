import React from "react";

import { render } from "@/testing/render";

import Icon from "./index";

describe("<Icon />", () => {
  it("should render without crashing", async () => {
    const props = { name: "emoticon" };
    const { findByTestId } = render(<Icon {...props} />);
    expect(await findByTestId(props.name)).toBeDefined();
  });
});
