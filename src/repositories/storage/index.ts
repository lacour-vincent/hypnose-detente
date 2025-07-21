import type { AssetPack, AssetPackState, AssetPackStates } from "@/typings/storage";

import impl from "./impl";
import inMemory from "./inMemory";

export interface StorageRepository {
  fetchAssetPackStates: (packs: AssetPack["name"][]) => Promise<AssetPackStates>;
  fetchAssetPack: (pack: AssetPack) => void;
  fetchAssetPackFileLocation: (pack: AssetPack) => string | null;
  onAssetPackStateUpdate: (listener: (state: AssetPackState) => void) => void;
}

export default { impl, inMemory };
