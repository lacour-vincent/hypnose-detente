import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme, { screen }) => {
  return {
    background: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: theme["space-lg"],
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    fill: { position: "absolute", inset: 0 },
    dialog: {
      gap: theme["space-sm"],
      width: "100%",
      paddingInline: theme["space-md"],
      paddingBlock: theme["space-sm"],
      borderRadius: theme["space-2xs"],
      backgroundColor: theme.background,
    },
    title: {
      color: theme["font-primary-color"],
      fontSize: theme["font-size-lg"],
      fontWeight: theme["font-weight-bold"],
    },
    description: { maxHeight: 0.5 * screen.height },
    "description-content": { fontSize: theme["font-size-md"], color: theme["font-primary-color"] },
    actions: {
      display: "flex",
      flexDirection: "row",
      gap: theme["space-2xs"],
      alignItems: "center",
      justifyContent: "flex-end",
    },
    action: {
      display: "flex",
      minWidth: "25%",
      alignItems: "center",
      paddingInline: theme["space-xs"],
      paddingBlock: theme["space-xs"],
    },
    label: {
      color: theme["font-primary-color"],
      fontSize: theme["font-size-md"],
      fontWeight: "medium",
    },
  };
});
