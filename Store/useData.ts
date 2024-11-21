import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ZustandStorage } from "./AsyncStorage";

export interface BalanceState {
  infoData: Array<any>;
  storeInfoData: (data: any) => void;
}

export const useDataStore = create<BalanceState>()((set, get) => ({
  infoData: [],
  storeInfoData: (data: any) => {
    set((state: any) => ({
      infoData: [...state.infoData, data],
    }));
  },
}));

//later add the storage engine with the persist. Slight issue with asyncstorage now so try again later
