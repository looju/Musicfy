import { useCallback, useEffect, useState } from "react";
import TrackPlayer from "react-native-track-player";

export const useTrackPlayerVolume = () => {
  const [volume, setVolume] = useState<undefined | number>(undefined);

  const getVolume = useCallback(async () => {
    const currentVolume = await TrackPlayer.getVolume();
    setVolume(currentVolume);
  }, []);

  const handleVolumeChange = useCallback(async (newVolume: number) => {
    if (newVolume < 0 || newVolume > 1) return;
    await TrackPlayer.setVolume(newVolume);
    setVolume(newVolume);
  }, []);

  useEffect(() => {
    getVolume();
  }, [getVolume]);

  return { volume, handleVolumeChange };
};
