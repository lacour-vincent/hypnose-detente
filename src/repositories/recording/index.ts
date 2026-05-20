import type { Sample } from "@/typings/recording";

import fake from "./fake";
import impl from "./impl";

export interface RecordingRepository {
  fetchSamples: () => Promise<Sample[]>;
  fetchSampleById: (id: Sample["id"]) => Promise<Sample>;
  fetchSampleArtworkByRid: (rid: Sample["rid"]) => Promise<string>;
}

export default { impl, fake };
