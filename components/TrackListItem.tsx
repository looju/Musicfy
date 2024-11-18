import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { UnknownTrackImageUri } from "@/constants/Images";
import { Colors, fontSize } from "@/constants/Theme";
import { defaultStyles } from "@/constants/Styles";
import { useActiveTrack } from "react-native-track-player";
import { Entypo } from "@expo/vector-icons";

type ResultProps = {
  title: string;
  artist_name: string;
  image: string;
  song_id: number;
  artist_id: number;
};

export type TrackListItemProps = {
  track: ResultProps;
  onTrackSelect: (track: ResultProps) => void;
};

const TrackListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TrackListItemProps) => {
  const isActiveTrack = useActiveTrack()?.artist == track.artist_name;
  return (
    <TouchableHighlight onPress={() => handleTrackSelect}>
      <View style={styles.main}>
        <View>
          <Image
            source={{ uri: track.image ?? UnknownTrackImageUri }}
            style={[
              styles.trackWorkImage,
              { opacity: isActiveTrack ? 0.6 : 1 },
            ]}
          />
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
            {track.artist_name && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.artist}
              >
                {track.artist_name}
              </Text>
            )}
          </View>
          <Entypo name="dots-three-horizontal" size={18} color={Colors.icon} />
        </View>
      </View>
    </TouchableHighlight>
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
});
