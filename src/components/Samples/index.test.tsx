import React from "react";

import { SAMPLES_MOCK } from "@/fixtures/recording";
import { ASSET_PACK_STATES_MOCK } from "@/fixtures/storage";
import { render } from "@/testing/react-native";

import Samples from "./index";

describe("<Samples />", () => {
  it("should render without crashing", async () => {
    const props = { samples: [...SAMPLES_MOCK], states: ASSET_PACK_STATES_MOCK };
    const { getByRole, findAllByTestId } = render(<Samples {...props} />);
    expect(await findAllByTestId("clock-outline")).toHaveLength(props.samples.length);
    props.samples.forEach((sample) => expect(getByRole("link", { name: sample.title })).toBeDefined());
  });
});
