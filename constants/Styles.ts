import { StyleSheet } from "react-native";
import { Colors, fontSize } from "./Theme";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: fontSize.small,
    color: Colors.text,
  },
});

export const utilStyles = StyleSheet.create({
  separator: {
    borderColor: Colors.textMuted,
    borderWidth: 0.2,
    opacity: 0.1,
  },
});
