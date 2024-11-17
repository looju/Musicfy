import { Image } from "react-native";
import UnknownArtistImage from "../assets/unknown_artist.png";
import UnknownTrackImage from "../assets/unknown_track.png";

export const UnknownTrackImageUri =
  Image.resolveAssetSource(UnknownTrackImage).uri;
export const UnknownArtistImageUri =
  Image.resolveAssetSource(UnknownArtistImage).uri;
