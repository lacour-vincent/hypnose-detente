import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme) => ({
  container: { display: "flex", gap: theme["space-md"], padding: theme["space-md"] },
  heading: {
    color: theme["font-primary-color"],
    fontSize: theme["font-size-lg"],
    fontWeight: theme["font-weight-medium"],
  },
  content: {
    color: theme["font-primary-color"],
    fontSize: theme["font-size-md"],
    fontWeight: theme["font-weight-regular"],
  },
}));
