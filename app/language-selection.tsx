import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageCard } from "@/components/LanguageCard";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import type { LanguageId } from "@/types/learning";

export default function LanguageSelection() {
  const router = useRouter();
  const posthog = usePostHog();
  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<LanguageId | null>(null);

  const popularLanguages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return languages.filter(
      (language) =>
        language.popular && language.name.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  function handleConfirm() {
    if (!selectedId) return;
    posthog.capture("language_confirmed", { language_id: selectedId });
    setSelectedLanguage(selectedId);
    router.replace("/");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-row items-center px-4 pt-2 pb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color="#0d132b" />
        </Pressable>
        <Text className="h3 flex-1 text-center mr-9">Choose a language</Text>
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center bg-surface rounded-full px-4 py-3 mb-6">
          <Ionicons name="search" size={18} color="#6b7280" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages"
            placeholderTextColor="#6b7280"
            className="body-lg text-text-primary flex-1 ml-2"
          />
        </View>

        <Text className="h4 mb-3">Popular</Text>

        {popularLanguages.map((language) => (
          <LanguageCard
            key={language.id}
            language={language}
            selected={selectedId === language.id}
            onPress={() => {
              posthog.capture("language_selected", { language_id: language.id, language_name: language.name });
              setSelectedId(language.id);
            }}
          />
        ))}
      </ScrollView>

      <View className="px-6 pt-2 pb-4">
        <Pressable
          className={`rounded-full items-center justify-center py-4 ${
            selectedId ? "bg-lingua-purple" : "bg-surface"
          }`}
          onPress={handleConfirm}
          disabled={!selectedId}
        >
          <Text
            className={`body-lg font-poppins-semibold ${
              selectedId ? "text-white" : "text-text-secondary"
            }`}
          >
            Confirm
          </Text>
        </Pressable>

        <Image
          source={images.earth}
          style={{ width: "100%", height: 180, marginTop: 16 }}
          contentFit="contain"
        />
      </View>
    </SafeAreaView>
  );
}
