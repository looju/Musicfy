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

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <View style={{ width: "100%" }}>
        <SkipToNextButton iconSize={24} />
        <PlayPauseButton iconSize={27} />
        <SkipToPreviousButton iconSize={24} />
      </View>
    </View>
  );
};
