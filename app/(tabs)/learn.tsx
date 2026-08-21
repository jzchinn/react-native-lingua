import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { LessonListItem } from "@/components/LessonListItem";
import { getCurrentLessonForLanguage, getLessonsForUnit } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";

type LessonsTab = "lessons" | "practice";

export default function Learn() {
  const router = useRouter();
  const posthog = usePostHog();
  const [activeTab, setActiveTab] = useState<LessonsTab>("lessons");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const languageHasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (!languageHasHydrated || !selectedLanguageId) {
    return null;
  }

  const currentLesson = getCurrentLessonForLanguage(selectedLanguageId);
  const currentUnit = currentLesson ? getUnitById(currentLesson.unitId) : undefined;

  if (!currentLesson || !currentUnit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="h3 text-center">No lessons yet</Text>
          <Text className="body-md text-center mt-2">
            Check back soon for lessons in this language.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const unitId = currentUnit.id;
  const unitLessons = getLessonsForUnit(unitId);
  const completedCount = unitLessons.filter((lesson) => lesson.status === "completed").length;
  const heroImage = images.unitHero[unitId];

  function handleLessonPress(lessonId: string) {
    posthog.capture("lesson_opened", {
      lesson_id: lessonId,
      unit_id: unitId,
      language_id: selectedLanguageId,
    });
    router.push(`/lesson/${lessonId}`);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/(tabs)/home"))}
            className="w-9 h-9 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={24} color="#0d132b" />
          </Pressable>

          <View className="flex-1 ml-1">
            <Text className="h3">{currentUnit.title}</Text>
            <Text className="body-sm mt-0.5">
              Unit {currentUnit.order} • {completedCount}/{unitLessons.length} lessons
            </Text>
          </View>

          <Pressable
            onPress={() => setIsBookmarked((prev) => !prev)}
            className="w-9 h-9 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Bookmark unit"
          >
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={22}
              color="#6c4ef5"
            />
          </Pressable>
        </View>

        {/* Hero image */}
        <View className="px-4">
          <Image
            source={heroImage}
            style={{ width: "100%", height: 200, borderRadius: 24 }}
            contentFit="cover"
          />
        </View>

        {/* Tabs */}
        <View className="flex-row bg-white rounded-2xl mx-4 mt-4 p-1 shadow-sm">
          <Pressable
            onPress={() => setActiveTab("lessons")}
            className={`flex-1 items-center py-2.5 rounded-xl ${
              activeTab === "lessons" ? "border-b-2 border-lingua-purple" : ""
            }`}
          >
            <Text
              className={`body-md font-poppins-semibold ${
                activeTab === "lessons" ? "text-lingua-purple" : "text-text-secondary"
              }`}
            >
              Lessons
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("practice")}
            className={`flex-1 items-center py-2.5 rounded-xl ${
              activeTab === "practice" ? "border-b-2 border-lingua-purple" : ""
            }`}
          >
            <Text
              className={`body-md font-poppins-semibold ${
                activeTab === "practice" ? "text-lingua-purple" : "text-text-secondary"
              }`}
            >
              Practice
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <View className="px-4 pt-4 pb-8">
          {activeTab === "lessons" ? (
            unitLessons.map((lesson) => (
              <LessonListItem
                key={lesson.id}
                order={lesson.order}
                title={lesson.title}
                status={lesson.status}
                xpReward={lesson.xpReward}
                onPress={() => handleLessonPress(lesson.id)}
              />
            ))
          ) : (
            <View className="items-center bg-surface rounded-3xl px-6 py-10">
              <Ionicons name="barbell-outline" size={32} color="#6b7280" />
              <Text className="h4 mt-3 text-center">Practice mode coming soon</Text>
              <Text className="body-sm text-center mt-1">
                Review vocabulary and phrases from completed lessons here.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
