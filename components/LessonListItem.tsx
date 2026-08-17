import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import { images } from "@/constants/images";
import type { LessonStatus } from "@/types/learning";

type LessonListItemProps = {
  order: number;
  title: string;
  status: LessonStatus;
  xpReward: number;
  onPress: () => void;
};

export function LessonListItem({ order, title, status, xpReward, onPress }: LessonListItemProps) {
  const isInProgress = status === "in_progress";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center rounded-2xl px-5 py-4 mb-3 border ${
        isInProgress ? "border-lingua-purple bg-surface" : "border-border bg-white"
      }`}
    >
      <View className="flex-1 pr-3">
        <Text className={`caption ${isInProgress ? "text-lingua-purple" : ""}`}>
          Lesson {order}
        </Text>
        <Text className={`h4 mt-0.5 ${isInProgress ? "text-lingua-purple" : ""}`}>{title}</Text>

        {isInProgress && <Text className="body-sm text-lingua-purple mt-0.5">In progress</Text>}
        {status === "locked" && <Text className="caption mt-0.5">{xpReward} XP</Text>}
      </View>

      {status === "completed" && (
        <View className="w-8 h-8 rounded-full bg-success items-center justify-center">
          <Ionicons name="checkmark" size={18} color="white" />
        </View>
      )}
      {status === "in_progress" && (
        <Image source={images.palace} style={{ width: 44, height: 44 }} contentFit="contain" />
      )}
      {status === "locked" && <Ionicons name="lock-closed" size={20} color="#6b7280" />}
    </Pressable>
  );
}
