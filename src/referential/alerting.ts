import type { Suffix } from "@/store/actions";
import * as player from "@/store/actions/player";
import * as recording from "@/store/actions/recording";
import * as storage from "@/store/actions/storage";

export const ACTION_SUCCESS_LABELS: Record<`${string}_${Suffix.SUCCESS}`, string | undefined> = {
  // player
  [player.prepare.success.toString()]: undefined,
  [player.play.success.toString()]: undefined,

  // recording
  [recording.retrieveSamples.success.toString()]: undefined,
  [recording.retrieveSampleById.success.toString()]: undefined,

  // storage
  [storage.retrieveAssetPackStates.success.toString()]: undefined,
  [storage.retrieveAssetPack.success.toString()]: undefined,
};

export const ACTION_FAILURE_LABELS: Record<`${string}_${Suffix.FAILURE}`, string | undefined> = {
  // player
  [player.prepare.failure.toString()]: "Erreur lors de la préparation à la lecture de la séance.",
  [player.play.failure.toString()]: "Erreur lors de la lecture de la séance.",

  // recording
  [recording.retrieveSamples.failure.toString()]: "Erreur lors de la récupération des séances.",
  [recording.retrieveSampleById.success.toString()]: "Erreur lors de la récupération de la séance.",

  // storage
  [storage.retrieveAssetPackStates.failure.toString()]: "Erreur lors de la récupération des états des séances.",
  [storage.retrieveAssetPack.failure.toString()]: "Erreur lors de la récupération du fichier de la séance.",
};
