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

export const calculateTimeLeft = (targetTime: string) => {
  const difference = new Date(targetTime).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};
