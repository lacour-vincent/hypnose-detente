import { type AssetPack, type AssetPackState, type AssetPackStates, AssetPackStatus } from "@/typings/storage";

export const ASSET_PACK_STATES_MOCK: AssetPackStates = Object.fromEntries(
  Array.from({ length: 6 }, (_, i) => {
    const name = `asset-pack-name-${i + 1}`;
    return [name, { name, status: AssetPackStatus.COMPLETED }];
  }),
);

export const ASSET_PACK_STATE_UPDATE_MOCK: AssetPackState = {
  name: "asset-pack-name",
  status: AssetPackStatus.COMPLETED,
};

export const ASSET_PACK_MOCK: AssetPack = { name: "asset-pack-name", file: "asset-pack-file.mp3" };

export const ASSET_PACK_EMPTY: AssetPack = { name: "", file: "" };
