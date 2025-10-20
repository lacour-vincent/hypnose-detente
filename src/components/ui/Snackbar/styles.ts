import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme) => ({
  container: {
    position: "absolute",
    bottom: theme["space-md"],
    left: theme["space-sm"],
    right: theme["space-sm"],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme["space-xs"],
    padding: theme["space-sm"],
    borderRadius: theme["space-xs"],
  },
  "container--primary": { backgroundColor: theme["success-color"] },
  "container--secondary": { backgroundColor: theme["error-color"] },
  message: { flex: 1, fontSize: theme["font-size-sm"] },
  "message--primary": { color: theme["success-color-text"] },
  "message--secondary": { color: theme["error-color-text"] },
  pressable: { padding: theme["space-2xs"] },
}));
