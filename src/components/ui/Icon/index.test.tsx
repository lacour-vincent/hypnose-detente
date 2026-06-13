import React from "react";

import { render, screen } from "@/testing/react-native";

import Icon from "./index";

describe("<Icon />", () => {
  it("should render without crashing", async () => {
    const props = { name: "emoticon" as const };
    await render(<Icon {...props} />);
    expect(screen.getByTestId(props.name)).toBeDefined();
  });
});
