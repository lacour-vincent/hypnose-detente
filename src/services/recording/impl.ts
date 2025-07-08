import { SAMPLE_MOCK } from "@sg/fixtures/recording";
import type { RecordingService } from "@sg/services/recording";

const fetchSamples: RecordingService["fetchSamples"] = async () => {
  return Promise.resolve([SAMPLE_MOCK]);
};

const fetchSampleById: RecordingService["fetchSampleById"] = async () => {
  return Promise.resolve(SAMPLE_MOCK);
};

const service: RecordingService = { fetchSamples, fetchSampleById };

export default service;
