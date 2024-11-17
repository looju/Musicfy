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
import { Track } from "react-native-track-player";

export type TrackListProps = Partial<FlatListProps<Track>> & {
  result: Track;
};
const android = Platform.OS === "android";

const TrackList = ({ result, ...flatListProps }: TrackListProps) => {
  const key = process.env.EXPO_PUBLIC_DISCOGS_KEY;
  const secret = process.env.EXPO_PUBLIC_DISCOGS_SECRET;
  const [tracks, setTracks] = useState<[]>();
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
            artist_name: item.basic_information.artists[0].name,
            image: item.basic_information.cover_image,
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

  console.log(result.length, "result2");

  return (
    <>
      <FlatList
        data={result.length !== 0 ? result : tracks}
        renderItem={({ item, index }) => <TrackListItem track={item} />}
        {...flatListProps}
        ItemSeparatorComponent={() => <ItemDivider />}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
        ListFooterComponent={ItemDivider}
        keyExtractor={(item) => item.song_id.toString()}
      />
    </>
  );
};

export default TrackList;

const styles = StyleSheet.create({});
