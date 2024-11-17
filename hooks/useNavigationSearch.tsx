import { Colors } from "@/constants/Theme";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { SearchBar, SearchBarProps } from "react-native-screens";

const defaultSearchOptions: SearchBarProps = {
  tintColor: Colors.primary,
  textColor: Colors.light.text,
  hideWhenScrolling: false,
};

type searchProps = {
  searchBarOptions?: SearchBarProps;
};

export const useNavigationsearchBar = ({ searchBarOptions }: searchProps) => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const handleOnChangeText: SearchBarProps["onChangeText"] = ({
    nativeEvent: { text },
  }) => {
    setSearch(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions]);
  return search;
};
