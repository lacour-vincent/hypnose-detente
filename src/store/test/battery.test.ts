import { AlertLevel } from "@/typings/alerting";

import { ignoreBatteryOptimizations } from "@/store/actions/battery";
import { getAlerting } from "@/store/selectors/alerting";

import StoreTester from "./index";

describe("Store - storage", () => {
  let store: StoreTester;

  beforeEach(() => {
    store = new StoreTester();
  });

  it("should perform ignoring battery optimization action", async () => {
    const action = ignoreBatteryOptimizations.request();
    store.dispatch(action);
    await store.waitFor(ignoreBatteryOptimizations.success);
    store.dispatch(action);
    await store.waitFor(ignoreBatteryOptimizations.failure);
    const [{ level, message }] = getAlerting(store.getState());
    expect(level).toBe(AlertLevel.SUCCESS);
    expect(message).toBe("L'optimisation de la batterie est désactivée sur votre appareil.");
  });
});
