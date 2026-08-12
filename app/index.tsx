import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

import { useLanguageStore } from "@/store/languageStore";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
