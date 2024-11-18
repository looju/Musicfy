import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Track, useActiveTrack } from "react-native-track-player";
import {
  UnknownArtistImageUri,
  UnknownTrackImageUri,
} from "@/constants/Images";
import { defaultStyles } from "@/constants/Styles";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";
import { Colors } from "@/constants/Theme";

type FloatingPlayerProps = {
  style: ViewStyle;
};

const FloatingPlayer = ({ style }: FloatingPlayerProps) => {
  const activeTrack = useActiveTrack();
  const displayTrack: Track = activeTrack ?? {
    title: "This is a track",
    artist: "Unknown Artist",
    artwork: UnknownArtistImageUri,
  };
  if (!displayTrack) {
    return null;
  }

  return (
    <TouchableOpacity style={[styles.main, style]} activeOpacity={0.9}>
      <>
        <Image
          source={{ uri: displayTrack?.artwork ?? UnknownTrackImageUri }}
          style={styles.artistImg}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{displayTrack?.title}</Text>
          <Text style={styles.artistText}>{displayTrack?.artist}</Text>
        </View>
        <View style={styles.controlsView}>
          <PlayPauseButton iconSize={18} />
          <SkipToNextButton iconSize={17} />
        </View>
      </>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Colors.softDark,
    paddingVertical: 10,
  },
  artistImg: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  titleText: {
    ...defaultStyles.text,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    paddingLeft: 10,
  },
  artistText: {
    ...defaultStyles.text,
    marginTop: 5,
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    overflow: "hidden",
  },
  controlsView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    columnGap: 20,
  },
});
