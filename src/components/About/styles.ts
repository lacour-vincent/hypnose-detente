import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme, { screen, isPortrait }) => {
  const ratio = isPortrait ? 0.35 : 0.175;
  const image = ratio * screen.width;
  return {
    container: { padding: theme["space-sm"], width: { portrait: "100%", landscape: "50%" }, marginInline: "auto" },
    logo: { width: image, height: image, marginInline: "auto" },
    title: {
      textAlign: "center",
      color: theme["font-primary-color"],
      fontSize: theme["font-size-lg"],
      fontWeight: theme["font-weight-bold"],
      marginBlockEnd: theme["space-xs"],
    },
    description: {
      textAlign: "center",
      color: theme["font-secondary-color"],
      fontSize: theme["font-size-sm"],
      fontWeight: theme["font-weight-regular"],
      paddingInline: theme["space-sm"],
      marginBlockEnd: theme["space-md"],
    },
    pressable: {
      display: "flex",
      flexDirection: "row",
      gap: theme["space-lg"],
      alignItems: "center",
      padding: theme["space-sm"],
    },
    label: {
      color: theme["font-primary-color"],
      fontSize: theme["font-size-md"],
      fontWeight: theme["font-weight-medium"],
    },
  };
});
