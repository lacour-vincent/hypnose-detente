import type { Sample } from "@sg/typings/recording";

export const SAMPLE_MOCK: Sample = {
  id: "sample-id",
  title: "sample-title",
  label: "sample-label",
  slug: "sample-slug",
  description: "sample-description",
  duration: 15,
};

export const SAMPLE_EMPTY: Sample = {
  id: "",
  title: "",
  label: "",
  slug: "",
  description: "",
  duration: 0,
};
