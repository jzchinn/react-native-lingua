import type { PropsWithChildren } from "react";

// @stream-io/video-react-native-sdk pulls in @stream-io/react-native-webrtc,
// which has no web target and throws at module-load time when Metro bundles
// it for web (`requireNativeComponent is not a function`). Audio/video calls
// are a native-only feature here (see app/lesson/[id].web.tsx), so the web
// bundle gets this no-op provider instead of importing the SDK at all.
export function StreamVideoProvider({ children }: PropsWithChildren) {
  return children;
}
