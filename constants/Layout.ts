import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";
import { Colors } from "./Theme";
import { Platform } from "react-native";

const android = Platform.OS === "android";
export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerLargeTitle: true,
  headerLargeStyle: {
    backgroundColor: Colors.background,
  },
  headerLargeTitleStyle: {
    color: Colors.text,
  },
  headerTintColor: Colors.text,
  headerTitleStyle: {
    fontSize: android ? 30 : undefined,
  },
};
