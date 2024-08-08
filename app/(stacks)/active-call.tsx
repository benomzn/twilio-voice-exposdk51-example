import useActivaCallStore from "@/hooks/useCallStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { timeFormater } from "@/utils/timeFormater";

const ActiveCallScreen = (): JSX.Element | null => {
  const { call, callInfo, clearState, setActiveCall } = useActivaCallStore();
  // or is the speaker is from call, just put in the store
  const [speakerOn, setSpeakerOn] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (!call || !callInfo) {
      router.navigate("/");
    }

    let timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [call, callInfo]);

  if (!call || !callInfo) return null;

  const handleMute = async () => {
    let newMutedValue = !callInfo.isMuted;
    await call.mute(newMutedValue);
    setActiveCall({ isMuted: newMutedValue });
  };

  const handleDisconnect = async () => {
    await call.disconnect();
    clearState(); // trigger useeffect to navigate init screen
  };

  const handleSpeaker = async () => {
    /**
     * Check how on the speaker
     */
    setSpeakerOn(!speakerOn);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>In call..</Text>
        <Text>From: {callInfo.from}</Text>
        <Text>Time in call: {timeFormater(secondsElapsed)}</Text>
        <View style={styles.buttonsContainer}>
          <View style={{ display: "flex" }}>
            <Text>Is muted: {callInfo.isMuted ? "YES" : "NO"}</Text>
            <Button title="Mute" onPress={handleMute} />
          </View>
          <Button title="Disconnect" onPress={handleDisconnect} />
          <View style={{ display: "flex" }}>
            <Text>Is speaker on: {speakerOn ? "YES" : "NO"}</Text>
            <Button title="Speaker" onPress={handleSpeaker} />
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
