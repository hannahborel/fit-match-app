import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set a default stale time to reduce unnecessary refetches
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Set a default garbage collection time
      gcTime: 1000 * 60 * 10, // 10 minutes
      // Retry failed requests up to 2 times by default
      retry: (failureCount, error) => {
        // Don't retry on network errors or timeouts
        if (
          error?.message?.includes('Failed to fetch') ||
          error?.message?.includes('Network request failed') ||
          error?.message?.includes('timeout') ||
          error?.message?.includes('AbortError')
        ) {
          return false;
        }
        return failureCount < 2;
      },
      // Exponential backoff for retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry mutations up to 1 time
      retry: 1,
      retryDelay: 1000,
    },
  },
});
