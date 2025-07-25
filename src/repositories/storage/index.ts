import type { AssetPack, AssetPackState, AssetPackStates } from "@/typings/storage";

import fake from "./fake";
import impl from "./impl";

export interface StorageRepository {
  fetchAssetPackStates: (packs: AssetPack["name"][]) => Promise<AssetPackStates>;
  fetchAssetPack: (pack: AssetPack) => void;
  fetchAssetPackFileLocation: (pack: AssetPack) => Promise<string | null>;
  addAssetPackStateUpdateListener: (listener: (state: AssetPackState) => void) => void;
  removeAssetPackStateUpdateListener: () => void;
}

export default { impl, fake };
