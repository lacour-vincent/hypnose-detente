import React from "react";

import { SAMPLE_MOCK } from "@/fixtures/recording";
import { render } from "@/testing/react-native";

import SampleItem from "./index";

describe("<SampleItem />", () => {
  it("should render without crashing", async () => {
    const props = { sample: { ...SAMPLE_MOCK } };
    const { getByText, findByTestId } = render(<SampleItem {...props} />);
    expect(await findByTestId("clock-outline")).toBeDefined();
    expect(getByText(props.sample.title)).toBeDefined();
    expect(getByText(`${props.sample.duration} min`)).toBeDefined();
    expect(await findByTestId("airplane")).toBeDefined();
  });
});
