import { retrieveAssetPackStates } from "@/store/actions/storage";
import { getAssetPackStates } from "@/store/selectors/storage";

import { SAMPLES_MOCK } from "@/fixtures/recording";

import StoreTester from "./index";

const samples = SAMPLES_MOCK;

describe("Store - storage", () => {
  let store: StoreTester;

  beforeEach(() => {
    store = new StoreTester();
  });

  it("should perform retrieve asset pack states action", async () => {
    const packs = samples.map((sample) => sample.rid);
    const action = retrieveAssetPackStates.request({ packs });
    store.dispatch(action);
    await store.waitFor(retrieveAssetPackStates.success);
    const states = getAssetPackStates(store.getState());
    expect(Object.keys(states).length).toBe(packs.length);
  });
});
