import { NativeModule, requireNativeModule } from "expo";

import type { Sample } from "@/typings/recording";

declare class ExpoForegroundServiceModule extends NativeModule {
  start: (sample: Sample["label"]) => void;
  stop: () => void;
}

export default requireNativeModule<ExpoForegroundServiceModule>("ExpoForegroundService");
