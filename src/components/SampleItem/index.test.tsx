import React from "react";

import { SAMPLE_MOCK } from "@/fixtures/recording";
import { render, screen } from "@/testing/react-native";

import SampleItem from "./index";

describe("<SampleItem />", () => {
  it("should render without crashing", async () => {
    const props = { sample: { ...SAMPLE_MOCK }, offline: false };
    await render(<SampleItem {...props} />);
    expect(screen.getByText(props.sample.title)).toBeDefined();
    expect(screen.getByTestId("clock-outline")).toBeDefined();
    expect(screen.getByText(`${props.sample.duration} min`)).toBeDefined();
  });

  it("should render with offline icon", async () => {
    const props = { sample: { ...SAMPLE_MOCK }, offline: true };
    await render(<SampleItem {...props} />);
    expect(screen.getByTestId("airplane")).toBeDefined();
  });
});
