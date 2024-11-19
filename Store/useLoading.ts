import { create } from "zustand";

const useLoading = create((set) => ({
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),
}));

export default useLoading;
