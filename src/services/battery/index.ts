import fake from "./fake";
import impl from "./impl";

export interface BatteryService {
  isIgnoringBatteryOptimizations: () => boolean;
  requestIgnoreBatteryOptimizations: () => void;
}

export default { impl, fake };
