import PlayAssetDeliveryModule from "@modules/expo-play-asset-delivery";

import type { StorageRepository } from "@/repositories/storage";

const fetchAssetPackStates: StorageRepository["fetchAssetPackStates"] = (packs) => {
  const states = PlayAssetDeliveryModule.getAssetPackStates(packs);
  return Promise.resolve(states);
};

const fetchAssetPack: StorageRepository["fetchAssetPack"] = (pack) => {
  PlayAssetDeliveryModule.requestAssetPackFetch(pack.name);
  return undefined;
};

const fetchAssetPackFileLocation: StorageRepository["fetchAssetPackFileLocation"] = (pack) => {
  const file = PlayAssetDeliveryModule.getAssetPackFileLocation(pack.name, pack.file);
  return Promise.resolve(file);
};

const addAssetPackStateUpdateListener: StorageRepository["addAssetPackStateUpdateListener"] = (listener) => {
  PlayAssetDeliveryModule.addListener("onAssetPackStateUpdate", listener);
  return undefined;
};

const removeAssetPackStateUpdateListener: StorageRepository["removeAssetPackStateUpdateListener"] = () => {
  PlayAssetDeliveryModule.removeListener("onAssetPackStateUpdate", () => {});
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
