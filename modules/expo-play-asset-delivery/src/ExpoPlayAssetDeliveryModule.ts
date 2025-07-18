import { NativeModule, requireNativeModule } from "expo";

import { type AssetPackState, type ExpoPlayAssetDeliveryModuleEvents } from "./ExpoPlayAssetDelivery.types";

declare class ExpoPlayAssetDeliveryModule extends NativeModule<ExpoPlayAssetDeliveryModuleEvents> {
  getAssetPackFileLocation: (pack: string, filename: string) => string | null;
  getAssetPackState: (pack: string) => Promise<AssetPackState>;
  requestAssetPackFetch: (pack: string) => void;
}

export default requireNativeModule<ExpoPlayAssetDeliveryModule>("ExpoPlayAssetDelivery");
