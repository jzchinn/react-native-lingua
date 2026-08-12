import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const CIRCLE_SIZE = 48;

type TabName = "home" | "learn" | "ai-teacher" | "chat" | "profile";

const TAB_CONFIG: Record<
  TabName,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    activeIcon: keyof typeof Ionicons.glyphMap;
  }
> = {
  home: { label: "Home", icon: "home-outline", activeIcon: "home" },
  learn: { label: "Learn", icon: "book-outline", activeIcon: "book" },
  "ai-teacher": {
    label: "AI Teacher",
    icon: "chatbubble-ellipses-outline",
    activeIcon: "chatbubble-ellipses",
  },
  chat: { label: "Chat", icon: "chatbubbles-outline", activeIcon: "chatbubbles" },
  profile: { label: "Profile", icon: "person-outline", activeIcon: "person" },
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [tabCenters, setTabCenters] = useState<number[]>(() => state.routes.map(() => 0));
  const circleX = useSharedValue(0);

  function handleTabLayout(index: number, event: LayoutChangeEvent) {
    const { x, width } = event.nativeEvent.layout;
    const center = x + width / 2;
    setTabCenters((prev) => {
      if (prev[index] === center) return prev;
      const next = [...prev];
      next[index] = center;
      return next;
    });
  }

  useEffect(() => {
    const center = tabCenters[state.index];
    if (center) {
      circleX.value = withSpring(center - CIRCLE_SIZE / 2, {
        damping: 24,
        stiffness: 340,
        mass: 0.5,
        overshootClamping: true,
      });
    }
  }, [state.index, tabCenters, circleX]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.value }],
  }));

  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#ffffff" }}>
      <View className="flex-row border-t border-border bg-white px-2 pt-2 pb-1">
        <Animated.View
          pointerEvents="none"
          className="absolute bg-lingua-purple rounded-full"
          style={[
            {
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              top: "50%",
              marginTop: -CIRCLE_SIZE / 2,
            },
            circleStyle,
          ]}
        />

        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[route.name as TabName];
          if (!config) return null;

          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          function handlePress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          return (
            <Pressable
              key={route.key}
              onPress={handlePress}
              onLayout={(event) => handleTabLayout(index, event)}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? config.label}
              className="flex-1 items-center justify-center py-2"
            >
              <Ionicons
                name={isFocused ? config.activeIcon : config.icon}
                size={22}
                color={isFocused ? "#ffffff" : "#6b7280"}
              />
              <Text
                className="caption mt-1"
                style={{ opacity: isFocused ? 0 : 1 }}
              >
                {config.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
