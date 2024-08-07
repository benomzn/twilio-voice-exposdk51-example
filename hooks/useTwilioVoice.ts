import { Voice } from "@twilio/voice-react-native-sdk";
import { useEffect } from "react";
import { useTwilioEnvStore } from "./useTwilioEnvStore";
import { Audio } from "expo-av";

const useTwilioVoice = ({ loaded }: { loaded: boolean }) => {
  const { twilioState, updateState } = useTwilioEnvStore();

  useEffect(() => {
    if (loaded) {
      (async () => {
        await requestMicPermission();
        await initVoice();
      })();
    }
  }, [loaded]);

  const requestMicPermission = async () => {
    await Audio.requestPermissionsAsync();
    const audioPermission = await Audio.getPermissionsAsync();
    updateState({ voicePermission: audioPermission.status });
  };

  const initVoice = async () => {
    const voiceInstance = new Voice();
    voiceInstance.initializePushRegistry();

    voiceInstance.on(Voice.Event.Registered, () => {
      console.log("TwilioToken Registered");
    });

    voiceInstance.on(Voice.Event.CallInvite, (callInvite: any) => {
      console.log("Incoming call from: ", callInvite);
      callInvite.accept();
    });

    voiceInstance.addListener(Voice.Event.Error, (error: any) => {
      console.log("Error TwilioVoice: ", error);
    });

    try {
      await voiceInstance.register(twilioState.twilioToken);
      updateState({ twilioTokenRegistered: true });
    } catch (error) {
      console.error("Error registering voice:", error);
      // Alert.alert(error);
      updateState({ twilioTokenRegistered: false });
    }
  };
};

export default useTwilioVoice;
