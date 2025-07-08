import type { Context } from "@sg/store/context";

import recording from "@sg/services/recording";

const services: Context["services"] = { recording: recording.inMemory };

const router: Context["router"] = {
  navigate: () => true,
  replace: () => true,
};

const context: Context = { services, router };

export default context;
