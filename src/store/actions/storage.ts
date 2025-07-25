import type { AssetPack, AssetPackStates } from "@/typings/storage";

import { createRequestPayloadAction } from "@/store/actions";

export const retrieveAssetPackStates = createRequestPayloadAction<
  { packs: AssetPack["name"][] },
  { states: AssetPackStates }
>("RETRIEVE_ASSET_PACK_STATES");

export const retrieveAssetPack = createRequestPayloadAction<{ pack: AssetPack; network: boolean }, { pack: AssetPack }>(
  "RETRIEVE_ASSET_PACK",
);
