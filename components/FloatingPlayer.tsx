import {
  ActivityIndicator,
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
import { ResultProps } from "./TrackList";
import useLoading from "@/Store/useLoading";
import { useLastActiveTrack } from "@/hooks/useLastActiveTrack";
import MovingText from "./MovingText";
import { useRouter } from "expo-router";

type FloatingPlayerProps = {
  style: ViewStyle;
};

const FloatingPlayer = ({ style }: FloatingPlayerProps) => {
  const router = useRouter();
  const loading = useLoading((state) => state.loading);
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();
  const displayTrack: ResultProps = activeTrack ?? lastActiveTrack;
  if (!displayTrack) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.main, style]}
      activeOpacity={0.9}
      onPress={() => router.navigate("/Player")}
    >
      <>
        {loading ? (
          <ActivityIndicator
            style={styles.ind}
            color={Colors.primary}
            size={"small"}
          />
        ) : (
          <>
            <Image
              source={{ uri: displayTrack?.artwork ?? UnknownTrackImageUri }}
              style={styles.artistImg}
            />
            <View style={styles.infoContainer}>
              <MovingText
                style={styles.titleText}
                text={displayTrack?.title}
                animationThreshold={25}
              />

              <Text style={styles.artistText}>{displayTrack?.artist}</Text>
            </View>
            <View style={styles.controlsView}>
              <PlayPauseButton iconSize={18} />
              <SkipToNextButton iconSize={17} />
            </View>
          </>
        )}
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
  ind: {
    alignSelf: "center",
    width: "100%",
  },
});
