import { type ConfigPlugin, withGradleProperties, withPlugins } from "@expo/config-plugins";

const withGradlePropertiesPlugin: ConfigPlugin = (config) => {
  return withPlugins(config, [withCustomGradleProperties]);
};

const withCustomGradleProperties: ConfigPlugin = (config) => {
  return withGradleProperties(config, (config) => {
    const index = config.modResults.findIndex((item) => item.type === "property" && item.key === "org.gradle.jvmargs");
    // @ts-expect-error The keys exists.
    config.modResults[index].value = "-Xmx4096m -XX:MaxMetaspaceSize=1024m";
    return config;
  });
};

export default withGradlePropertiesPlugin;
