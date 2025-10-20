import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme, { screen }) => {
  const image = 0.35 * screen.width;
  return {
    container: { padding: theme["space-sm"] },
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
