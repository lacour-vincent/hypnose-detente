import { NativeModule, requireNativeModule } from "expo";

declare class ExpoIgnoreBatteryOptimizationsModule extends NativeModule {
  isIgnoringBatteryOptimizations: () => boolean;
  requestIgnoreBatteryOptimizations: () => void;
}

export default requireNativeModule<ExpoIgnoreBatteryOptimizationsModule>("ExpoIgnoreBatteryOptimizations");
