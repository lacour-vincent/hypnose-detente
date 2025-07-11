import { router as expoRouter } from "expo-router";

import recording, { type RecordingService } from "@/services/recording";

export interface Context {
  services: Services;
  router: Router;
}

interface Services {
  recording: RecordingService;
}

const services: Services = { recording: recording.impl };

interface Router {
  navigate: (href: string) => void;
  replace: (href: string) => void;
}

const router: Router = {
  navigate: expoRouter.navigate,
  replace: expoRouter.replace,
};

const context: Context = { services, router };

export default context;
