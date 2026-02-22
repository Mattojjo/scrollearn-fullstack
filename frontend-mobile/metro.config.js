/**
 * @format
 */

/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  project: {
    ios: {},
    android: {},
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};

module.exports = config;
