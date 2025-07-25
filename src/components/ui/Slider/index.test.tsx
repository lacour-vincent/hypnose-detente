import React from "react";

import { fireEvent } from "@/testing/react-native";
import { render } from "@/testing/render";

import Slider from "./index";

const defaultProps = {
  value: 50,
  options: { min: 0, max: 10, step: 1 },
  onSlidingChange: jest.fn(),
  onSlidingComplete: jest.fn(),
};

describe("<Slider />", () => {
  it("should render without crashing", () => {
    const props = { ...defaultProps };
    const { getByTestId } = render(<Slider {...props} />);
    expect(getByTestId("slider")).toBeDefined();
  });

  it("should call onSlidingComplete with value", () => {
    const props = { ...defaultProps, onSlidingComplete: jest.fn() };
    const { getByTestId } = render(<Slider {...props} />);
    fireEvent(getByTestId("slider"), "onSlidingComplete", props.value);
    expect(props.onSlidingComplete).toHaveBeenCalledWith(props.value);
  });

  it("should call onSlidingComplete with minimum value", () => {
    const props = { ...defaultProps, onSlidingComplete: jest.fn() };
    const { getByTestId } = render(<Slider {...props} />);
    fireEvent(getByTestId("slider"), "onSlidingComplete", props.options.min);
    expect(props.onSlidingComplete).toHaveBeenCalledWith(props.options.min);
  });

  it("should call onSlidingComplete with maximum value", () => {
    const props = { ...defaultProps, onSlidingComplete: jest.fn() };
    const { getByTestId } = render(<Slider {...props} />);
    fireEvent(getByTestId("slider"), "onSlidingComplete", props.options.max);
    expect(props.onSlidingComplete).toHaveBeenCalledWith(props.options.max);
  });
});
