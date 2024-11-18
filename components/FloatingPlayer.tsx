import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useActiveTrack } from "react-native-track-player";

const FloatingPlayer = () => {
  const activeTrack = useActiveTrack();
  if (!activeTrack) {
    return null;
  }
  return (
    <View>
      <Text>FloatingPlayer</Text>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({});
