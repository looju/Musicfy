import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useActiveTrack } from "react-native-track-player";
import {
  UnknownArtistImageUri,
  UnknownTrackImageUri,
} from "@/constants/Images";
import { defaultStyles } from "@/constants/Styles";

const FloatingPlayer = () => {
  const activeTrack = useActiveTrack();
  const displayTrack = activeTrack;
  if (!activeTrack) {
    return null;
  }
  return (
    <TouchableOpacity>
      <>
        <Image
          source={{ uri: displayTrack?.artist ?? UnknownTrackImageUri }}
          style={styles.artistImg}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{displayTrack?.title}</Text>
          <Text style={styles.artistText}>{displayTrack?.artist}</Text>
        </View>
        <View style={styles.controlsView}>
          <PlayPauseButton iconSize={24} />
          <SkipButton iconSize={22} />
        </View>
      </>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
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
    marginTop: 5,
    fontSize: 13,
    fontWeight: "500",
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
