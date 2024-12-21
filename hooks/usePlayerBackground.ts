import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { getColors } from "react-native-image-colors";
import {
  AndroidImageColors,
  IOSImageColors,
} from "react-native-image-colors/build/types";

export const usePlayerBackground = (url: string | undefined) => {
  const [imageColors, setImageColors] = useState<AndroidImageColors>();
  useEffect(() => {
    url !== undefined
      ? getColors(url, {
          fallback: Colors.background,
          cache: true,
          key: url,
        }).then((colors) => setImageColors(colors as AndroidImageColors))
      : null;
  }, [url]);

  return { imageColors };
};
