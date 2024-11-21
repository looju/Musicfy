import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image as ExpoImage } from "expo-image";
import { UnknownTrackImageUri } from "@/constants/Images";
import LoaderKit from "react-native-loader-kit";
import { Colors, fontSize } from "@/constants/Theme";
import { defaultStyles } from "@/constants/Styles";
import { useActiveTrack, useIsPlaying } from "react-native-track-player";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { ResultProps } from "./TrackList";

export type TrackListItemProps = {
  track: ResultProps;
  handleTrackSelect: () => void;
};

const TrackListItem = ({ track, handleTrackSelect }: TrackListItemProps) => {
  const isActiveTrack = useActiveTrack()?.artist == track.artist;
  const { playing } = useIsPlaying();
  return (
    <TouchableOpacity onPress={() => handleTrackSelect()}>
      <View style={styles.main}>
        <View>
          <Image
            source={{ uri: track.artwork ?? UnknownTrackImageUri }}
            style={[
              styles.trackWorkImage,
              { opacity: isActiveTrack ? 0.6 : 1 },
            ]}
          />
          {isActiveTrack &&
            (playing ? (
              <View style={[styles.playingIndicatorView]}>
                <ExpoImage
                  style={styles.playingIndicator}
                  source={require("@/assets/play.gif")}
                />
              </View>
            ) : (
              <View style={[styles.playingIndicatorView]}>
                <Ionicons
                  name="play"
                  size={20}
                  color={Colors.icon}
                  style={styles.nonPlayingIndicator}
                />
              </View>
            ))}
        </View>
        <View style={styles.menuView}>
          <View style={styles.titleView}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.title,
                { color: isActiveTrack ? Colors.primary : Colors.text },
              ]}
            >
              {track.title}
            </Text>
            {track.artist && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.artist}
              >
                {track.artist}
              </Text>
            )}
          </View>
          <Entypo name="dots-three-horizontal" size={18} color={Colors.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrackListItem;

const styles = StyleSheet.create({
  trackWorkImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  titleView: {
    width: "100%",
  },
  title: {
    ...defaultStyles.text,
    fontWeight: "600",
    fontSize: fontSize.small,
    maxWidth: "80%",
  },
  artist: {
    ...defaultStyles.text,
    color: Colors.textMuted,
    fontSize: fontSize.extraSmall,
    marginTop: 7,
    maxWidth: "90%",
  },
  main: {
    flex: 1,
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 20,
  },
  menuView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playingIndicator: {
    height: 25,
    width: 25,
  },
  playingIndicatorView: {
    height: 50,
    width: 50,
    borderRadius: 8,
    backgroundColor: Colors.halfDark,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    zIndex: 1000,
  },

  nonPlayingIndicator: {
    left: 16,
    top: 18,
    position: "absolute",
    zIndex: 1000,
  },
});
