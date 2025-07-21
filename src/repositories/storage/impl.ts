import PlayAssetDeliveryModule from "@modules/expo-play-asset-delivery";

import type { StorageRepository } from "@/repositories/storage";

const fetchAssetPackStates: StorageRepository["fetchAssetPackStates"] = async (packs) => {
  const states = await PlayAssetDeliveryModule.getAssetPackStates(packs);
  return states;
};

const fetchAssetPack: StorageRepository["fetchAssetPack"] = (pack) => {
  PlayAssetDeliveryModule.requestAssetPackFetch(pack.name);
  return undefined;
};

const onAssetPackStateUpdate: StorageRepository["onAssetPackStateUpdate"] = (listener) => {
  PlayAssetDeliveryModule.addListener("onAssetPackStateUpdate", listener);
  return undefined;
};

const fetchAssetPackFileLocation: StorageRepository["fetchAssetPackFileLocation"] = (pack) => {
  const file = PlayAssetDeliveryModule.getAssetPackFileLocation(pack.name, pack.file);
  return file;
};

const repository: StorageRepository = {
  fetchAssetPackStates,
  fetchAssetPack,
  fetchAssetPackFileLocation,
  onAssetPackStateUpdate,
};

export default repository;
