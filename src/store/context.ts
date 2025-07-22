import { router as expoRouter } from "expo-router";

import ENV from "@/env";
import recording, { type RecordingRepository } from "@/repositories/recording";
import storage, { type StorageRepository } from "@/repositories/storage";

const isDev = ENV.NODE_ENV === "development";

export interface Context {
  repositories: Repositories;
  router: Router;
}

interface Repositories {
  recording: RecordingRepository;
  storage: StorageRepository;
}

const repositories: Repositories = {
  recording: isDev ? recording.inMemory : recording.impl,
  storage: isDev ? storage.inMemory : storage.impl,
};

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
