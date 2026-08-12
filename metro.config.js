// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// On web, Metro resolves zustand's "import" package-exports condition to
// zustand/esm/middleware.mjs, which references `import.meta.env` inside its
// (unused here) devtools code. Expo's web dev server serves the bundle as a
// classic script, so that `import.meta` is a hard syntax error that breaks
// client-side hydration entirely. Force this one module to its CJS build
// (process.env-based, no import.meta) on web; native is unaffected.
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === 'zustand/middleware') {
    return {
      type: 'sourceFile',
      filePath: require.resolve('zustand/middleware'),
    };
  }
  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
