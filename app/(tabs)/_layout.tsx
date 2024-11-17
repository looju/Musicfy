import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BlurView } from "expo-blur";
import { fontSize } from "@/constants/Theme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const android = Platform.OS === "android";
  return (
    <Tabs
      initialRouteName="(songs)"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: fontSize.extraSmall,
          fontWeight: "500",
        },
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 8,
        },
        tabBarBackground: () => (
          <>
            {!android ? (
              <BlurView
                intensity={95}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  overflow: "hidden",
                }}
              />
            ) : (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  overflow: "hidden",
                  backgroundColor: "rgba(0,0,0,0.85)",
                }}
              />
            )}
          </>
        ),
      }}
    >
      <Tabs.Screen
        name="Favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"heart"} color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Playlist"
        options={{
          title: "Playlist",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"library"}
              color={color}
              size={focused ? 25 : 20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(songs)"
        options={{
          title: "Songs",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"musical-notes"}
              color={color}
              size={focused ? 25 : 20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Artist"
        options={{
          title: "Artist",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"people"}
              color={color}
              size={focused ? 25 : 20}
            />
          ),
        }}
      />
    </Tabs>
  );
}
