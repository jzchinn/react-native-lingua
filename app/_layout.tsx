import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useRef } from "react";
import { PostHogProvider } from "posthog-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { PostHogIdentityBridge } from "@/components/PostHogIdentityBridge";
import { StreamVideoProvider } from "@/components/StreamVideoProvider";
import { posthog } from "../src/config/posthog";

import "../global.css";

WebBrowser.maybeCompleteAuthSession();
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function RootLayout() {
  const pathname = usePathname();
  const previousPathname = useRef<string | undefined>(undefined);

  // Manual screen tracking for Expo Router.
  // Route params aren't forwarded here — they can carry OAuth callback
  // values like `code`/`state` that must never reach analytics.
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
      });
      previousPathname.current = pathname;
    }
  }, [pathname]);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: true,
        }}
      >
      <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
        <PostHogIdentityBridge>
          <SafeAreaProvider>
            <StreamVideoProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </StreamVideoProvider>
          </SafeAreaProvider>
        </PostHogIdentityBridge>
      </ClerkProvider>
    </PostHogProvider>
  );
}
