import { Event, useTrackPlayerEvents } from "react-native-track-player";

const events = [
  Event.PlaybackState,
  Event.PlaybackActiveTrackChanged,
  Event.PlaybackError,
];

export const useLogTrackPlayer = () => {
  useTrackPlayerEvents(events, async (event) => {
    if (event.type === Event.PlaybackState) {
      console.log("Playback state changed:", event.state);
    }
    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log("Active track changed:", event);
    }
    if (event.type === Event.PlaybackError) {
      console.log("An error occurred:", event);
    }
  });
};
