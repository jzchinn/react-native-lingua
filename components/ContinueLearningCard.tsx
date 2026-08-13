import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import { images } from "@/constants/images";
import type { CefrLevel } from "@/types/learning";

type ContinueLearningCardProps = {
  languageName: string;
  level: CefrLevel;
  unitOrder: number;
  onPress: () => void;
};

export function ContinueLearningCard({
  languageName,
  level,
  unitOrder,
  onPress,
}: ContinueLearningCardProps) {
  return (
    <View className="rounded-3xl overflow-hidden">
      <LinearGradient
        colors={["#6c4ef5", "#4d8bff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="px-5 pt-5 pb-6">
          <Text className="body-md text-white">Continue learning</Text>
          <Text className="h1 text-white mt-1">{languageName}</Text>
          <Text className="body-sm text-white mt-1">
            {level} • Unit {unitOrder}
          </Text>

          <Pressable
            onPress={onPress}
            className="bg-white rounded-full self-start px-6 py-2.5 mt-4"
          >
            <Text className="body-md font-poppins-semibold text-lingua-purple">Continue</Text>
          </Pressable>
        </View>

        <Image
          source={images.palace}
          style={{ position: "absolute", right: -16, bottom: -8, width: 150, height: 150 }}
          contentFit="contain"
          pointerEvents="none"
        />
      </LinearGradient>
    </View>
  );
}
