import { router as expoRouter } from "expo-router";

import recording, { type RecordingRepository } from "@/repositories/recording";

export interface Context {
  repositories: Repositories;
  router: Router;
}

interface Repositories {
  recording: RecordingRepository;
}

const repositories: Repositories = { recording: recording.impl };

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
