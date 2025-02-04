import { Provider } from "@oyl/sdk";
import { DEFAULT_PROVIDER } from "@oyl/sdk/lib/cli/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ConfigState {
  currentProvider: { id: string; provider: Provider };
  setCurrentProvider: (provider: Provider, id: string) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      currentProvider: { id: "oylnet", provider: DEFAULT_PROVIDER.oylnet },
      setCurrentProvider: (provider, id) =>
        set({ currentProvider: { provider, id } }),
    }),
    {
      name: "config-storage",
      partialize: (state) => ({
        currentProvider: state.currentProvider,
      }),
    }
  )
);
