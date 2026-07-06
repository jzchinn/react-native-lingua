import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";

import { images } from "@/constants/images";

export function AuthMascot() {
  return (
    <View className="items-center justify-center my-6">
      <View className="absolute top-2 left-6 z-10">
        <Ionicons name="sparkles" size={18} color="#ffc800" />
      </View>
      <View className="absolute top-4 right-8 z-10">
        <Ionicons name="sparkles" size={16} color="#4d8bff" />
      </View>
      <View className="absolute bottom-6 right-4 z-10">
        <Ionicons name="sparkles" size={14} color="#6c4ef5" />
      </View>
      <Image
        source={images.mascotAuth}
        style={{ width: 200, height: 160 }}
        contentFit="contain"
      />
    </View>
  );
}
