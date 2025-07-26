import ForegroundServiceModule from "@modules/expo-foreground-service";

import type { ForegroundService } from "@/services/foreground";

const start: ForegroundService["start"] = (sample) => {
  ForegroundServiceModule.start(sample);
  return undefined;
};

const stop: ForegroundService["stop"] = () => {
  ForegroundServiceModule.stop();
  return undefined;
};

const service: ForegroundService = { start, stop };

export default service;
