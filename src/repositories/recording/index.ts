import type { Sample } from "@/typings/recording";

import impl from "./impl";
import inMemory from "./inMemory";

export interface RecordingRepository {
  fetchSamples: () => Promise<Sample[]>;
  fetchSampleById: (id: Sample["id"]) => Promise<Sample>;
}

export default { impl, inMemory };
