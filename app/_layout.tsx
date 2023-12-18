import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { setupDatabase } from '../db';
import RemindersContextProvider from '../context/RemindersContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Setup database
  useEffect(setupDatabase, []);

  if (!loaded) {
    return null;
  }

  return (
    <RemindersContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit/[id]"
          options={{ presentation: 'modal', title: 'Edit a reminder' }}
        />
        <Stack.Screen name="add" options={{ presentation: 'modal', title: 'Create a reminder' }} />
      </Stack>
    </RemindersContextProvider>
  );
};

export default RootLayout;
