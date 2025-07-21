import { ASSET_PACK_MOCK, ASSET_PACK_STATES_MOCK, ASSET_PACK_STATE_UPDATE_MOCK } from "@/fixtures/storage";
import type { StorageRepository } from "@/repositories/storage";

const fetchAssetPackStates: StorageRepository["fetchAssetPackStates"] = async () => {
  return Promise.resolve(ASSET_PACK_STATES_MOCK);
};

const fetchAssetPack: StorageRepository["fetchAssetPack"] = () => {
  return undefined;
};

const fetchAssetPackFileLocation: StorageRepository["fetchAssetPackFileLocation"] = () => {
  return ASSET_PACK_MOCK.file;
};

const onAssetPackStateUpdate: StorageRepository["onAssetPackStateUpdate"] = (listener) => {
  return setTimeout(() => listener(ASSET_PACK_STATE_UPDATE_MOCK), 100);
};

const repository: StorageRepository = {
  fetchAssetPackStates,
  fetchAssetPack,
  fetchAssetPackFileLocation,
  onAssetPackStateUpdate,
};

export default repository;
