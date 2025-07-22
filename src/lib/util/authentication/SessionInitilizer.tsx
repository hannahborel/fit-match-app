import { initSessionAtom, sessionAtom } from '@/atoms/sessionAtom';
import { useAuth } from '@clerk/clerk-expo';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const SessionInitilizer = () => {
  const initSession = useSetAtom(initSessionAtom);
  const setSession = useSetAtom(sessionAtom);
  const { isLoaded, isSignedIn, getToken } = useAuth();

  useEffect(() => {
    // First: load from localStorage or SecureStore
    initSession();
  }, []);

  useEffect(() => {
    const syncFromClerk = async () => {
      if (!isLoaded) return;
      const token = isSignedIn ? await getToken() : null;
      setSession(token); // Overrides local storage value if Clerk is signed in
    };

    syncFromClerk();
  }, [isLoaded, isSignedIn]);

  return null;
};

export default SessionInitilizer;
