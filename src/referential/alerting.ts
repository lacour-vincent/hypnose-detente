import type { Suffix } from "@sg/store/actions";
import * as recording from "@sg/store/actions/recording";

export const ACTION_SUCCESS_LABELS: Record<`${string}_${Suffix.SUCCESS}`, string | undefined> = {
  // recording
  [recording.retrieveSamples.success.toString()]: undefined,
  [recording.retrieveSampleById.success.toString()]: undefined,
};

export const ACTION_FAILURE_LABELS: Record<`${string}_${Suffix.FAILURE}`, string | undefined> = {
  // recording
  [recording.retrieveSamples.failure.toString()]: "Erreur lors de la récupération des séances.",
  [recording.retrieveSampleById.success.toString()]: "Erreur lors de la récupération de la séance.",
};
