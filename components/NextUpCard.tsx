import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import { images } from "@/constants/images";

type NextUpCardProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function NextUpCard({ title, subtitle, onPress }: NextUpCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between bg-mint rounded-3xl px-5 py-4"
    >
      <View className="flex-1 pr-3">
        <Text className="body-md">Next up</Text>
        <Text className="h4 mt-1">{title}</Text>
        <Text className="body-sm mt-0.5">{subtitle}</Text>
      </View>

      <View className="flex-row items-center">
        <Image
          source={images.aiTeacherAvatar}
          style={{ width: 56, height: 56, borderRadius: 28 }}
          contentFit="cover"
        />
        <View className="w-11 h-11 rounded-full bg-success items-center justify-center ml-2">
          <Ionicons name="videocam" size={20} color="white" />
        </View>
      </View>
    </Pressable>
  );
}
