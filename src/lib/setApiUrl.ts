import Constants from 'expo-constants';
import { Platform } from 'react-native';

const { API_BASE_URL, API_LOCAL_IP } = Constants.expoConfig?.extra || {};

export const isWeb = Platform.OS === 'web';
export const isNativeMobile =
  Platform.OS === 'ios' || Platform.OS === 'android';

export const API_URL = API_BASE_URL;
