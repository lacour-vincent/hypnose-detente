import React from "react";

import { fireEvent, render, screen } from "@/testing/react-native";

import Slider from "./index";

const defaultProps = {
  value: 50,
  options: { min: 0, max: 10, step: 1 },
  onSlidingChange: jest.fn(),
  onSlidingComplete: jest.fn(),
};

describe("<Slider />", () => {
  it("should render without crashing", async () => {
    const props = { ...defaultProps };
    await render(<Slider {...props} />);
    expect(screen.getByTestId("slider")).toBeDefined();
  });

  it("should call onSlidingComplete with value", async () => {
    const props = { ...defaultProps, onSlidingComplete: jest.fn() };
    await render(<Slider {...props} />);
    fireEvent(screen.getByTestId("slider"), "onSlidingComplete", props.value);
    expect(props.onSlidingComplete).toHaveBeenCalledWith(props.value);
  });

  it("should call onSlidingComplete with minimum value", async () => {
    const props = { ...defaultProps, onSlidingComplete: jest.fn() };
    await render(<Slider {...props} />);
    fireEvent(screen.getByTestId("slider"), "onSlidingComplete", props.options.min);
    expect(props.onSlidingComplete).toHaveBeenCalledWith(props.options.min);
  });

  it("should call onSlidingComplete with maximum value", async () => {
    const props = { ...defaultProps, onSlidingComplete: jest.fn() };
    await render(<Slider {...props} />);
    fireEvent(screen.getByTestId("slider"), "onSlidingComplete", props.options.max);
    expect(props.onSlidingComplete).toHaveBeenCalledWith(props.options.max);
  });
});
