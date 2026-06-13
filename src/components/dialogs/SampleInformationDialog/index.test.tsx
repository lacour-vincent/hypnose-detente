import React from "react";

import { openDialog } from "@/store/actions/dialog";

import { SAMPLE_MOCK } from "@/fixtures/recording";
import { DialogId } from "@/referential/dialog";
import { render, screen } from "@/testing/react-native";
import { createTestStore } from "@/testing/store";

import SampleInformationDialog from "./index";

const defaultProps = { sample: SAMPLE_MOCK };

describe("<SampleInformationDialog />", () => {
  it("should render without crashing", async () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.SAMPLE_INFORMATION }));
    const props = { ...defaultProps };
    await render(<SampleInformationDialog {...props} />, { store });
    expect(screen.getByText(props.sample.label)).toBeDefined();
    expect(screen.getByText(props.sample.description)).toBeDefined();
    expect(screen.getByRole("button", { name: "OK" })).toBeDefined();
  });

  it("should close the dialog by pressing 'OK'", async () => {
    const store = createTestStore();
    store.dispatch(openDialog({ id: DialogId.SAMPLE_INFORMATION }));
    const props = { ...defaultProps };
    const { event } = await render(<SampleInformationDialog {...props} />, { store });
    expect(screen.queryByText(props.sample.label)).toBeDefined();
    await event.press(screen.getByRole("button", { name: "OK" }));
    expect(screen.queryByText(props.sample.label)).toBeNull();
  });
});
