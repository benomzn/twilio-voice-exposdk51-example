import { Image, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTwilioEnvStore } from "@/hooks/useTwilioEnvStore";

export default function HomeScreen() {
  const { twilioState } = useTwilioEnvStore();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Expo App SDK51 (Testing Twilio Voice)
        </ThemedText>
        <ThemedText>
          This app is for testing the twilio-voice-react-native-sdk library and
          receive calls from TwiML.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Twilio Environment</ThemedText>
        <ThemedText numberOfLines={4}>
          <ThemedText type="defaultSemiBold">Twilio Token: </ThemedText>
          {twilioState.twilioToken}
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            Twilio Token Registered:{" "}
          </ThemedText>
          {twilioState.twilioTokenRegistered === null
            ? "❔"
            : twilioState.twilioTokenRegistered
            ? "✅"
            : "❌"}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
