import { clearSelectedSample, retrieveSampleById, retrieveSamples } from "@/store/actions/recording";
import { retrieveAssetPack, retrieveAssetPackStates } from "@/store/actions/storage";
import { getSamples, getSelectedSample } from "@/store/selectors/recording";
import { getAssetPackStates, getSelectedAssetPack } from "@/store/selectors/storage";

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
    await store.waitFor(retrieveAssetPackStates.success);
    const states = getAssetPackStates(store.getState());
    expect(Object.keys(states).length).toBe(samples.length);
  });

  it("should perform retrieve sample by id action", async () => {
    jest.useFakeTimers();
    const action = retrieveSampleById.request({ id: "sample-id" });
    store.dispatch(action);
    await store.waitFor(retrieveSampleById.success);
    jest.runOnlyPendingTimers();
    const sample = getSelectedSample(store.getState());
    expect(sample.id).not.toBe("");
    await store.waitFor(retrieveAssetPack.success);
    const pack = getSelectedAssetPack(store.getState());
    expect(pack.name).toStrictEqual(sample.pack.name);
  });

  it("should perform clear selected sample action", async () => {
    store.dispatch(retrieveSampleById.success({ sample: SAMPLE_MOCK }));
    store.dispatch(retrieveAssetPack.success({ pack: SAMPLE_MOCK.pack }));
    let sample = getSelectedSample(store.getState());
    let pack = getSelectedAssetPack(store.getState());
    expect(sample.id).not.toBe("");
    expect(pack.name).not.toBe("");

    store.dispatch(clearSelectedSample());
    sample = getSelectedSample(store.getState());
    pack = getSelectedAssetPack(store.getState());
    expect(sample.id).toBe("");
    expect(pack.name).toBe("");
  });
});
