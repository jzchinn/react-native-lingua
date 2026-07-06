import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const SOCIAL_PROVIDERS = [
  { icon: "logo-google", label: "Continue with Google", color: "#EA4335" },
  { icon: "logo-facebook", label: "Continue with Facebook", color: "#1877F2" },
  { icon: "logo-apple", label: "Continue with Apple", color: "#000000" },
] as const;

export function SocialAuthButtons() {
  return (
    <View className="gap-3">
      {SOCIAL_PROVIDERS.map((provider) => (
        <Pressable
          key={provider.icon}
          className="border border-border rounded-2xl flex-row items-center justify-center py-3.5 gap-3"
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
