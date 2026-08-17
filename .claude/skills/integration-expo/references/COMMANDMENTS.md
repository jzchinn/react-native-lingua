# Framework rules

Follow these when integrating PostHog into this framework.

- A missing PostHog configuration must never break the app — read keys optionally (never a required setting), guard init and capture behind their presence, and keep build and boot working with no PostHog environment set — but never silently: in development or debug builds fail loudly, using the language's idiomatic error, with the message "<VAR> variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once <VAR> is configured" (substituting the actual variable name); production stays a no-op
- posthog-react-native is the React Native SDK package name (same as bare RN)
- Use expo-constants with app.config.js extras for POSTHOG_PROJECT_TOKEN and POSTHOG_HOST in Expo projects. `react-native-config` (loading POSTHOG_PROJECT_TOKEN/POSTHOG_HOST from .env at build time) is scoped to bare React Native only — never use it in an Expo-managed project; use expo-constants there instead
- Access config via `Constants.expoConfig?.extra?.posthogProjectToken` in your posthog.ts config file (Expo projects)
- For expo-router, wrap PostHogProvider in app/_layout.tsx and manually track screens with `posthog.screen(pathname, params)` in a useEffect — expo-router owns its own navigation container internally, so do NOT add an explicit `NavigationContainer` around the `Stack` for this
- posthog-react-native is the React Native SDK package name
- react-native-svg is a required peer dependency of posthog-react-native (used by the surveys feature) and must be installed alongside it
- Place PostHogProvider INSIDE NavigationContainer for React Navigation v7 compatibility — this only applies to a standalone React Navigation app that explicitly owns a `NavigationContainer` (see `react-native.md`'s "With `@react-navigation/native`" section); it does not apply to expo-router apps, which never render their own `NavigationContainer`
- Remember that source code is available in the node_modules directory
- Check package.json for type checking or build scripts to validate changes
- When identity comes from framework-bridged state (Inertia or SSR shared props, a serialized session), confirm the backend actually shares that field — add the share server-side if missing — before identifying from it
