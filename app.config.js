const getEnv = () => {
  return process.env.NODE_ENV === 'uat' ? 'uat' : 'development';
};

module.exports = () => ({
  expo: {
    name: 'myExpoApp',
    slug: 'myExpoApp',
    version: '2.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myexpoapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.anonymous.myExpoApp',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
      env: getEnv(),
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
          microphonePermission:
            'Allow $(PRODUCT_NAME) to access your microphone',
          recordAudioAndroid: true,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: 'e5bf0028-95b4-41b5-a5e2-d3d1c7937846',
      },
      kk: 'kk',
      env: getEnv(),
    },
  },
});
