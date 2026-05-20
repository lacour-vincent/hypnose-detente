import { Asset } from "expo-asset";
import { cacheDirectory, copyAsync, getInfoAsync } from "expo-file-system/legacy";

import { SAMPLES } from "@/referential/recording";
import { SAMPLE_THUMBNAILS } from "@/referential/thumbnails";
import type { RecordingRepository } from "@/repositories/recording";

const fetchSamples: RecordingRepository["fetchSamples"] = async () => {
  return Promise.resolve(SAMPLES);
};

const fetchSampleById: RecordingRepository["fetchSampleById"] = async (id) => {
  const sample = SAMPLES.find((sample) => sample.id === id);
  if (!sample) throw Error("Unknown sample.");
  return Promise.resolve(sample);
};

const fetchSampleArtworkByRid: RecordingRepository["fetchSampleArtworkByRid"] = async (rid) => {
  const destination = `${cacheDirectory}artwork_${rid}.jpeg`;
  const file = await getInfoAsync(destination);
  if (file.exists) return destination;
  const asset = Asset.fromModule(SAMPLE_THUMBNAILS[rid]);
  await asset.downloadAsync();
  await copyAsync({ from: asset.localUri as string, to: destination });
  return destination;
};

const repository: RecordingRepository = { fetchSamples, fetchSampleById, fetchSampleArtworkByRid };

export default repository;
