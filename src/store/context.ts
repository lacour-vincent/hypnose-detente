import { router as expoRouter } from "expo-router";

import recording, { type RecordingRepository } from "@/repositories/recording";
import storage, { type StorageRepository } from "@/repositories/storage";

export interface Context {
  repositories: Repositories;
  router: Router;
}

interface Repositories {
  recording: RecordingRepository;
  storage: StorageRepository;
}

const repositories: Repositories = { recording: recording.impl, storage: storage.impl };

interface Router {
  navigate: (href: string) => void;
  replace: (href: string) => void;
}

const router: Router = {
  navigate: expoRouter.navigate,
  replace: expoRouter.replace,
};

const context: Context = { repositories, router };

export default context;
