import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const useLoading = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),
}));

export default useLoading;
