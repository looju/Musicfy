import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import { View } from "react-native";
import { StackScreenWithSearchBar } from "@/constants/Layout";

export default function ArtistScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "Artist", ...StackScreenWithSearchBar }}
        />
      </Stack>
    </View>
  );
}
