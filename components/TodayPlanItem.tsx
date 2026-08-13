import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type TodayPlanItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBackgroundClassName: string;
  title: string;
  subtitle: string;
  completed: boolean;
  onPress: () => void;
};

export function TodayPlanItem({
  icon,
  iconBackgroundClassName,
  title,
  subtitle,
  completed,
  onPress,
}: TodayPlanItemProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center py-3">
      <View
        className={`w-11 h-11 rounded-2xl items-center justify-center ${iconBackgroundClassName}`}
      >
        <Ionicons name={icon} size={20} color="white" />
      </View>

      <View className="flex-1 ml-3">
        <Text className="h4">{title}</Text>
        <Text className="body-sm mt-0.5">{subtitle}</Text>
      </View>

      {completed ? (
        <View className="w-8 h-8 rounded-full bg-lingua-purple items-center justify-center">
          <Ionicons name="checkmark" size={18} color="white" />
        </View>
      ) : (
        <View className="w-8 h-8 rounded-full border-2 border-border" />
      )}
    </Pressable>
  );
}
