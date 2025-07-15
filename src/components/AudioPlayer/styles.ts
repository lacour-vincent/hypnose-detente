import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  container: { padding: theme["space-xl"] },
  player: {
    padding: theme["space-md"],
    marginInline: "auto",
    borderRadius: "50%",
    color: theme["secondary-color-text"],
    backgroundColor: theme["secondary-color"],
  },
});
