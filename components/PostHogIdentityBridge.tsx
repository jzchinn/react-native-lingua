import { useAuth, useUser } from "@clerk/expo";
import { usePostHog } from "posthog-react-native";
import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";

// Sits below ClerkProvider so it can identify with the canonical Clerk user
// ID once auth actually completes, instead of each auth screen guessing an
// identity from in-flight sign-in/sign-up state.
export function PostHogIdentityBridge({ children }: PropsWithChildren) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const posthog = usePostHog();
  const wasSignedIn = useRef(false);

  useEffect(() => {
    if (isSignedIn && user) {
      posthog.identify(user.id);
      wasSignedIn.current = true;
    } else if (isSignedIn === false && wasSignedIn.current) {
      posthog.reset();
      wasSignedIn.current = false;
    }
  }, [isSignedIn, user, posthog]);

  return children;
}
