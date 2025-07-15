import { SAMPLES } from "@/referential/recording";
import type { RecordingRepository } from "@/repositories/recording";

const fetchSamples: RecordingRepository["fetchSamples"] = async () => {
  return Promise.resolve(SAMPLES);
};

const fetchSampleById: RecordingRepository["fetchSampleById"] = async (id) => {
  const sample = SAMPLES.find((sample) => sample.id === id);
  if (!sample) throw Error("Unknown sample.");
  return Promise.resolve(sample);
};

const repository: RecordingRepository = { fetchSamples, fetchSampleById };

export default repository;
