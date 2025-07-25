import { AssetPackStatus } from "@/typings/storage";

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
    const packs = samples.map((sample) => sample.pack.name);
    const action = retrieveAssetPackStates.request({ packs });
    store.dispatch(action);
    await store.waitFor(retrieveAssetPackStates.success);
    const states = getAssetPackStates(store.getState());
    expect(Object.keys(states).length).toBe(packs.length);
  });

  it("should perform retrieve asset pack from network action", async () => {
    jest.useFakeTimers();
    const action = retrieveAssetPack.request({ pack, network: true });
    store.dispatch(action);
    jest.runOnlyPendingTimers();
    await store.waitFor(retrieveAssetPack.success);
    const states = getAssetPackStates(store.getState());
    const selected = getSelectedAssetPack(store.getState());
    expect(states[pack.name]).toStrictEqual({ name: pack.name, status: AssetPackStatus.COMPLETED });
    expect(selected.name).toBe(pack.name);
  });

  it("should perform retrieve asset pack from storage action", async () => {
    const action = retrieveAssetPack.request({ pack, network: false });
    store.dispatch(action);
    await store.waitFor(retrieveAssetPack.success);
    const states = getAssetPackStates(store.getState());
    const selected = getSelectedAssetPack(store.getState());
    expect(states[pack.name]).toStrictEqual({ name: pack.name, status: AssetPackStatus.COMPLETED });
    expect(selected.name).toBe(pack.name);
  });
});
