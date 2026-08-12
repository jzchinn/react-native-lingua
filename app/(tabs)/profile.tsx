import { useClerk } from "@clerk/expo";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { getLanguageById } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";

export default function Profile() {
  const { signOut } = useClerk();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);
  const selectedLanguage = selectedLanguageId ? getLanguageById(selectedLanguageId) : undefined;

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      <Text className="h2">Profile</Text>
      {selectedLanguage && (
        <Text className="body-lg text-text-secondary mt-2">
          {selectedLanguage.flagEmoji} Learning {selectedLanguage.name}
        </Text>
      )}

      <Link href="/language-selection" asChild>
        <Pressable className="bg-lingua-purple rounded-full items-center justify-center py-4 px-8 mt-6">
          <Text className="body-lg font-poppins-semibold text-white">
            Choose a language
          </Text>
        </Pressable>
      </Link>

      <Pressable
        className="bg-lingua-purple rounded-full items-center justify-center py-4 px-8 mt-6"
        onPress={() => {
          signOut().catch((err) => console.error("Sign out failed:", err));
        }}
      >
        <Text className="body-lg font-poppins-semibold text-white">Sign out</Text>
      </Pressable>

      <Pressable
        className="bg-lingua-purple rounded-full items-center justify-center py-4 px-8 mt-6"
        onPress={clearSelectedLanguage}
      >
        <Text className="body-lg font-poppins-semibold text-white">
          Clear async storage
        </Text>
      </Pressable>
    </View>
  );
}
