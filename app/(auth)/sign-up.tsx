import { useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthMascot } from "@/components/AuthMascot";
import { AuthTextField } from "@/components/AuthTextField";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { VerificationModal } from "@/components/VerificationModal";

export default function SignUp() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  async function handleSignUp() {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
    });
    if (error) return;

    const { error: codeError } = await signUp.verifications.sendEmailCode();
    if (!codeError) setShowVerification(true);
  }

  async function handleSubmitCode(code: string) {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      return errors.fields.code?.message ?? "Invalid code. Please try again.";
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          router.replace(decorateUrl("/") as Href);
        },
      });
      setShowVerification(false);
      return null;
    }

    return "Something went wrong. Please try again.";
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6"
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            onPress={() => router.back()}
            className="mt-2 self-start py-2"
          >
            <Ionicons name="chevron-back" size={24} color="#0d132b" />
          </Pressable>

          <Text className="h1 mt-4">Create your account</Text>
          <Text className="body-lg text-text-secondary mt-2">
            Start your language journey today ✨
          </Text>

          <AuthMascot />

          <View className="gap-4">
            <AuthTextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.fields.emailAddress?.message}
            />
            <AuthTextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              isPassword
              error={errors.fields.password?.message}
            />
          </View>

          <Pressable
            className="bg-lingua-purple rounded-full items-center justify-center py-4 mt-6"
            onPress={handleSignUp}
            disabled={fetchStatus === "fetching"}
          >
            <Text className="body-lg font-poppins-semibold text-white">
              Sign Up
            </Text>
          </Pressable>

          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-border" />
            <Text className="body-sm mx-3">or continue with</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          <SocialAuthButtons />

          <View className="flex-1" />

          <Pressable
            className="flex-row items-center justify-center mb-6 mt-6"
            onPress={() => router.replace("/(auth)/sign-in")}
          >
            <Text className="body-md text-text-secondary">
              Already have an account?{" "}
            </Text>
            <Text className="body-md font-poppins-semibold text-lingua-purple">
              Log in
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <View nativeID="clerk-captcha" />

      <VerificationModal
        visible={showVerification}
        email={email}
        onClose={() => setShowVerification(false)}
        onSubmitCode={handleSubmitCode}
        onResend={() => signUp.verifications.sendEmailCode()}
      />
    </SafeAreaView>
  );
}
