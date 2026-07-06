import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="h1 text-center color-lingua-purple">triolingo</Text>
      <Text className="h2 text-center">A great app</Text>
      <Link href="/onboarding" className="mt-6 body-lg text-lingua-purple">
        Go to onboarding
      </Link>
    </View>
  );
}
