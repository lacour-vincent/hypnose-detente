import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  container: {},
  pressable: {
    width: "100%",
    gap: theme["space-xs"],
    paddingBlock: theme["space-md"],
    paddingInline: theme["space-sm"],
  },
  label: { color: theme["font-primary-color"], fontSize: theme["font-size-md"] },
  description: { color: theme["font-secondary-color"], fontSize: theme["font-size-sm"] },
});
