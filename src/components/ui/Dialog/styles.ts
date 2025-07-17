import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme["space-lg"],
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialog: {
    gap: theme["space-sm"],
    width: "100%",
    paddingBlock: theme["space-sm"],
    paddingInline: theme["space-md"],
    borderRadius: theme["space-2xs"],
    backgroundColor: "#ffffff",
  },
  title: { color: theme["primary-color"], fontSize: theme["font-size-lg"], fontWeight: "bold" },
  description: { fontSize: theme["font-size-md"], color: theme["font-primary-color"] },
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
    paddingBlock: theme["space-2xs"],
  },
  label: { color: theme["primary-color"], fontSize: theme["font-size-md"], fontWeight: "bold" },
});
