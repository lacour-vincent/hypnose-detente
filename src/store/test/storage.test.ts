import { retrieveAssetPack, retrieveAssetPackStates } from "@/store/actions/storage";
import { getAssetPackStates, getSelectedAssetPack } from "@/store/selectors/storage";

import { SAMPLES_MOCK } from "@/fixtures/recording";
import { ASSET_PACK_MOCK } from "@/fixtures/storage";

import StoreTester from "./index";

const pack = ASSET_PACK_MOCK;
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

  it("should perform retrieve asset pack action", async () => {
    jest.useFakeTimers();
    const action = retrieveAssetPack.request({ pack });
    store.dispatch(action);
    jest.runAllTimers();
    await store.waitFor(retrieveAssetPack.success);
    const selected = getSelectedAssetPack(store.getState());
    expect(selected).toEqual(pack);
  });
});
