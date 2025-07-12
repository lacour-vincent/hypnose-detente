import React from "react";

import { SAMPLES_MOCK } from "@/fixtures/recording";
import { render } from "@/testing/react-native";

import Samples from "./index";

describe("<Samples />", () => {
  it("should render without crashing", async () => {
    const props = { samples: [...SAMPLES_MOCK] };
    const { getByText, findAllByTestId } = render(<Samples {...props} />);
    expect(await findAllByTestId("clock-outline")).toHaveLength(props.samples.length);
    props.samples.forEach((sample) => expect(getByText(sample.title)).toBeDefined());
  });
});
