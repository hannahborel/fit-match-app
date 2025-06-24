import { Router } from 'expo-router';

export const handleLogout = async (
  router: Router,
  signOut: () => Promise<void>,
) => {
  try {
    await signOut();
    router.replace('/login-email');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
