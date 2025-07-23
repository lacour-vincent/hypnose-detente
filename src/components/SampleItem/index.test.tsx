import React from "react";

import { SAMPLE_MOCK } from "@/fixtures/recording";
import { render } from "@/testing/react-native";

import SampleItem from "./index";

describe("<SampleItem />", () => {
  it("should render without crashing", () => {
    const props = { sample: { ...SAMPLE_MOCK }, offline: false };
    const { getByText, getByTestId } = render(<SampleItem {...props} />);
    expect(getByText(props.sample.title)).toBeDefined();
    expect(getByTestId("clock-outline")).toBeDefined();
    expect(getByText(`${props.sample.duration} min`)).toBeDefined();
  });

  it("should render with offline icon", () => {
    const props = { sample: { ...SAMPLE_MOCK }, offline: true };
    const { getByTestId } = render(<SampleItem {...props} />);
    expect(getByTestId("airplane")).toBeDefined();
  });
});
