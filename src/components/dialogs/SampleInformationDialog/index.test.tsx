import React from "react";

import { openDialog } from "@/store/actions/dialog";

import { SAMPLE_MOCK } from "@/fixtures/recording";
import { DialogId } from "@/referential/dialog";
import { render } from "@/testing/react-native";
import { createTestStore } from "@/testing/store";

import SampleInformationDialog from "./index";

const defaultProps = { sample: SAMPLE_MOCK };

describe("<SampleInformationDialog />", () => {
  it("should render without crashing", () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.SAMPLE_INFORMATION }));
    const props = { ...defaultProps };
    const { getByText, getByRole } = render(<SampleInformationDialog {...props} />, { store });
    expect(getByText(props.sample.label)).toBeDefined();
    expect(getByText(props.sample.description)).toBeDefined();
    expect(getByRole("button", { name: "OK" })).toBeDefined();
  });

  it("should close the dialog by pressing 'OK'", async () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.SAMPLE_INFORMATION }));
    const props = { ...defaultProps };
    const { queryByText, getByRole, event } = render(<SampleInformationDialog {...props} />, { store });
    expect(queryByText(props.sample.label)).toBeDefined();
    await event.press(getByRole("button", { name: "OK" }));
    expect(queryByText(props.sample.label)).toBeNull();
  });
});
