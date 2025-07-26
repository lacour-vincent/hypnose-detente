import type { ForegroundService } from "@/services/foreground";

const start: ForegroundService["start"] = () => {
  return undefined;
};

const stop: ForegroundService["stop"] = () => {
  return undefined;
};

const service: ForegroundService = { start, stop };

export default service;
