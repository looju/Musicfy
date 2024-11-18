import {
  ActivityIndicator,
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { defaultStyles } from "@/constants/Styles";
import { BaseUrl } from "@/constants/Endpoint";
import axios, { isCancel, AxiosError } from "axios";
import TrackList from "@/components/TrackList";
import { Colors, screenPadding } from "@/constants/Theme";
import { useNavigationsearchBar } from "@/hooks/useNavigationSearch";
import CustomSearchBar from "@/components/Searchbar";

const SongsHome = () => {
  const key = process.env.EXPO_PUBLIC_DISCOGS_KEY;
  const secret = process.env.EXPO_PUBLIC_DISCOGS_SECRET;
  const android = Platform.OS === "android";
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const search = useNavigationsearchBar({
    searchBarOptions: {
      shouldShowHintSearchIcon: true,
      placeholder: "Find in songs",
    },
  });

  const queryServer = () => {
    setLoading(true);
    axios
      .get(
        `${BaseUrl}/database/search?q=${search ?? searchQuery}&track=${
          search ?? searchQuery
        }&key=${key}&secret=${secret}`,
        {
          headers: {
            "User-Agent": "OmofadesBrowser/0.1 +omofade2019@gmail.com",
            "key": key,
            "secret": secret,
          },
        }
      )
      .then((response: any) => {
        const data = response.data.results.map((item: any) => {
          return {
            title:
              searchQuery.charAt(0).toLocaleUpperCase() + searchQuery.slice(1),
            artist: item.title.split("-")[0],
            artwork: item.cover_image,
            song_id: item.id,
            artist_id: item.master_id,
          };
        });
        setResult(data);
        setLoading(false);
      })
      .catch(function (e) {
        console.log(e, "Error searching db");
      });
  };

  return (
    <View style={defaultStyles.container}>
      {android && (
        <CustomSearchBar
          placeholder="Search for songs"
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
          }}
          onSubmit={() => queryServer()}
          loading={false}
          onClear={() => setResult([])}
        />
      )}
      {loading ? (
        <ActivityIndicator
          size={"small"}
          color={Colors.primary}
          style={styles.loading}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentInsetAdjustmentBehavior="automatic"
          style={{ padding: screenPadding.horizontal }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <TrackList result={result} scrollEnabled={false} />
        </ScrollView>
      )}
    </View>
  );
};

export default SongsHome;

const styles = StyleSheet.create({
  loading: {
    alignSelf: "center",
    top: "30%",
  },
});
