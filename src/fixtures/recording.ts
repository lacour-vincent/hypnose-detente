import type { Sample } from "@/typings/recording";

export const SAMPLE_MOCK: Sample = {
  id: "sample-id",
  rid: "sample_rid",
  title: "sample-title",
  label: "sample-label",
  file: "sample-file.mp3",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Duis aute irure dolor in reprehenderit in voluptate velit. Excepteur sint occaecat cupidatat non proident, sunt in culpa.`,
  duration: 15,
};

export const SAMPLE_EMPTY: Sample = {
  id: "",
  rid: "",
  title: "",
  label: "",
  file: "",
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
