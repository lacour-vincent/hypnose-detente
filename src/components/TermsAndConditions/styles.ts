import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme) => ({
  container: { display: "flex", gap: theme["space-md"], padding: theme["space-md"] },
  heading: { fontSize: theme["font-size-lg"], fontWeight: theme["font-weight-medium"] },
  content: { fontSize: theme["font-size-md"], fontWeight: theme["font-weight-regular"] },
}));
