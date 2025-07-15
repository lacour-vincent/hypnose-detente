import type { Sample } from "@/typings/recording";

import { clearSelectedSample, retrieveSampleById, retrieveSamples } from "@/store/actions/recording";
import { getSamples, getSelectedSample } from "@/store/selectors/recording";

import { SAMPLE_MOCK } from "@/fixtures/recording";

import StoreTester from "./index";

describe("Store - recording", () => {
  let store: StoreTester;

  beforeEach(() => {
    store = new StoreTester();
  });

  it("should perform retrieve samples action", async () => {
    const action = retrieveSamples.request();
    store.dispatch(action);
    await store.waitFor(retrieveSamples.success);
    const samples = getSamples(store.getState());
    expect(samples).not.toHaveLength(0);
  });

  it("should perform retrieve sample by id action", async () => {
    const action = retrieveSampleById.request({ id: "sample-id" });
    store.dispatch(action);
    await store.waitFor(retrieveSampleById.success);
    const sample = getSelectedSample(store.getState());
    expect(sample.id).not.toBe("");
  });

  it("should perform clear selected sample action", async () => {
    let sample: Sample;
    store.dispatch(retrieveSampleById.success({ sample: SAMPLE_MOCK }));
    sample = getSelectedSample(store.getState());
    expect(sample.id).not.toBe("");
    store.dispatch(clearSelectedSample());
    sample = getSelectedSample(store.getState());
    expect(sample.id).toBe("");
  });
});
