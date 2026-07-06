import { useSignIn } from "@clerk/expo";
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

export default function SignIn() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  async function finalizeAndGoHome() {
    await signIn.finalize({
      navigate: ({ decorateUrl }) => {
        router.replace(decorateUrl("/") as Href);
      },
    });
  }

  async function handleSignIn() {
    const { error } = await signIn.password({
      identifier: email,
      password,
    });
    if (error) return;

    if (signIn.status === "complete") {
      await finalizeAndGoHome();
    } else if (signIn.status === "needs_second_factor") {
      const { error: codeError } = await signIn.mfa.sendEmailCode();
      if (!codeError) setShowVerification(true);
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === "email_code",
      );
      if (emailCodeFactor) {
        const { error: codeError } = await signIn.mfa.sendEmailCode();
        if (!codeError) setShowVerification(true);
      }
    }
  }

  async function handleSubmitCode(code: string) {
    const { error } = await signIn.mfa.verifyEmailCode({ code });
    if (error) {
      return errors.fields.code?.message ?? "Invalid code. Please try again.";
    }

    if (signIn.status === "complete") {
      await finalizeAndGoHome();
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
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={24} color="#0d132b" />
          </Pressable>

          <Text className="h1 mt-4">Welcome back</Text>
          <Text className="body-lg text-text-secondary mt-2">
            Continue your language journey ✨
          </Text>

          <AuthMascot />

          <View className="gap-4">
            <AuthTextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.fields.identifier?.message}
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
            onPress={handleSignIn}
            disabled={fetchStatus === "fetching"}
          >
            <Text className="body-lg font-poppins-semibold text-white">
              Sign In
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
            onPress={() => router.replace("/(auth)/sign-up")}
          >
            <Text className="body-md text-text-secondary">
              Don&apos;t have an account?{" "}
            </Text>
            <Text className="body-md font-poppins-semibold text-lingua-purple">
              Sign up
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={showVerification}
        email={email}
        onClose={() => setShowVerification(false)}
        onSubmitCode={handleSubmitCode}
        onResend={() => signIn.mfa.sendEmailCode()}
      />
    </SafeAreaView>
  );
}
