import React from "react";

import { render } from "@/testing/react-native";

import About from "./index";

describe("<About />", () => {
  it("should render without crashing", () => {
    const { getByText } = render(<About />);
    expect(getByText("About")).toBeDefined();
  });
});
