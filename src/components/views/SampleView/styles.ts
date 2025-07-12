import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: theme.background,
    margin: theme["space-md"],
    borderColor: "red",
    borderWidth: 1,
  },
});
