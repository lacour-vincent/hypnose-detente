import type { ExpoConfig } from "expo/config";

import "tsx/cjs";

const config: ExpoConfig = {
  name: "Hypnose",
  slug: "hypnose-detente",
  owner: "lacour-vincent",
  version: "2.4.0-SNAPSHOT",
  scheme: "hypnose-detente",
  platforms: ["android"],
  android: {
    package: "com.lacour.vincent.hypnosedetente",
    versionCode: 42,
    adaptiveIcon: { foregroundImage: "./src/assets/icons/adaptive-icon.png", backgroundColor: "#ffffff" },
    permissions: ["android.permission.INTERNET"],
    blockedPermissions: [
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE",
      "android.permission.SYSTEM_ALERT_WINDOW",
      "android.permission.VIBRATE",
      "android.permission.RECORD_AUDIO",
      "android.permission.MODIFY_AUDIO_SETTINGS",
    ],
  },
  experiments: { reactCompiler: true },
  extra: { eas: { projectId: "9f66db35-01e6-4b14-9bcd-d41a567ae953" } },
  plugins: [
    "expo-router",
    [
      "expo-build-properties",
      { android: { compileSdkVersion: 36, targetSdkVersion: 36, buildToolsVersion: "37.0.0" } },
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
    ["./plugins/withMediaPlaybackForegroundService"],
    ["./plugins/withIgnoreBatteryOptimizations"],
    ["./plugins/withGradleProperties"],
    [
      "./plugins/withGooglePlayAssetDelivery",
      [
        { name: "bien_dormir", path: "samples/bien_dormir" },
        { name: "s_endormir", path: "samples/s_endormir" },
        { name: "dormir_bouclier_de_reve", path: "samples/dormir_bouclier_de_reve" },
        { name: "dormir_pays_imaginaire", path: "samples/dormir_pays_imaginaire" },
        { name: "dormir_enfant_interieur", path: "samples/dormir_enfant_interieur" },
        { name: "faire_le_plein_energie", path: "samples/faire_le_plein_energie" },
        { name: "preventif", path: "samples/preventif" },
        { name: "curatif", path: "samples/curatif" },
        { name: "renforcement", path: "samples/renforcement" },
        { name: "ressourcement", path: "samples/ressourcement" },
        { name: "adaptation_aux_virus", path: "samples/adaptation_aux_virus" },
        { name: "retrouver_le_moral", path: "samples/retrouver_le_moral" },
        { name: "joie_de_vivre", path: "samples/joie_de_vivre" },
        { name: "confiance_en_soi", path: "samples/confiance_en_soi" },
        { name: "estime_de_soi", path: "samples/estime_de_soi" },
        { name: "retrouver_sa_confiance", path: "samples/retrouver_sa_confiance" },
        { name: "calmer_l_anxiete", path: "samples/calmer_l_anxiete" },
        { name: "pensees_negatives", path: "samples/pensees_negatives" },
        { name: "transformer_vos_peurs", path: "samples/transformer_vos_peurs" },
        { name: "addictions", path: "samples/addictions" },
        { name: "gerer_le_stress", path: "samples/gerer_le_stress" },
        { name: "gerer_la_douleur", path: "samples/gerer_la_douleur" },
        { name: "reeducation_physique", path: "samples/reeducation_physique" },
        { name: "surmonter_sa_tristesse", path: "samples/surmonter_sa_tristesse" },
        { name: "faire_son_deuil", path: "samples/faire_son_deuil" },
        { name: "soigner_son_passe", path: "samples/soigner_son_passe" },
        { name: "intuition", path: "samples/intuition" },
        { name: "prise_de_decision", path: "samples/prise_de_decision" },
        { name: "immersion_sensorielle", path: "samples/immersion_sensorielle" },
        { name: "nouveau_depart", path: "samples/nouveau_depart" },
        { name: "reussir_sa_vie", path: "samples/reussir_sa_vie" },
        { name: "magie_interieure", path: "samples/magie_interieure" },
        { name: "bain_d_hypnose", path: "samples/bain_d_hypnose" },
        { name: "voyage_en_imagination", path: "samples/voyage_en_imagination" },
        { name: "auto_hypnose", path: "samples/auto_hypnose" },
        { name: "l_inconscient", path: "samples/l_inconscient" },
        { name: "createur_de_realite", path: "samples/createur_de_realite" },
        { name: "expansion", path: "samples/expansion" },
        { name: "histoire_de_la_vie", path: "samples/histoire_de_la_vie" },
        { name: "la_conscience", path: "samples/la_conscience" },
      ],
    ],
  ],
};

export default config;
