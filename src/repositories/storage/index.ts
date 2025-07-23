import type { AssetPack, AssetPackState, AssetPackStates } from "@/typings/storage";

import fake from "./fake";
import impl from "./impl";

export interface StorageRepository {
  fetchAssetPackStates: (packs: AssetPack["name"][]) => Promise<AssetPackStates>;
  fetchAssetPack: (pack: AssetPack) => void;
  fetchAssetPackFileLocation: (pack: AssetPack) => string | null;
  onAssetPackStateUpdate: (listener: (state: AssetPackState) => void) => void;
}

export default { impl, fake };
