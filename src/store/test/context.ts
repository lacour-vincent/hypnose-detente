import type { Context } from "@/store/context";

import recording from "@/services/recording";

const services: Context["services"] = { recording: recording.inMemory };

const router: Context["router"] = {
  navigate: () => true,
  replace: () => true,
};

const context: Context = { services, router };

export default context;
