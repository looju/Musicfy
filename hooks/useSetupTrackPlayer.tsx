import { useEffect, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

type onLoadType = {
  onLoad?: () => void;
};

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });
  await TrackPlayer.setVolume(0.5);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  await TrackPlayer.setPlayWhenReady(true);
};

export const useSetupTrackPlayer = ({ onLoad }: onLoadType) => {
  const isInitialized = useRef(false);
  useEffect(() => {
    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoad?.();
      })
      .catch(() => {
        isInitialized.current = false;
        console.log("Error setting up player");
      });
  }, [onLoad]);
};
