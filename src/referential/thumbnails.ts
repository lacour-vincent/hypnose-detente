/* eslint-disable @typescript-eslint/no-require-imports */
import type { ImageSourcePropType } from "react-native";

import type { Sample } from "@/typings/recording";

export const SAMPLE_THUMBNAILS: Record<Sample["slug"], ImageSourcePropType> = {
  "bien-dormir": require("@/assets/thumbnails/bien-dormir.jpeg"),
  "s-endormir": require("@/assets/thumbnails/s-endormir.jpeg"),
  preventif: require("@/assets/thumbnails/preventif.jpeg"),
  curatif: require("@/assets/thumbnails/curatif.jpeg"),
  renforcement: require("@/assets/thumbnails/renforcement.jpeg"),
  ressourcement: require("@/assets/thumbnails/ressourcement.jpeg"),
};
