import { NativeModule, requireNativeModule } from "expo";

import { type ExpoPlayAssetDeliveryModuleEvents } from "./ExpoPlayAssetDelivery.types";

declare class ExpoPlayAssetDeliveryModule extends NativeModule<ExpoPlayAssetDeliveryModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

export default requireNativeModule<ExpoPlayAssetDeliveryModule>("ExpoPlayAssetDelivery");
