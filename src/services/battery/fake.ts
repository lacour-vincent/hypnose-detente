import type { BatteryService } from "@/services/battery";

class FakeBatteryModule {
  private ignoring: boolean = false;

  isIgnoringBatteryOptimizations(): boolean {
    return this.ignoring;
  }

  requestIgnoreBatteryOptimizations() {
    this.ignoring = true;
  }
}

const BatteryModule = new FakeBatteryModule();

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
