import { ResultProps, TrackListProps } from "@/components/TrackList";
import { useEffect, useState } from "react";
import { useActiveTrack } from "react-native-track-player";

export const useLastActiveTrack = () => {
  const activeTrack = useActiveTrack();
  const [lastActiveTrack, setLastActiveTrack] = useState<ResultProps>();

  useEffect(() => {
    if (!activeTrack) return;

    setLastActiveTrack(activeTrack);
  }, [activeTrack]);

  return lastActiveTrack;
};
