# Framework rules

Follow these when integrating PostHog into this framework.

- A missing PostHog configuration must never break the app in production — read keys optionally (never a required setting), guard init and capture behind their presence, and keep production build and boot working with no PostHog environment set. Development/debug builds are the exception: fail loudly there, using the language's idiomatic error (a thrown `Error` in JS/TS, not `console.warn`), with the message "<VAR> variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once <VAR> is configured" (substituting the actual variable name). `src/config/posthog.ts` in this repo implements this contract — read configuration optionally, guard `disabled` on it, and throw (not warn) when `__DEV__` and the token is missing.
