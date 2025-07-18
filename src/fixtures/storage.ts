import { type AssetPackStates, AssetPackStatus } from "@/typings/storage";

import { SAMPLES_MOCK } from "@/fixtures/recording";

export const ASSET_PACK_STATE_MOCK: AssetPackStates = SAMPLES_MOCK.reduce<AssetPackStates>((acc, sample) => {
  acc[sample.rid] = { name: sample.rid, status: AssetPackStatus.COMPLETED };
  return acc;
}, {});
