import React from "react";

import { render } from "@/testing/render";

import PressableIcon from "./index";

describe("<PressableIcon />", () => {
  it("should render without crashing", async () => {
    const props = { icon: "emoticon" as const, label: "label", onPress: jest.fn() };
    const { findByTestId, getByRole } = render(<PressableIcon {...props} />);
    expect(await findByTestId(props.icon)).toBeDefined();
    expect(getByRole("button", { name: props.label })).toBeDefined();
  });

  it("should call onPress", async () => {
    const props = { icon: "emoticon" as const, label: "label", onPress: jest.fn() };
    const { findByTestId, getByRole, event } = render(<PressableIcon {...props} />);
    expect(await findByTestId(props.icon)).toBeDefined();
    await event.press(getByRole("button", { name: props.label }));
    expect(props.onPress).toHaveBeenCalled();
  });
});
