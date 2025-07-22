import type { Sample } from "@/typings/recording";

import { ASSET_PACK_EMPTY, ASSET_PACK_MOCK } from "@/fixtures/storage";

export const SAMPLE_MOCK: Sample = {
  id: "sample-id",
  rid: "sample-rid",
  title: "sample-title",
  label: "sample-label",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Duis aute irure dolor in reprehenderit in voluptate velit. Excepteur sint occaecat cupidatat non proident, sunt in culpa.`,
  duration: 15,
  pack: ASSET_PACK_MOCK,
};

export const SAMPLE_EMPTY: Sample = {
  id: "",
  rid: "",
  title: "",
  label: "",
  description: "",
  duration: 0,
  pack: ASSET_PACK_EMPTY,
};

export const SAMPLES_MOCK: Sample[] = Array.from({ length: 6 }, (_, i) => ({
  ...SAMPLE_MOCK,
  id: `sample-id-${i + 1}`,
  title: `sample-title-${i + 1}`,
  pack: { ...ASSET_PACK_MOCK, name: `asset-pack-name-${i + 1}` },
}));
