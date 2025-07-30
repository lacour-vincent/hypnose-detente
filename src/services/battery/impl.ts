import BatteryModule from "@modules/expo-ignore-battery-optimizations";

import type { BatteryService } from "@/services/battery";

const isIgnoringBatteryOptimizations: BatteryService["isIgnoringBatteryOptimizations"] = () => {
  const ignoring = BatteryModule.isIgnoringBatteryOptimizations();
  return ignoring;
};

const requestIgnoreBatteryOptimizations: BatteryService["requestIgnoreBatteryOptimizations"] = () => {
  BatteryModule.requestIgnoreBatteryOptimizations();
  return undefined;
};

const service: BatteryService = { isIgnoringBatteryOptimizations, requestIgnoreBatteryOptimizations };

export default service;
