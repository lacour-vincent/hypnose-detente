import { NativeModule, requireNativeModule } from "expo";

import type { AssetPack, AssetPackState, AssetPackStates } from "@/typings/storage";

type ExpoPlayAssetDeliveryModuleEvents = {
  onAssetPackStateUpdate: (state: AssetPackState) => void;
};

declare class ExpoPlayAssetDeliveryModule extends NativeModule<ExpoPlayAssetDeliveryModuleEvents> {
  getAssetPackStates: (packs: AssetPack["name"][]) => Promise<AssetPackStates>;
  getAssetPackFileLocation: (pack: AssetPack["name"], filename: string) => string | null;
  requestAssetPackFetch: (pack: AssetPack["name"]) => void;
}

export default requireNativeModule<ExpoPlayAssetDeliveryModule>("ExpoPlayAssetDelivery");
