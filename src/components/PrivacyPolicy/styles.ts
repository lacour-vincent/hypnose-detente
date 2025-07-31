import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  container: { display: "flex", gap: theme["space-md"], padding: theme["space-md"] },
  heading: { fontSize: theme["font-size-lg"], fontWeight: theme["font-weight-medium"] },
  content: { fontSize: theme["font-size-md"], fontWeight: theme["font-weight-regular"] },
});
