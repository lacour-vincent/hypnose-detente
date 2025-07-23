import { router as expoRouter } from "expo-router";

import ENV from "@/env";
import recording, { type RecordingRepository } from "@/repositories/recording";
import storage, { type StorageRepository } from "@/repositories/storage";
import player, { type PlayerService } from "@/services/player";

const isDev = ENV.NODE_ENV === "development";

export interface Context {
  repositories: Repositories;
  services: Services;
  router: Router;
}

interface Repositories {
  recording: RecordingRepository;
  storage: StorageRepository;
}

interface Services {
  player: PlayerService;
}

const repositories: Repositories = {
  recording: isDev ? recording.fake : recording.impl,
  storage: isDev ? storage.fake : storage.impl,
};

const services: Services = { player: player.impl };

interface Router {
  navigate: (href: string) => void;
  replace: (href: string) => void;
}

const router: Router = {
  navigate: expoRouter.navigate,
  replace: expoRouter.replace,
};

const context: Context = { repositories, services, router };

export default context;
