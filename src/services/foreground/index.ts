import type { Sample } from "@/typings/recording";

import fake from "./fake";
import impl from "./impl";

export interface ForegroundService {
  start: (sample: Sample["label"]) => void;
  stop: () => void;
}

export default { impl, fake };
