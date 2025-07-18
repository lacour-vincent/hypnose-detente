import type { Sample } from "@/typings/recording";

export const SAMPLE_MOCK: Sample = {
  id: "sample-id",
  rid: "sample-rid",
  title: "sample-title",
  label: "sample-label",
  description: "sample-description",
  duration: 15,
};

export const SAMPLE_EMPTY: Sample = {
  id: "",
  rid: "",
  title: "",
  label: "",
  description: "",
  duration: 0,
};

export const SAMPLES_MOCK: Sample[] = [
  { ...SAMPLE_MOCK, id: "sample-id-1", rid: "sample-rid-1", title: "sample-title-1" },
  { ...SAMPLE_MOCK, id: "sample-id-2", rid: "sample-rid-2", title: "sample-title-2" },
  { ...SAMPLE_MOCK, id: "sample-id-3", rid: "sample-rid-3", title: "sample-title-3" },
  { ...SAMPLE_MOCK, id: "sample-id-4", rid: "sample-rid-4", title: "sample-title-4" },
  { ...SAMPLE_MOCK, id: "sample-id-5", rid: "sample-rid-5", title: "sample-title-5" },
  { ...SAMPLE_MOCK, id: "sample-id-6", rid: "sample-rid-6", title: "sample-title-6" },
];
