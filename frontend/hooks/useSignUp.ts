import { create } from "zustand";

interface SignUpState {
  name: string | null;
  email: string | null;
  username: string | null;
  password: string | null;

  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;

  reset: () => void;
}

export const useSignUp = create<SignUpState>((set) => ({
  name: null,
  email: null,
  username: null,
  password: null,

  setName: (name) => {
    set({ name });
  },
  setEmail: (email) => {
    set({ email });
  },
  setUsername: (username) => {
    set({ username });
  },
  setPassword: (password) => {
    set({ password });
  },

  reset: () => {
    set({
      name: null,
      email: null,
      username: null,
      password: null,
    });
  },
}));
