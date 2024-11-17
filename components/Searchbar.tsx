import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { Icon, Searchbar } from "react-native-paper";
import { Colors } from "@/constants/Theme";

type CustomSearchBarProps = {
  placeholder: string;
  onChange: (query: string) => void;
  value: string;
  loading: boolean;
  onSubmit: () => void;
  onClear: () => void;
};

const CustomSearchBar = ({
  placeholder,
  onChange,
  value,
  loading,
  onSubmit,
  onClear,
}: CustomSearchBarProps) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const Max_Header_Height = 60;
  const Min_Header_Height = 50;
  const Scroll_Distance = Max_Header_Height - Min_Header_Height;
  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Max_Header_Height, Min_Header_Height],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.header]}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        value={value}
        loading={loading || false}
        elevation={2}
        enablesReturnKeyAutomatically={true}
        icon={"text-search"}
        style={styles.search}
        placeholderTextColor={Colors.textMuted}
        iconColor={Colors.white}
        cursorColor={Colors.primary}
        selectionColor={Colors.white}
        inputStyle={{ color: Colors.white }}
        onClearIconPress={onClear}
      />
    </Animated.View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    paddingTop: 10,
    position: "static",
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  search: {
    width: "95%",
    backgroundColor: "#000",
    color: Colors.white,
  },
});
