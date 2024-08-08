import useActivaCallStore from "@/hooks/useActiveCallStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TimerCall from "@/components/TimerCall";
import { voice } from "@/utils/voice";
import { AudioDevice } from "@twilio/voice-react-native-sdk";

const ActiveCallScreen = (): JSX.Element | null => {
  const {
    call,
    callInfo,
    currentDeviceAudio,
    setCallInfo,
    setCurrentDeviceAudio,
    clearState,
  } = useActivaCallStore();
  const router = useRouter();

  useEffect(() => {
    if (!call || !callInfo) {
      router.navigate("/");
    }
  }, [call, callInfo]);

  if (!call || !callInfo) return null;

  const handleMute = async () => {
    let newMutedValue = !callInfo.isMuted;
    await call.mute(newMutedValue);
    setCallInfo({ isMuted: newMutedValue });
  };

  const handleDisconnect = async () => {
    await call.disconnect();
    clearState(); // trigger useeffect to navigate init screen
  };

  const handleAudio = async () => {
    const { audioDevices } = await voice.getAudioDevices();

    switch (currentDeviceAudio) {
      case AudioDevice.Type.Earpiece: {
        var speakerAudio = audioDevices.find(
          (aDevice) => aDevice.type === AudioDevice.Type.Speaker
        );
        await speakerAudio?.select();
        setCurrentDeviceAudio(AudioDevice.Type.Speaker);
        break;
      }
      case AudioDevice.Type.Speaker: {
        var earpieceAudio = audioDevices.find(
          (aDevice) => aDevice.type === AudioDevice.Type.Earpiece
        );
        await earpieceAudio?.select();
        setCurrentDeviceAudio(AudioDevice.Type.Earpiece);
        break;
      }
    }
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
            <Button title="Mute mic" onPress={handleMute} />
          </View>
          <Button title="Disconnect" onPress={handleDisconnect} />
          <View style={{ display: "flex" }}>
            <Text>Is {currentDeviceAudio} on</Text>
            <Button
              title={`Switch to ${
                currentDeviceAudio === AudioDevice.Type.Earpiece
                  ? "speaker"
                  : "earpiece"
              }`}
              onPress={handleAudio}
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
