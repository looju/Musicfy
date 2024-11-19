import { Colors } from "@/constants/Theme";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

type PlayerControlsProps = {
  style?: ViewStyle;
};

type PlayerButtonProps = {
  iconSize: number;
  style?: ViewStyle;
};

export const PlayPauseButton = ({ iconSize, style }: PlayerButtonProps) => {
  const { playing } = useIsPlaying();
  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => (playing ? TrackPlayer.pause() : TrackPlayer.play())}
      >
        <FontAwesome
          size={iconSize}
          color={Colors.text}
          name={playing ? "pause" : "play"}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <FontAwesome size={iconSize} color={Colors.text} name="forward" />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
      <FontAwesome size={iconSize} color={Colors.text} name="backward" />
    </TouchableOpacity>
  );
};
