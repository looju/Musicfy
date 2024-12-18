import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import React from "react";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { FormatSecondsToMinutes } from "@/hooks/Time";
import { Colors } from "@/constants/Colors";
import { defaultStyles, utilStyles } from "@/constants/Styles";
import { fontSize } from "@/constants/Theme";

const PlayerProgressBar = ({ style }: ViewProps) => {
  const { position, buffered, duration } = useProgress(250);
  const progress = useSharedValue(position);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);

  const trackElapsedTime = FormatSecondsToMinutes(position);
  const remainingTime = FormatSecondsToMinutes(duration - position);
  const seekTrack = async (number: number) => {
    await TrackPlayer.seekTo(number * duration);
  };
  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }
  return (
    <View style={[style, styles.main]}>
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
          seekTrack(value);
        }}
        onValueChange={(number) => seekTrack(number)}
        renderBubble={() => null}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeElapsed}>{trackElapsedTime}</Text>
        <Text style={styles.timeRemaining}>-{remainingTime}</Text>
      </View>
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
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
