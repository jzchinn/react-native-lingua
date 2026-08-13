import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContinueLearningCard } from "@/components/ContinueLearningCard";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { NextUpCard } from "@/components/NextUpCard";
import { TodayPlanItem } from "@/components/TodayPlanItem";
import { getLanguageById } from "@/data/languages";
import { getCurrentLessonForLanguage } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import type { LanguageId } from "@/types/learning";

const GREETINGS: Record<LanguageId, string> = {
  es: "Hola",
  fr: "Salut",
  ja: "こんにちは",
  ko: "안녕",
  de: "Hallo",
  zh: "你好",
};

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const language = selectedLanguageId ? getLanguageById(selectedLanguageId) : undefined;

  const xp = useProgressStore((state) => state.xp);
  const dailyGoalXp = useProgressStore((state) => state.dailyGoalXp);
  const streak = useProgressStore((state) => state.streak);
  const completedPlanItemIds = useProgressStore((state) => state.completedPlanItemIds);
  const togglePlanItem = useProgressStore((state) => state.togglePlanItem);
  const progressHasHydrated = useProgressStore((state) => state.hasHydrated);

  if (!progressHasHydrated || !language) {
    return null;
  }

  const currentLesson = getCurrentLessonForLanguage(language.id);
  const currentUnit = currentLesson ? getUnitById(currentLesson.unitId) : undefined;

  const planItems = currentLesson
    ? [
        {
          id: `${currentLesson.id}-lesson`,
          icon: "book" as const,
          iconBackgroundClassName: "bg-lingua-purple",
          title: "Lesson",
          subtitle: currentLesson.title,
        },
        {
          id: `${currentLesson.id}-conversation`,
          icon: "headset" as const,
          iconBackgroundClassName: "bg-lingua-purple",
          title: "AI Conversation",
          subtitle: `Practice ${currentLesson.aiTeacherPrompt.focusAreas[0]}`,
        },
        {
          id: `${currentLesson.id}-words`,
          icon: "chatbubble-ellipses" as const,
          iconBackgroundClassName: "bg-error",
          title: "New words",
          subtitle: `${currentLesson.vocabulary.length} words`,
        },
      ]
    : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between pt-3 pb-4">
          <Pressable
            onPress={() => router.push("/language-selection")}
            className="flex-row items-center flex-1"
          >
            <View className="w-11 h-11 rounded-full bg-surface items-center justify-center">
              <Text className="text-2xl">{language.flagEmoji}</Text>
            </View>
            <Text className="h4 ml-3">
              {GREETINGS[language.id]}, {user?.firstName ?? "there"}! 👋
            </Text>
          </Pressable>

          <View className="flex-row items-center">
            <Ionicons name="flame" size={20} color="#ff8a00" />
            <Text className="h4 ml-1 mr-4">{streak}</Text>
            <Ionicons name="notifications-outline" size={22} color="#0d132b" />
          </View>
        </View>

        {/* Daily goal */}
        <DailyGoalCard xp={xp} goalXp={dailyGoalXp} />

        {/* Continue learning */}
        {currentUnit && (
          <View className="mt-4">
            <ContinueLearningCard
              languageName={language.name}
              level={currentUnit.level}
              unitOrder={currentUnit.order}
              onPress={() => router.push("/learn")}
            />
          </View>
        )}

        {/* Today's plan */}
        <View className="flex-row items-center justify-between mt-6 mb-1">
          <Text className="h4">Today&apos;s plan</Text>
          <Pressable onPress={() => router.push("/learn")}>
            <Text className="body-md font-poppins-semibold text-lingua-purple">View all</Text>
          </Pressable>
        </View>

        <View>
          {planItems.map((item) => (
            <TodayPlanItem
              key={item.id}
              icon={item.icon}
              iconBackgroundClassName={item.iconBackgroundClassName}
              title={item.title}
              subtitle={item.subtitle}
              completed={completedPlanItemIds.includes(item.id)}
              onPress={() => togglePlanItem(item.id)}
            />
          ))}
        </View>

        {/* Next up */}
        <View className="mt-4">
          <NextUpCard
            title="AI Video Call"
            subtitle="Practice speaking"
            onPress={() => router.push("/ai-teacher")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
