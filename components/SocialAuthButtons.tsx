import { useSSO } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

const SOCIAL_PROVIDERS = [
  {
    icon: "logo-google",
    label: "Continue with Google",
    color: "#EA4335",
    strategy: "oauth_google",
  },
  {
    icon: "logo-facebook",
    label: "Continue with Facebook",
    color: "#1877F2",
    strategy: "oauth_facebook",
  },
  {
    icon: "logo-apple",
    label: "Continue with Apple",
    color: "#000000",
    strategy: "oauth_apple",
  },
] as const;

export function SocialAuthButtons() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  async function handlePress(strategy: (typeof SOCIAL_PROVIDERS)[number]["strategy"]) {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL("/oauth-callback"),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      Alert.alert(
        "Sign in failed",
        err instanceof Error ? err.message : "Please try again.",
      );
    }
  }

  return (
    <View className="gap-3">
      {SOCIAL_PROVIDERS.map((provider) => (
        <Pressable
          key={provider.icon}
          className="border border-border rounded-2xl flex-row items-center justify-center py-3.5 gap-3"
          onPress={() => handlePress(provider.strategy)}
        >
          <Ionicons name={provider.icon} size={20} color={provider.color} />
          <Text className="body-lg font-poppins-medium text-text-primary">
            {provider.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
