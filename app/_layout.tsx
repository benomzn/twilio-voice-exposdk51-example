import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "@/utils/voice";
import { Audio } from "expo-av";

import { useColorScheme } from "@/hooks/useColorScheme";
import useTwilioVoice from "@/hooks/useTwilioVoice";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useTwilioVoice({ loaded });

  useEffect(() => {
    if (loaded) {
      (async () => {
        await SplashScreen.hideAsync();
        await Audio.requestPermissionsAsync();
      })();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(stacks)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
