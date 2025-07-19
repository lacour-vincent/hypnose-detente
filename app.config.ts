import { type ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Hypnose",
  slug: "hypnose-detente",
  owner: "lacour-vincent",
  version: "2.0.0-SNAPSHOT",
  scheme: "hypnose-detente",
  orientation: "portrait",
  platforms: ["android"],
  android: {
    package: "com.lacour.vincent.hypnosedetente",
    versionCode: 37,
    adaptiveIcon: { foregroundImage: "./src/assets/icons/adaptive-icon.png", backgroundColor: "#ffffff" },
    edgeToEdgeEnabled: true,
    permissions: ["INTERNET"],
    blockedPermissions: ["READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE", "SYSTEM_ALERT_WINDOW", "VIBRATE"],
  },
  extra: { eas: { projectId: "9f66db35-01e6-4b14-9bcd-d41a567ae953" } },
  plugins: [
    "expo-router",
    [
      "expo-build-properties",
      { android: { compileSdkVersion: 35, targetSdkVersion: 35, buildToolsVersion: "35.0.0" } },
    ],
    [
      "expo-font",
      {
        android: {
          fonts: [
            {
              fontFamily: "Roboto",
              fontDefinitions: [
                { path: "./src/assets/fonts/Roboto_300.ttf", weight: 300 },
                { path: "./src/assets/fonts/Roboto_400.ttf", weight: 400 },
                { path: "./src/assets/fonts/Roboto_500.ttf", weight: 500 },
                { path: "./src/assets/fonts/Roboto_700.ttf", weight: 700 },
              ],
            },
          ],
        },
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/icons/splash-screen-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "./plugins/withGooglePlayAssetDelivery.js",
      [
        { name: "bien_dormir", path: "samples/bien_dormir" },
        { name: "s_endormir", path: "samples/s_endormir" },
        { name: "preventif", path: "samples/preventif" },
        { name: "curatif", path: "samples/curatif" },
        { name: "renforcement", path: "samples/renforcement" },
        { name: "ressourcement", path: "samples/ressourcement" },
      ],
    ],
  ],
};

export default config;
