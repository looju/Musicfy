import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import { RepeatMode } from "react-native-track-player";
import { match } from "ts-pattern";

const repeatOrder = [
  RepeatMode.Off,
  RepeatMode.Track,
  RepeatMode.Queue,
] as const;

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">;
export const PlayerRepeatToggle = ({ iconProps }: IconProps) => {
  const [repeatMode, setRepeatMode] = useState(repeatOrder[0]);

  const toggleRepeat = () => {
    const nextIndex =
      (repeatOrder.indexOf(repeatMode) + 1) % repeatOrder.length;
    setRepeatMode(repeatOrder[nextIndex]);
  };

  const icon = match(repeatMode)
    .returnType<IconName>()
    .with(RepeatMode.Off, () => "repeat-off")
    .with(RepeatMode.Queue, () => "repeat")
    .with(RepeatMode.Track, () => "repeat-once")
    .otherwise("repeat-off");
  return (
    <MaterialCommunityIcons
      name={icon}
      onPress={toggleRepeat}
      color={Colors.icon}
      {...iconProps}
    />
  );
  return { repeatMode, toggleRepeat };
};