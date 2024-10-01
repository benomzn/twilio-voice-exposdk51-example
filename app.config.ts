import "ts-node/register";
import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "TwilioVoiceTesting",
  slug: "TwilioVoiceTesting",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    buildNumber: "1",
    supportsTablet: true,
    bundleIdentifier: "com.testing.voip.benomzn",
    infoPlist: {
      NSMicrophoneUsageDescription:
        "Esta aplicación requiere el micrófono para poder recibir llamadas por VoIP.",
      UIBackgroundModes: [
        "audio",
        "fetch",
        "remote-notification",
        "voip",
        "location",
      ],
      NSCallKitUsageDescription:
        "Esta aplicación requiere acceso a CallKit para obtener el estatus de sus llamadas.",
    },
    associatedDomains: [
      "messagefilter:b8f2-2806-2f0-33a0-f5ac-61d7-7015-1ef4-7887.ngrok-free.app",
    ],
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    permissions: ["READ_PHONE_STATE"],
    package: "com.testing.voip.benomzn",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    ["./configs/index.ts",
      {
        teamId: "XXXXXXXX"
      }
    ]
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
