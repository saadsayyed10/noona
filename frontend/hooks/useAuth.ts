import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  user: any | null;
  setAuth: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,

  setAuth: async (token, user) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null });
  },

  hydrate: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");
      set({ token, user: userStr ? JSON.parse(userStr) : null });
    } catch (e) {
      console.log("Failed to hydrate auth state:", e);
      await AsyncStorage.multiRemove(["token", "user"]);
      set({ token: null, user: null });
    }
  },
}));
