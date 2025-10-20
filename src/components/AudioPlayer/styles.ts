import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme) => ({
  container: { paddingBlockEnd: theme["space-xl"], paddingInline: theme["space-md"], gap: theme["space-lg"] },
  wrapper: { display: "flex", flexDirection: "row", width: "100%", gap: theme["space-2xs"], alignItems: "center" },
  slider: { flex: 1 },
  progressbar: { flex: 1, paddingBlock: theme["space-xs"], paddingInline: theme["space-sm"] + theme["space-2xs"] },
  timer: {
    flex: 0,
    color: theme["font-primary-color"],
    fontSize: theme["font-size-sm"],
    lineHeight: theme["font-size-sm"],
  },
  player: {
    padding: theme["space-md"],
    marginInline: "auto",
    borderRadius: "50%",
    elevation: 3,
    color: theme["secondary-color-text"],
    backgroundColor: theme["secondary-color"],
  },
}));
