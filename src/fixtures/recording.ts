import type { Sample } from "@/typings/recording";

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

export const SAMPLES_MOCK: Sample[] = [
  { ...SAMPLE_MOCK, id: "sample-id-1", title: "sample-title-1" },
  { ...SAMPLE_MOCK, id: "sample-id-2", title: "sample-title-2" },
  { ...SAMPLE_MOCK, id: "sample-id-3", title: "sample-title-3" },
  { ...SAMPLE_MOCK, id: "sample-id-4", title: "sample-title-4" },
  { ...SAMPLE_MOCK, id: "sample-id-5", title: "sample-title-5" },
  { ...SAMPLE_MOCK, id: "sample-id-6", title: "sample-title-6" },
];
