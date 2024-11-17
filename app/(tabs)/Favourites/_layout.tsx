import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import { View } from "react-native";
import { StackScreenWithSearchBar } from "@/constants/Layout";

export default function FavouritesScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "Favourites", ...StackScreenWithSearchBar }}
        />
      </Stack>
    </View>
  );
}
