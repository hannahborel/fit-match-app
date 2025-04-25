import { useAuth } from '@clerk/clerk-expo';
import Constants from 'expo-constants';

// Get the base API URL from environment variables
const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;

if (!API_BASE_URL) {
  console.warn('API_BASE_URL is not set in environment variables. API calls might fail.');
  // You might want to throw an error here depending on your setup
  // throw new Error("Missing API_BASE_URL environment variable.");
}

// Custom hook to create an authenticated fetch instance
export const useApiClient = () => {
  const { getToken } = useAuth();

  const authenticatedFetch = async (endpoint, options = {}) => {
    const token = await getToken(); // Get the Clerk session token

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // Add the Authorization header if the token exists
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Merge default headers with any custom headers provided in options
    const headers = {
      ...defaultHeaders,
      ...options.headers,
    };

    // Construct the full URL
    const url = `${API_BASE_URL || ''}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options, // Spread other options like method, body, etc.
        headers, // Use the combined headers
      });

      // Basic response handling (you might want to expand this)
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status} for URL: ${url}`);
        try {
          // Attempt to parse error body for more details
          const errorBody = await response.json();
          console.error('Error Body:', errorBody);
          // Re-throw a more informative error or return a specific structure
          throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
        } catch (e) {
          // If parsing error body fails, throw generic error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // If response is OK, try to parse JSON, handle potential empty response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return await response.json();
      } else {
        // Handle non-JSON responses if necessary, or return null/response object
        return response; // Or await response.text() etc.
      }
    } catch (error) {
      console.error('API Client fetch error:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  return { authenticatedFetch };
};

// Optional: Export a pre-configured instance if needed outside React components
// (Note: This won't work directly as useAuth is a hook. You'd need a different approach
// for non-component usage, perhaps passing the token explicitly.)
// export const apiClient = ??? // Needs careful consideration
