import { type ConfigPlugin, withAndroidManifest, withPlugins } from "@expo/config-plugins";
import type { ManifestApplication } from "@expo/config-plugins/build/android/Manifest.js";

const withMediaPlaybackForegroundService: ConfigPlugin = (config) => {
  return withPlugins(config, [withForegroundServiceAndroidManifest]);
};

const withForegroundServiceAndroidManifest: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    const permissions = [
      "android.permission.POST_NOTIFICATIONS",
      "android.permission.FOREGROUND_SERVICE",
      "android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK",
    ];

    const uses = Array.isArray(config.modResults.manifest["uses-permission"])
      ? config.modResults.manifest["uses-permission"]
      : [];
    config.modResults.manifest["uses-permission"] = uses;
    permissions.forEach((permission) => {
      const existing = uses.some((item) => item.$["android:name"] === permission);
      if (existing) throw new Error("Already existing permissions found in AndroidManifest.");
      uses.push({ $: { "android:name": permission } });
    });

    const service = {
      $: {
        "android:name": "expo.modules.foregroundservice.ForegroundService",
        "android:enabled": "true" as const,
        "android:exported": "false" as const,
        "android:foregroundServiceType": "mediaPlayback",
      },
    };

    const applications = Array.isArray(config.modResults.manifest.application)
      ? config.modResults.manifest.application
      : [{} as ManifestApplication];
    if (!applications.length) applications.push({} as ManifestApplication);
    const application = applications[0];
    if (!Array.isArray(application.service)) application.service = [];
    const existing = application.service.some((item) => item.$["android:name"] === service.$["android:name"]);
    if (existing) throw new Error("Already existing service found in AndroidManifest.");
    application.service.push(service);

    return config;
  });
};

export default withMediaPlaybackForegroundService;
