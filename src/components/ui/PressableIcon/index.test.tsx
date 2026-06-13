import React from "react";

import { render, screen } from "@/testing/react-native";

import PressableIcon from "./index";

describe("<PressableIcon />", () => {
  it("should render without crashing", async () => {
    const props = { icon: "emoticon" as const, label: "label", onPress: jest.fn() };
    await render(<PressableIcon {...props} />);
    expect(screen.getByRole("button", { name: props.label })).toBeDefined();
    expect(screen.getByTestId(props.icon)).toBeDefined();
  });

  it("should call onPress", async () => {
    const props = { icon: "emoticon" as const, label: "label", onPress: jest.fn() };
    const { event } = await render(<PressableIcon {...props} />);
    await event.press(screen.getByRole("button", { name: props.label }));
    expect(screen.getByTestId(props.icon)).toBeDefined();
    expect(props.onPress).toHaveBeenCalled();
  });
});
