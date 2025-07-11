import { StyleSheet } from "react-native";

import theme from "@sg/styling";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme["space-xs"],
    borderColor: "black",
    borderWidth: 1,
  },
  title: {
    color: theme["font-primary-color"],
    fontSize: theme["font-size-md"],
    fontWeight: theme["font-weight-bold"],
  },
  content: {
    color: theme["font-primary-color"],
    fontSize: theme["font-size-sm"],
    fontWeight: theme["font-weight-medium"],
    marginTop: theme["space-xs"],
  },
  sentAt: {
    color: theme["font-primary-color"],
    fontSize: theme["font-size-sm"],
    fontWeight: theme["font-weight-regular"],
    marginTop: theme["space-2xs"],
  },
});
