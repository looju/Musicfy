import MovingText from "@/components/MovingText";
import { PlayerControls } from "@/components/PlayerControls";
import PlayerProgressBar from "@/components/PlayerProgressBar";
import { PlayerRepeatToggle } from "@/components/PlayerRepeatToggle";
import PlayerVolumeBar from "@/components/PlayerVolumeBar";
import { UnknownTrackImageUri } from "@/constants/Images";
import { defaultStyles, utilStyles } from "@/constants/Styles";
import { Colors, screenPadding } from "@/constants/Theme";
import { usePlayerBackground } from "@/hooks/usePlayerBackground";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";

const android = Platform.OS == "android";
export default function Player() {
  const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();
  const { imageColors } = usePlayerBackground(
    activeTrack?.artwork ?? UnknownTrackImageUri
  );
  const isFavourite = false;

  const toggleFavourites = () => {};
  if (!activeTrack) {
    return (
      <View style={styles.ind}>
        <ActivityIndicator size={"small"} color={Colors.primary} />
      </View>
    );
  }
  return (
    <LinearGradient>
      <View style={styles.main}>
        <View
          style={[
            styles.innerMain,
            { marginTop: android ? top + 30 : top + 70, marginBottom: bottom },
          ]}
        >
          <View style={styles.imgView}>
            <Image
              source={{ uri: activeTrack.artwork ?? UnknownTrackImageUri }}
              enableLiveTextInteraction
              priority={"high"}
              contentFit="cover"
              contentPosition={"center"}
              style={styles.img}
            />
          </View>
          <View style={styles.infoView}>
            <View style={{ marginTop: "auto" }}>
              <View style={{ height: 60 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.titleView}>
                    <MovingText
                      text={activeTrack.title ?? ""}
                      animationThreshold={30}
                      style={styles.trackTitle}
                    />
                  </View>
                  <FontAwesome
                    name={isFavourite ? "heart" : "heart-o"}
                    size={20}
                    color={isFavourite ? Colors.primary : Colors.icon}
                    style={{ marginHorizontal: 14 }}
                    onPress={toggleFavourites}
                  />
                </View>
                {activeTrack.artist && (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.trackArtist, { marginTop: 6 }]}
                  >
                    {activeTrack.artist}
                  </Text>
                )}
              </View>
              <PlayerProgressBar style={{ marginTop: 30 }} />
              <PlayerControls style={{ marginTop: 16 }} />
            </View>
            <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />
            <View style={utilStyles.centeredRow}>
              <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: Colors.halfDark,
  },
  inset: {
    position: "absolute",
    zIndex: 1000,
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    right: 0,
  },
  access: {
    width: 50,
    height: 8,
    borderRadius: 8,
    backgroundColor: Colors.white,
    opacity: 0.7,
  },
  ind: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerMain: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  imgView: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 11,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  infoView: {
    flex: 1,
  },
  trackArtist: {
    ...defaultStyles.text,
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  trackTitle: {
    ...defaultStyles.text,
    color: Colors.white,
    fontSize: 22,
    fontWeight: "700",
  },
  titleView: {
    flex: 1,
    overflow: "hidden",
  },
});
