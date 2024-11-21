import {
  FlatList,
  FlatListProps,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { BaseUrl } from "@/constants/Endpoint";
import TrackListItem from "./TrackListItem";
import { utilStyles } from "@/constants/Styles";
import { Searchbar } from "react-native-paper";
import CustomSearchBar from "./Searchbar";
import TrackPlayer, { Track } from "react-native-track-player";
import useLoading from "@/Store/useLoading";
import { getRandomUri, randomUri, uris } from "@/hooks/useRandomUri";
import { useDataStore } from "@/Store/useData";

export type ResultProps = {
  url: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  date: string; // RFC 3339
  artwork: string; // Load artwork from the network
  duration: number; // Duration in seconds
  song_id: string;
  artist_id: string;
};

export type TrackListProps = Partial<FlatListProps<ResultProps>> & {
  result: Array<ResultProps>;
};
const android = Platform.OS === "android";

const TrackList = ({ result, ...flatListProps }: TrackListProps) => {
  const key = process.env.EXPO_PUBLIC_DISCOGS_KEY;
  const secret = process.env.EXPO_PUBLIC_DISCOGS_SECRET;
  const setLoading = useLoading((state) => state.setLoading);
  const storeInfoData = useDataStore((state) => state.storeInfoData);
  const [tracks, setTracks] = useState<ResultProps>();
  const [uri, setUri] = useState("");
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] =
    useState<ResultProps>();
  const [artistId, setArtistId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${BaseUrl}/users/LojuForever/wants?key=${key}&secret=${secret}`, {
        headers: {
          "User-Agent": "OmofadesBrowser/0.1 +omofade2019@gmail.com",
          "key": key,
          "secret": secret,
        },
      })
      .then((response: any) => {
        const data = response.data.wants.map((item: any) => {
          return {
            title: item.basic_information.title,
            artist: item.basic_information.artists[0].name,
            artwork: item.basic_information.cover_image,
            song_id: item.basic_information.id,
            artist_id: item.basic_information.artists[0].id,
          };
        });
        setTracks(data);
      })
      .catch(function (e) {
        console.log(e);
      });
  }, []);

  const ItemDivider = () => {
    return (
      <View
        style={{ ...utilStyles.separator, marginVertical: 9, marginLeft: 60 }}
      />
    );
  };

  const EmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>No songs found</Text>
      </View>
    );
  };

  const handleTrackSelect = async (track: ResultProps) => {
    setLoading(true);
    await axios
      .get(`${BaseUrl}/releases/${track.song_id}?key=${key}&secret=${secret}`, {
        headers: {
          "User-Agent": "OmofadesBrowser/0.1 +omofade2019@gmail.com",
          "key": key,
          "secret": secret,
        },
      })
      .then(async (response: any) => {
        const data = {
          title: response.data.title,
          artist: response.data.artists[0].name,
          artwork: response.data.thumb,
          url: getRandomUri(uris).url,
        };
        setLoading(false);
        storeInfoData(response.data);
        await TrackPlayer.load(data);
        await TrackPlayer.play();
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <>
      <FlatList
        data={result.length !== 0 ? result : tracks}
        renderItem={({ item, index }) => (
          <TrackListItem
            track={item}
            handleTrackSelect={() => handleTrackSelect(item)}
          />
        )}
        {...flatListProps}
        ItemSeparatorComponent={() => <ItemDivider />}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
        ListFooterComponent={ItemDivider}
        ListEmptyComponent={EmptyComponent}
        keyExtractor={(item) => item.song_id.toString()}
      />
    </>
  );
};

export default TrackList;

const styles = StyleSheet.create({});
