import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useGetLeague } from '@/hooks/useGetLeague';

const LoadingPage = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { data, isLoading } = useGetLeague();

  useEffect(() => {
    // Only proceed if user is signed in and query is not loading
    if (!isSignedIn) {
      router.replace('/login-email');
      return;
    }

    if (!isLoading) {
      if (data.league) {
        // User has league data, go to home
        router.replace('/(protected)/home');
      } else {
        // User has no league data, go to league entry
        router.replace('/leagueEntry');
      }
    }
  }, [isSignedIn, data, isLoading, router]);

  // Show loading spinner while checking
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoadingSpinner />
    </View>
  );
};

export default LoadingPage;
