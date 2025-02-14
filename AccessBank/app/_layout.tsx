import { useEffect } from 'react';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import MoreOptionScreen from '@/app/screens/Homescreens/MoreOptions';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': 'https://fonts.cdnfonts.com/s/16009/Poppins-Regular.woff',
    'Poppins-Medium': 'https://fonts.cdnfonts.com/s/16009/Poppins-Medium.woff',
    'Poppins-SemiBold': 'https://fonts.cdnfonts.com/s/16009/Poppins-SemiBold.woff',
    'Poppins-Bold': 'https://fonts.cdnfonts.com/s/16009/Poppins-Bold.woff',
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/Login" />
        <Stack.Screen name="(auth)/Signup" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
 
      </Stack>
      <StatusBar style="light" />
    </>
  );
}