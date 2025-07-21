import { type AssetPack, type AssetPackState, type AssetPackStates, AssetPackStatus } from "@/typings/storage";

import { SAMPLES_MOCK, SAMPLE_MOCK } from "@/fixtures/recording";

export const ASSET_PACK_STATES_MOCK: AssetPackStates = SAMPLES_MOCK.reduce<AssetPackStates>((acc, sample) => {
  acc[sample.id] = { name: sample.rid, status: AssetPackStatus.COMPLETED };
  return acc;
}, {});

export const ASSET_PACK_STATE_UPDATE_MOCK: AssetPackState = {
  name: SAMPLE_MOCK.rid,
  status: AssetPackStatus.COMPLETED,
};

export const ASSET_PACK_MOCK: AssetPack = { name: SAMPLE_MOCK.rid, file: SAMPLE_MOCK.file };

export const ASSET_PACK_EMPTY: AssetPack = { name: "", file: "" };
