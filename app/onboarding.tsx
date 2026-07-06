import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function Onboarding() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 px-6">
        <View className="flex-row items-center justify-center gap-2 mt-2">
          <Image
            source={images.mascotLogo}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
          <Text className="text-2xl font-poppins-bold text-text-primary">
            triolingo
          </Text>
        </View>

        <View className="mt-10">
          <Text className="h1">
            Your AI language{"\n"}
            <Text className="h1 text-lingua-purple">teacher.</Text>
          </Text>
          <Text className="body-lg text-text-secondary mt-3">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <View className="items-center justify-center">
            <View className="absolute top-4 -left-6 bg-indigo-50 rounded-2xl px-4 py-2 z-10">
              <Text className="body-md text-indigo-600">Hello!</Text>
            </View>
            <View className="absolute -top-2 -right-2 bg-violet-100 rounded-2xl px-4 py-2 z-10">
              <Text className="body-md text-violet-700">¡Hola!</Text>
            </View>
            <View className="absolute top-28 -right-6 bg-rose-50 rounded-2xl px-4 py-2 z-10">
              <Text className="body-md text-rose-500">你好!</Text>
            </View>
            <Image
              source={images.mascotWelcome}
              style={{ width: 240, height: 240 }}
              contentFit="contain"
            />
          </View>
        </View>

        <Pressable className="bg-lingua-purple rounded-full flex-row items-center justify-center py-4 mb-6">
          <Text className="body-lg font-poppins-semibold text-white mr-2">
            Get Started
          </Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
