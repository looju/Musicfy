import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";
import { StackScreenWithSearchBar } from "@/constants/Layout";
import { Colors } from "@/constants/Theme";

export default function SongsScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Songs",
          }}
        />
      </Stack>
    </View>
  );
}
