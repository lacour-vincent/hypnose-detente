import PlayAssetDeliveryModule from "@modules/expo-play-asset-delivery";

import type { StorageRepository } from "@/repositories/storage";

const fetchAssetPackStates: StorageRepository["fetchAssetPackStates"] = async (packs) => {
  const states = await PlayAssetDeliveryModule.getAssetPackStates(packs);
  return states;
};

const repository: StorageRepository = { fetchAssetPackStates };

export default repository;
