import { SAMPLE_MOCK } from "@/fixtures/recording";
import type { RecordingRepository } from "@/repositories/recording";

const fetchSamples: RecordingRepository["fetchSamples"] = async () => {
  return Promise.resolve([SAMPLE_MOCK]);
};

const fetchSampleById: RecordingRepository["fetchSampleById"] = async () => {
  return Promise.resolve(SAMPLE_MOCK);
};

const repository: RecordingRepository = { fetchSamples, fetchSampleById };

export default repository;
