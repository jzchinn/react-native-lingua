export default {
  expo: {
    name: "duolingo-clone-b",
    slug: "duolingo-clone-b",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "duolingocloneb",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      "bundleIdentifier": "com.anonymous.duolingo-clone-b",
    },
    android: {
      package: "com.anonymous.duolingocloneb",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        "android.permission.MODIFY_AUDIO_SETTINGS",
        "android.permission.BLUETOOTH_CONNECT",
      ],
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      "@clerk/expo",
      "expo-secure-store",
      "@stream-io/video-react-native-sdk",
      [
        "@config-plugins/react-native-webrtc",
        {
          cameraPermission: "$(PRODUCT_NAME) uses your camera for video-enabled lessons",
          microphonePermission: "$(PRODUCT_NAME) uses your microphone so you can speak during audio lessons",
        },
      ],
      [
        "expo-build-properties",
        { android: { minSdkVersion: 24 } },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
      posthogHost: process.env.POSTHOG_HOST || "https://us.i.posthog.com",
    },
  },
};
