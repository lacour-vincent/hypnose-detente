import { ASSET_PACK_STATES_MOCK, ASSET_PACK_STATE_UPDATE_MOCK } from "@/fixtures/storage";
import type { StorageRepository } from "@/repositories/storage";

import placeholder from "@/assets/testing/sample.mp3";

let interval: number;

const fetchAssetPackStates: StorageRepository["fetchAssetPackStates"] = async () => {
  return Promise.resolve(ASSET_PACK_STATES_MOCK);
};

const fetchAssetPack: StorageRepository["fetchAssetPack"] = () => {
  return undefined;
};

const fetchAssetPackFileLocation: StorageRepository["fetchAssetPackFileLocation"] = async () => {
  return placeholder;
};

const addAssetPackStateUpdateListener: StorageRepository["addAssetPackStateUpdateListener"] = (listener) => {
  interval = setTimeout(() => listener(ASSET_PACK_STATE_UPDATE_MOCK), 100);
};

const removeAssetPackStateUpdateListener: StorageRepository["removeAssetPackStateUpdateListener"] = () => {
  if (interval) clearInterval(interval);
  return undefined;
};

const repository: StorageRepository = {
  fetchAssetPackStates,
  fetchAssetPack,
  fetchAssetPackFileLocation,
  addAssetPackStateUpdateListener,
  removeAssetPackStateUpdateListener,
};

export default repository;
