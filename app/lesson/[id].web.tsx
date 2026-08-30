import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getLessonById } from "@/data/lessons";

// @stream-io/video-react-native-sdk has no web target (see
// components/StreamVideoProvider.web.tsx). This audio lesson call is a
// native-only feature, so web gets a lightweight explainer instead of the
// real call screen in app/lesson/[id].tsx.
export default function AudioLessonWeb() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center px-4 pt-2 pb-3">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color="#0d132b" />
        </Pressable>
      </View>
      <View className="flex-1 items-center justify-center px-8">
        <Ionicons name="phone-portrait-outline" size={40} color="#6c4ef5" />
        <Text className="h3 text-center mt-3">
          {lesson ? lesson.title : "Audio lessons"}
        </Text>
        <Text className="body-md text-center text-text-secondary mt-1">
          Live audio lessons with your AI teacher are available in the Duolingo Clone
          mobile app.
        </Text>
        <Pressable onPress={() => router.back()} className="mt-5">
          <Text className="body-md font-poppins-semibold text-lingua-purple">Go back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
