import type { Sample } from "@sg/typings/recording";

import { createRequestAction, createRequestPayloadAction } from "@sg/store/actions";

export const retrieveSamples = createRequestAction<{ samples: Sample[] }>("RETRIEVE_SAMPLES");

export const retrieveSampleById = createRequestPayloadAction<{ id: Sample["id"] }, { sample: Sample }>(
  "RETRIEVE_SAMPLE_BY_ID",
);
