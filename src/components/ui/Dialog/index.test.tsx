import React from "react";

import { render, screen } from "@/testing/react-native";

import Dialog from "./index";

const defaultProps = {
  title: "dialog-title",
  description: "dialog-description",
  actions: [{ label: "OK", callback: jest.fn() }],
  visible: true,
  onClose: () => jest.fn(),
};

describe("<Dialog />", () => {
  it("should render dialog content", async () => {
    const props = { ...defaultProps };
    await render(<Dialog {...props} />);
    expect(screen.getByText(props.title)).toBeDefined();
    expect(screen.getByText(props.description)).toBeDefined();
    props.actions.forEach((action) => expect(screen.getByRole("button", { name: action.label })).toBeDefined());
  });

  it("should call action callback", async () => {
    const props = { ...defaultProps };
    const { event } = await render(<Dialog {...props} />);
    await event.press(screen.getByRole("button", { name: props.actions[0].label }));
    expect(props.actions[0].callback).toHaveBeenCalled();
  });
});
