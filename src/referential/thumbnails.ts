/* eslint-disable @typescript-eslint/no-require-imports */
import type { ImageSourcePropType } from "react-native";

import type { Sample } from "@sg/typings/recording";

export const SAMPLE_THUMBNAILS: Record<Sample["slug"], ImageSourcePropType> = {
  "bien-dormir": require("@sg/assets/thumbnails/bien-dormir.jpeg"),
  "s-endormir": require("@sg/assets/thumbnails/s-endormir.jpeg"),
  preventif: require("@sg/assets/thumbnails/preventif.jpeg"),
  curatif: require("@sg/assets/thumbnails/curatif.jpeg"),
  renforcement: require("@sg/assets/thumbnails/renforcement.jpeg"),
  ressourcement: require("@sg/assets/thumbnails/ressourcement.jpeg"),
};
