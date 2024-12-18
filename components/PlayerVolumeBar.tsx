import { StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";
import React from "react";
import { useSharedValue } from "react-native-reanimated";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Slider } from "react-native-awesome-slider";
import { Colors } from "@/constants/Colors";
import { defaultStyles, utilStyles } from "@/constants/Styles";
import * as Haptics from "expo-haptics";
import { fontSize } from "@/constants/Theme";
import TrackPlayer from "react-native-track-player";

const PlayerVolumeBar = ({ style }: ViewProps) => {
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);

  return (
    <View style={style}>
      <View style={styles.row}>
        <FontAwesome name="volume-down" size={14} color="white" />
        <Slider
          style={styles.slider}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          containerStyle={utilStyles.slider}
          thumbWidth={0}
          theme={{
            disableMinTrackTintColor: Colors.textMuted,
            maximumTrackTintColor: Colors.maximumTrackTintColor,
            minimumTrackTintColor: Colors.minimumTrackTintColor,
            cacheTrackTintColor: "#333",
            bubbleBackgroundColor: "#666",
            heartbeatColor: "#999",
          }}
          onHapticFeedback={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
          onSlidingStart={() => (isSliding.value = true)}
          onSlidingComplete={async (value) => {
            if (!isSliding.value) return;
            isSliding.value = false;
            await TrackPlayer.seekTo(value * duration);
          }}
          onValueChange={(number) => seekTrack(number)}
          renderBubble={() => null}
        />
        <FontAwesome name="volume-down" size={14} color="white" />
      </View>
    </View>
  );
};

export default PlayerVolumeBar;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  main: {
    flex: 1,
  },
  timeElapsed: {
    ...defaultStyles.text,
    color: Colors.text,
    opacity: 0.75,
    fontSize: fontSize.extraSmall,
    letterSpacing: 0.7,
    fontWeight: "500",
  },
  timeRemaining: {
    ...defaultStyles.text,
    color: Colors.text,
    opacity: 0.75,
    fontSize: fontSize.extraSmall,
    letterSpacing: 0.7,
    fontWeight: "500",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 20,
  },
});
