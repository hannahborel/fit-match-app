// atoms/sessionAtom.ts
import { atom } from 'jotai';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'session-token';

// Internal atoms
const sessionValueAtom = atom<string | null>(null);
const sessionLoadingAtom = atom<boolean>(true);

// Combined public atom: [isLoading, token]
export const sessionAtom = atom(
  (get) =>
    [get(sessionLoadingAtom), get(sessionValueAtom)] as [
      boolean,
      string | null,
    ],
  async (_get, set, token: string | null) => {
    set(sessionValueAtom, token);
    set(sessionLoadingAtom, false);

    // Persist token
    if (Platform.OS === 'web') {
      if (token === null) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, token);
    } else {
      if (token === null) await SecureStore.deleteItemAsync(STORAGE_KEY);
      else await SecureStore.setItemAsync(STORAGE_KEY, token);
    }
  },
);

// Init atom: run once on app start to load from storage
export const initSessionAtom = atom(null, async (_get, set) => {
  let storedToken: string | null = null;

  if (Platform.OS === 'web') {
    storedToken = localStorage.getItem(STORAGE_KEY);
  } else {
    storedToken = await SecureStore.getItemAsync(STORAGE_KEY);
  }

  set(sessionValueAtom, storedToken);
  set(sessionLoadingAtom, false);
});
