import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { getUnitById } from "@/data/units";

type SessionStatus = "connecting" | "active" | "ended";

const FEEDBACK = [
  { label: "Speaking", value: "Excellent", color: "#21c16b" },
  { label: "Pronunciation", value: "Great", color: "#4d8bff" },
  { label: "Grammar", value: "Good", color: "#6c4ef5" },
];

function formatTimer(totalSeconds: number) {
  if (totalSeconds < 60) return String(totalSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function AudioLesson() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();

  const lesson = getLessonById(id);
  const unit = lesson ? getUnitById(lesson.unitId) : undefined;
  const language = lesson ? getLanguageById(lesson.languageId) : undefined;

  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("connecting");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSubtitlesOn, setIsSubtitlesOn] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const connectTimeout = setTimeout(() => setSessionStatus("active"), 1000);
    return () => clearTimeout(connectTimeout);
  }, []);

  useEffect(() => {
    if (sessionStatus !== "active") return;
    const interval = setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => clearInterval(interval);
  }, [sessionStatus]);

  useEffect(() => {
    if (sessionStatus !== "ended") return;
    const timeout = setTimeout(() => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(tabs)/learn");
      }
    }, 900);
    return () => clearTimeout(timeout);
  }, [sessionStatus, router]);

  if (!lesson || !unit || !language) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 items-center justify-center px-8">
          <Text className="h3 text-center">Lesson not found</Text>
          <Pressable onPress={() => router.back()} className="mt-4">
            <Text className="body-md font-poppins-semibold text-lingua-purple">Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const lines = [
    { text: lesson.aiTeacherPrompt.greeting, translation: lesson.aiTeacherPrompt.greetingTranslation },
    ...lesson.phrases.map((phrase) => ({ text: phrase.phrase, translation: phrase.translation })),
  ];
  const currentLine = lines[lineIndex % lines.length];

  const statusLabel =
    sessionStatus === "connecting"
      ? "Connecting…"
      : sessionStatus === "ended"
        ? "Call ended"
        : "Online";
  const statusDotColor =
    sessionStatus === "active" ? "#21c16b" : sessionStatus === "ended" ? "#ff4d4f" : "#6b7280";

  function handleEndCall() {
    if (sessionStatus === "ended") return;
    setSessionStatus("ended");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-3">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color="#0d132b" />
        </Pressable>

        <View className="flex-1 ml-1">
          <Text className="h3">AI Teacher</Text>
          <View className="flex-row items-center mt-0.5">
            <View
              className="w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: statusDotColor }}
            />
            <Text className="caption">{statusLabel}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => setIsCameraOn((prev) => !prev)}
          className="w-9 h-9 rounded-full border border-border items-center justify-center mr-2"
          accessibilityRole="button"
          accessibilityLabel={isCameraOn ? "Turn camera off" : "Turn camera on"}
        >
          <Ionicons name={isCameraOn ? "videocam" : "videocam-off"} size={18} color="#0d132b" />
        </Pressable>
        <View className="w-9 h-9 rounded-full border border-border items-center justify-center mr-2">
          <Text className="caption font-poppins-semibold text-text-primary">
            {formatTimer(elapsedSeconds)}
          </Text>
        </View>
        <Pressable
          onPress={() => setIsPinned((prev) => !prev)}
          className="w-9 h-9 rounded-full border border-border items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel={isPinned ? "Unpin lesson" : "Pin lesson"}
        >
          <Ionicons name={isPinned ? "pin" : "pin-outline"} size={18} color="#0d132b" />
        </Pressable>
      </View>

      {/* Teacher preview area */}
      <View className="flex-1">
        <LinearGradient
          colors={["#fdecdd", "#eaf5e2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          {/* Lesson context chips */}
          <View className="absolute top-4 left-4" style={{ maxWidth: "62%" }}>
            <View className="bg-black/40 rounded-full px-3 py-1.5 self-start">
              <Text className="caption text-white" numberOfLines={1}>
                {language.flagEmoji} {lesson.title}
              </Text>
            </View>
            {lesson.goals[0] && (
              <View className="bg-black/40 rounded-full px-3 py-1.5 self-start mt-1.5">
                <Text className="caption text-white" numberOfLines={1}>
                  Goal: {lesson.goals[0].description}
                </Text>
              </View>
            )}
            <View className="bg-black/40 rounded-full px-3 py-1.5 self-start mt-1.5">
              <Text className="caption text-white" numberOfLines={1}>
                Focus: {lesson.aiTeacherPrompt.focusAreas.join(" · ")}
              </Text>
            </View>
          </View>

          {/* Self preview */}
          <View
            className="absolute top-4 right-4 rounded-2xl overflow-hidden border-2 border-white"
            style={{ width: 88, height: 116 }}
          >
            {isCameraOn ? (
              user?.imageUrl ? (
                <Image
                  source={{ uri: user.imageUrl }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              ) : (
                <View className="flex-1 items-center justify-center bg-surface">
                  <Ionicons name="person" size={32} color="#6c4ef5" />
                </View>
              )
            ) : (
              <View className="flex-1 items-center justify-center bg-text-primary">
                <Ionicons name="videocam-off" size={22} color="white" />
              </View>
            )}
          </View>

          {/* Mascot teacher */}
          <View className="flex-1 items-center justify-end pb-4">
            <Image
              source={images.mascotWelcome}
              style={{ width: "58%", aspectRatio: 1237 / 1149 }}
              contentFit="contain"
            />
          </View>

          {/* Teacher response bubble */}
          <View className="px-4 mb-4">
            <View className="bg-white rounded-3xl px-4 py-3 shadow-sm">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <Text className="body-lg font-poppins-semibold">{currentLine.text}</Text>
                  {isSubtitlesOn && (
                    <Text className="body-md mt-1">{currentLine.translation}</Text>
                  )}
                </View>
                <Pressable
                  onPress={() => setLineIndex((prev) => (prev + 1) % lines.length)}
                  className="w-8 h-8 items-center justify-center"
                  accessibilityRole="button"
                  accessibilityLabel="Play next teacher line"
                >
                  <Ionicons name="volume-high" size={22} color="#6c4ef5" />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Controls */}
          <View className="flex-row px-4 pb-5">
            <View className="flex-1 items-center">
              <Pressable
                onPress={() => setIsCameraOn((prev) => !prev)}
                className={`w-14 h-14 rounded-full items-center justify-center ${
                  isCameraOn ? "bg-white" : "bg-text-primary"
                }`}
                accessibilityRole="button"
                accessibilityLabel={isCameraOn ? "Turn camera off" : "Turn camera on"}
              >
                <Ionicons
                  name={isCameraOn ? "videocam" : "videocam-off"}
                  size={22}
                  color={isCameraOn ? "#0d132b" : "white"}
                />
              </Pressable>
              <Text className="caption text-white mt-1.5">Camera</Text>
            </View>

            <View className="flex-1 items-center">
              <Pressable
                onPress={() => setIsMicOn((prev) => !prev)}
                className={`w-14 h-14 rounded-full items-center justify-center ${
                  isMicOn ? "bg-white" : "bg-text-primary"
                }`}
                accessibilityRole="button"
                accessibilityLabel={isMicOn ? "Mute microphone" : "Unmute microphone"}
              >
                <Ionicons
                  name={isMicOn ? "mic" : "mic-off"}
                  size={22}
                  color={isMicOn ? "#0d132b" : "white"}
                />
              </Pressable>
              <Text className="caption text-white mt-1.5">Mic</Text>
            </View>

            <View className="flex-1 items-center">
              <Pressable
                onPress={() => setIsSubtitlesOn((prev) => !prev)}
                className={`w-14 h-14 rounded-full items-center justify-center ${
                  isSubtitlesOn ? "bg-white" : "bg-text-primary"
                }`}
                accessibilityRole="button"
                accessibilityLabel={isSubtitlesOn ? "Hide subtitles" : "Show subtitles"}
              >
                <Ionicons
                  name={isSubtitlesOn ? "language" : "language-outline"}
                  size={22}
                  color={isSubtitlesOn ? "#0d132b" : "white"}
                />
              </Pressable>
              <Text className="caption text-white mt-1.5">Subtitles</Text>
            </View>

            <View className="flex-1 items-center">
              <Pressable
                onPress={handleEndCall}
                className="w-14 h-14 rounded-full items-center justify-center bg-error"
                accessibilityRole="button"
                accessibilityLabel="End call"
              >
                <Ionicons
                  name="call"
                  size={22}
                  color="white"
                  style={{ transform: [{ rotate: "135deg" }] }}
                />
              </Pressable>
              <Text className="caption text-white mt-1.5">End Call</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Lesson feedback */}
      <View className="bg-white px-4 py-4 border-t border-border">
        <View className="flex-row">
          {FEEDBACK.map((item, index) => (
            <View
              key={item.label}
              className={`flex-1 items-center ${index > 0 ? "border-l border-border" : ""}`}
            >
              <Text className="h4">{item.label}</Text>
              <Text
                className="body-md font-poppins-semibold mt-1"
                style={{ color: item.color }}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
