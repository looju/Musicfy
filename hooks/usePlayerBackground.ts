import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { getColors } from "react-native-image-colors";
import {
  AndroidImageColors,
  IOSImageColors,
} from "react-native-image-colors/build/types";

export const usePlayerBackground = (url: string) => {
  const [imageColors, setImageColors] = useState<AndroidImageColors>();
  useEffect(() => {
    getColors(url, {
      fallback: Colors.background,
      cache: true,
      key: url,
    }).then((colors) => setImageColors(colors as AndroidImageColors));
  }, [url]);

  return imageColors;
};
