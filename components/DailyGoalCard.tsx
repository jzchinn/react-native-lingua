import { Image } from "expo-image";
import { Text, View } from "react-native";

import { images } from "@/constants/images";

type DailyGoalCardProps = {
  xp: number;
  goalXp: number;
};

export function DailyGoalCard({ xp, goalXp }: DailyGoalCardProps) {
  const progress = Math.min(xp / goalXp, 1);

  return (
    <View className="flex-row items-center justify-between bg-peach rounded-3xl pl-5 pr-2 py-4">
      <View className="flex-1 pr-4">
        <Text className="body-md">Daily goal</Text>
        <View className="flex-row items-baseline mt-1">
          <Text className="h1">{xp}</Text>
          <Text className="h4 text-text-secondary"> / {goalXp} XP</Text>
        </View>
        <View className="h-2 rounded-full bg-white mt-3 overflow-hidden">
          <View className="h-2 rounded-full bg-streak" style={{ width: `${progress * 100}%` }} />
        </View>
      </View>

      <Image source={images.treasure} style={{ width: 88, height: 88 }} contentFit="contain" />
    </View>
  );
}
