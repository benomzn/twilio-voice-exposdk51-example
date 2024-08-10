import useActivaCallStore from "@/hooks/useActiveCallStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TimerCall from "@/components/TimerCall";
import { AudioDevice } from "@twilio/voice-react-native-sdk";
import useAudioDeviceInCall from "@/hooks/useAudioDeviceInCall";

const ActiveCallScreen = (): JSX.Element | null => {
  const { call, callInfo, setCallInfo, clearState } = useActivaCallStore();
  const { audioDeviceTypeSelected, toggleAudioDevice } = useAudioDeviceInCall();
  const router = useRouter();

  useEffect(() => {
    if (!call || !callInfo) {
      router.navigate("/");
    }
  }, [call, callInfo]);

  if (!call || !callInfo) return null;

  const toggleMute = async () => {
    let newMutedValue = !callInfo.isMuted;
    await call.mute(newMutedValue);
    setCallInfo({ isMuted: newMutedValue });
  };

  const endCall = async () => {
    await call.disconnect();
    clearState(); // trigger useeffect to navigate init screen
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>In call..</Text>
        <Text>From: {callInfo.from}</Text>
        <TimerCall callActive={call !== null || callInfo !== null} />
        <View style={styles.buttonsContainer}>
          <View style={{ display: "flex" }}>
            <Text>Mic is muted: {callInfo.isMuted ? "YES" : "NO"}</Text>
            <Button title="Mute mic" onPress={toggleMute} />
          </View>
          <Button title="Disconnect" onPress={endCall} />
          <View style={{ display: "flex" }}>
            <Text>Is {audioDeviceTypeSelected} on</Text>
            <Button
              title={`Switch to ${
                audioDeviceTypeSelected === AudioDevice.Type.Earpiece
                  ? "speaker"
                  : "earpiece"
              }`}
              onPress={toggleAudioDevice}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "black",
  },
  fromText: {
    fontSize: 16,
    color: "gray",
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ActiveCallScreen;
