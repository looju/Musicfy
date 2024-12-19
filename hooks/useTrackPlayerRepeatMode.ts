import { useCallback, useEffect, useState } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

export const useTrackPlayerRepeatMode = () => {
  const [repeatMode, setRepeatMode] = useState<RepeatMode>();

  const getRepeatMode = useCallback(async () => {
    await TrackPlayer.getRepeatMode().then((mode: RepeatMode) =>
      setRepeatMode(mode)
    );
  }, []);

  const changeRepeatMode = useCallback(async (mode: RepeatMode) => {
    await TrackPlayer.setRepeatMode(mode).then((mode: RepeatMode) =>
      setRepeatMode(mode)
    );
  }, []);

  useEffect(() => {
    getRepeatMode();
  }, [getRepeatMode]);

  return { repeatMode, changeRepeatMode };
};
