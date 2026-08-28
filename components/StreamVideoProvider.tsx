import { useAuth, useUser } from "@clerk/expo";
import { useEffect, useState } from "react";
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

// Sits below ClerkProvider so it can connect the Stream Video client with
// the canonical Clerk user once auth actually completes, and disconnect it
// on sign-out. Renders `children` un-Streamed while there is no session -
// only the lesson call screen needs `useStreamVideoClient()` to resolve.
export function StreamVideoProvider({ children }: PropsWithChildren) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const insets = useSafeAreaInsets();
  const [client, setClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !clerkUser) {
      setClient(undefined);
      return;
    }

    const user: User = {
      id: clerkUser.id,
      name: clerkUser.fullName ?? clerkUser.username ?? clerkUser.id,
      image: clerkUser.imageUrl,
    };

    let cancelled = false;
    let instance: StreamVideoClient | undefined;

    (async () => {
      const session = await fetchStreamSession(getToken);
      if (cancelled) return;
      instance = StreamVideoClient.getOrCreateInstance({
        apiKey: session.apiKey,
        user,
        tokenProvider: async () => (await fetchStreamSession(getToken)).token,
      });
      setClient(instance);
    })().catch((err) => console.error("Failed to connect Stream Video", err));

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
    // on it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, clerkUser?.id]);

  if (!client) return children;

  const theme: DeepPartial<Theme> = {
    variants: {
      insets: { top: insets.top, right: insets.right, bottom: insets.bottom, left: insets.left },
    },
  };

  return (
    <StreamVideo client={client} style={theme}>
      {children}
    </StreamVideo>
  );
}
