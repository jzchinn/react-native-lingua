import { useAuth, useUser } from "@clerk/expo";
import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StreamVideo,
  StreamVideoClient,
  type DeepPartial,
  type Theme,
  type User,
} from "@stream-io/video-react-native-sdk";

import { fetchStreamSession } from "@/lib/stream-client";

export type StreamVideoConnectionStatus = "idle" | "connecting" | "connected" | "error";

interface StreamVideoConnection {
  status: StreamVideoConnectionStatus;
  // Re-attempts the session fetch + client connect. Safe to call any time -
  // a no-op default is used outside the provider.
  retry: () => void;
}

const StreamVideoConnectionContext = createContext<StreamVideoConnection>({
  status: "idle",
  retry: () => {},
});

// Lets screens outside <StreamVideo> (i.e. before the client has connected)
// still observe connection status and trigger a retry - see app/lesson/[id].tsx.
export function useStreamVideoConnection() {
  return useContext(StreamVideoConnectionContext);
}

// Sits below ClerkProvider so it can connect the Stream Video client with
// the canonical Clerk user once auth actually completes, and disconnect it
// on sign-out. Renders `children` un-Streamed while there is no session -
// only the lesson call screen needs `useStreamVideoClient()` to resolve.
export function StreamVideoProvider({ children }: PropsWithChildren) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const insets = useSafeAreaInsets();
  const [client, setClient] = useState<StreamVideoClient>();
  const [status, setStatus] = useState<StreamVideoConnectionStatus>("idle");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !clerkUser) {
      setClient(undefined);
      setStatus("idle");
      return;
    }

    const user: User = {
      id: clerkUser.id,
      name: clerkUser.fullName ?? clerkUser.username ?? clerkUser.id,
      image: clerkUser.imageUrl,
    };

    let cancelled = false;
    let instance: StreamVideoClient | undefined;
    setStatus("connecting");

    (async () => {
      const session = await fetchStreamSession(getToken);
      if (cancelled) return;
      instance = StreamVideoClient.getOrCreateInstance({
        apiKey: session.apiKey,
        user,
        tokenProvider: async () => (await fetchStreamSession(getToken)).token,
      });
      setClient(instance);
      setStatus("connected");
    })().catch((err) => {
      console.error("Failed to connect Stream Video", err);
      if (!cancelled) setStatus("error");
    });

    return () => {
      cancelled = true;
      instance?.disconnectUser().catch((err) => console.error(err));
      setClient(undefined);
    };
    // `getToken` and the `clerkUser` object are not referentially stable
    // across renders in @clerk/expo - listing them here reconnected the
    // Stream WebSocket on every render (disconnect in cleanup, then
    // immediately reconnect), which Stream's backend started rate-limiting.
    // `clerkUser?.id` is the only part of the user that should trigger a
    // reconnect; `getToken` always fetches the live token regardless of
    // when this closure was created, so it's safe to call without depending
    // on it. `retryCount` only exists to let `retry()` force a re-run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, clerkUser?.id, retryCount]);

  const connection: StreamVideoConnection = {
    status,
    retry: () => setRetryCount((count) => count + 1),
  };

  if (!client) {
    return (
      <StreamVideoConnectionContext.Provider value={connection}>
        {children}
      </StreamVideoConnectionContext.Provider>
    );
  }

  const theme: DeepPartial<Theme> = {
    variants: {
      insets: { top: insets.top, right: insets.right, bottom: insets.bottom, left: insets.left },
    },
  };

  return (
    <StreamVideoConnectionContext.Provider value={connection}>
      <StreamVideo client={client} style={theme}>
        {children}
      </StreamVideo>
    </StreamVideoConnectionContext.Provider>
  );
}
