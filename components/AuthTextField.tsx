import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import type { KeyboardTypeOptions } from "react-native";
import { Pressable, Text, TextInput, View } from "react-native";

type AuthTextFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
};

export function AuthTextField({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  isPassword = false,
}: AuthTextFieldProps) {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View className="border border-border rounded-2xl px-4 py-2 flex-row items-center">
      <View className="flex-1">
        <Text className="caption">{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize="none"
          className="body-lg text-text-primary py-1"
        />
      </View>
      {isPassword && (
        <Pressable
          onPress={() => setIsSecure((prev) => !prev)}
          accessibilityRole="button"
          accessibilityLabel={isSecure ? "Show password" : "Hide password"}
        >
          <Ionicons
            name={isSecure ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#6b7280"
          />
        </Pressable>
      )}
    </View>
  );
}
