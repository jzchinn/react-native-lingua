import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onSubmitCode: (code: string) => Promise<string | null>;
  onResend: () => void;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  onSubmitCode,
  onResend,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) return;
    setCode("");
    setError(null);
    const timeout = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timeout);
  }, [visible]);

  useEffect(() => {
    if (code.length !== CODE_LENGTH) return;

    let cancelled = false;
    setIsVerifying(true);
    setError(null);

    onSubmitCode(code).then((submitError) => {
      if (cancelled) return;
      setIsVerifying(false);
      if (submitError) {
        setError(submitError);
        setCode("");
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(13, 19, 43, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="bg-white rounded-t-3xl px-6 pt-4 pb-10">
            <Pressable
              onPress={onClose}
              className="absolute top-4 right-4 z-10"
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text className="body-md text-text-secondary">✕</Text>
            </Pressable>
            <View className="items-center">
              <View className="w-10 h-1.5 rounded-full bg-border" />
            </View>

            <Text className="h2 text-center mt-6">Check your email</Text>
            <Text className="body-md text-text-secondary text-center mt-2">
              We sent a 6-digit code to{"\n"}
              <Text className="font-poppins-medium text-text-primary">
                {email || "your email"}
              </Text>
            </Text>

            <Pressable
              className="mt-8"
              onPress={() => inputRef.current?.focus()}
            >
              <View className="flex-row justify-center gap-2">
                {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                  <View
                    key={index}
                    className={`w-12 h-14 rounded-2xl border items-center justify-center ${
                      error
                        ? "border-red-500"
                        : index === code.length
                          ? "border-lingua-purple"
                          : "border-border"
                    }`}
                  >
                    <Text className="h3">{code[index] ?? ""}</Text>
                  </View>
                ))}
              </View>
            </Pressable>

            {error && (
              <Text className="body-sm text-red-500 text-center mt-4">
                {error}
              </Text>
            )}

            <Pressable
              className="mt-6"
              onPress={() => {
                setError(null);
                setCode("");
                onResend();
              }}
              disabled={isVerifying}
            >
              <Text className="body-md font-poppins-semibold text-lingua-purple text-center">
                Didn&apos;t get a code? Resend
              </Text>
            </Pressable>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={(text) =>
                setCode(text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH))
              }
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              editable={!isVerifying}
              style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
