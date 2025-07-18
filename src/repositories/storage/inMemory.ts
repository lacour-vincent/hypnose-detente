import { ASSET_PACK_STATE_MOCK } from "@/fixtures/storage";
import type { StorageRepository } from "@/repositories/storage";

const fetchAssetPackStates: StorageRepository["fetchAssetPackStates"] = async () => {
  return Promise.resolve(ASSET_PACK_STATE_MOCK);
};

const repository: StorageRepository = { fetchAssetPackStates };

export default repository;
