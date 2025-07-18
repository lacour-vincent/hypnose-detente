import type { AssetPack, AssetPackStates } from "@/typings/storage";

import impl from "./impl";
import inMemory from "./inMemory";

export interface StorageRepository {
  fetchAssetPackStates: (packs: AssetPack["name"][]) => Promise<AssetPackStates>;
}

export default { impl, inMemory };
