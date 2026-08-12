import { useAuth, useClerk } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="h1 text-center color-lingua-purple">triolingo</Text>
      <Link href="/language-selection" asChild>
        <Pressable className="bg-lingua-purple rounded-full items-center justify-center py-4 px-8 mt-6">
          <Text className="body-lg font-poppins-semibold text-white">
            Choose a language
          </Text>
        </Pressable>
      </Link>
      <Pressable
        className="bg-lingua-purple rounded-full items-center justify-center py-4 px-8 mt-6"
        onPress={() => {
          signOut().catch((err) => console.error("Sign out failed:", err));
        }}
      >
        <Text className="body-lg font-poppins-semibold text-white">
          Sign out
        </Text>
      </Pressable>
    </View>
  );
}
