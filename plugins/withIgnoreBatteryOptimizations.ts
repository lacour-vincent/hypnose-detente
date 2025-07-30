import { type ConfigPlugin, withAndroidManifest, withPlugins } from "@expo/config-plugins";

const withIgnoreBatteryOptimizations: ConfigPlugin = (config) => {
  return withPlugins(config, [withIgnoreBatteryOptimizationsAndroidManifest]);
};

const withIgnoreBatteryOptimizationsAndroidManifest: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    const permissions = ["android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS"];

    const uses = Array.isArray(config.modResults.manifest["uses-permission"])
      ? config.modResults.manifest["uses-permission"]
      : [];
    config.modResults.manifest["uses-permission"] = uses;
    permissions.forEach((permission) => {
      const existing = uses.some((item) => item.$["android:name"] === permission);
      if (existing) throw new Error("Already existing permissions found in AndroidManifest.");
      uses.push({ $: { "android:name": permission } });
    });

    return config;
  });
};

export default withIgnoreBatteryOptimizations;
