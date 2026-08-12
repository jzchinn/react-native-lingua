import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center rounded-2xl border px-4 py-3 mb-3 ${
        selected ? "border-lingua-purple bg-indigo-50" : "border-border bg-white"
      }`}
    >
      <View className="w-11 h-11 rounded-full bg-surface items-center justify-center">
        <Text className="text-2xl">{language.flagEmoji}</Text>
      </View>
      <View className="flex-1 ml-3">
        <Text className="h4">{language.name}</Text>
        <Text className="caption mt-0.5">{language.learners}</Text>
      </View>
      {selected ? (
        <View className="w-7 h-7 rounded-full bg-lingua-purple items-center justify-center">
          <Ionicons name="checkmark" size={16} color="white" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      )}
    </Pressable>
  );
}
