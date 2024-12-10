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

const PlayerProgressBar = ({ style }: ViewProps) => {
  const { position, buffered, duration } = useProgress(250);
  const progress = useSharedValue(position);
  const min = useSharedValue(0);
  const max = useSharedValue(duration);

  function formatSecondsToMinute(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  const trackElapsedTime = formatSecondsToMinute(position.toString(), "0", 2);
  const remainingTime = formatSecondsToMinute(
    (duration - position).toString(),
    "0",
    2
  );
  const seekTrack = async (number: number) => {
    await TrackPlayer.seekTo(number * 1000);
  };

  return (
    <View style={[style, styles.main]}>
      <Slider
        style={styles.slider}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        theme={{
          disableMinTrackTintColor: "#fff",
          maximumTrackTintColor: "#fff",
          minimumTrackTintColor: "#000",
          cacheTrackTintColor: "#333",
          bubbleBackgroundColor: "#666",
          heartbeatColor: "#999",
        }}
        onHapticFeedback={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
        onSlidingComplete={(number) => seekTrack(number)}
      />
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
