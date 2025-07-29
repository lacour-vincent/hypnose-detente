import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  container: {},
  pressable: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: theme["space-lg"],
    paddingBlock: theme["space-sm"],
    paddingInline: theme["space-md"],
  },
  wrapper: { gap: theme["space-sm"] },
  title: {
    color: theme["font-primary-color"],
    fontSize: theme["font-size-md"],
    lineHeight: theme["font-size-md"],
  },
  label: {
    color: theme["font-secondary-color"],
    fontSize: theme["font-size-sm"],
    lineHeight: theme["font-size-sm"],
  },
});
