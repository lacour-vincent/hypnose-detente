import type { Sample } from "@/typings/recording";

import { createAction, createRequestAction, createRequestPayloadAction } from "@/store/actions";

export const retrieveSamples = createRequestAction<{ samples: Sample[] }>("RETRIEVE_SAMPLES");

export const retrieveSampleById = createRequestPayloadAction<{ id: Sample["id"] }, { sample: Sample }>(
  "RETRIEVE_SAMPLE_BY_ID",
);

export const clearSelectedSample = createAction("CLEAR_SELECTED_SAMPLE");
