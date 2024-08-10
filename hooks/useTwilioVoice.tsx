import {
  Voice,
  CallInvite,
  Call,
  AudioDevice,
} from "@twilio/voice-react-native-sdk";
import { useEffect } from "react";
import { voice } from "@/utils/voice";
import { useTwilioEnvStore } from "./useTwilioEnvStore";
import useActivaCallStore, { CallInfo } from "./useActiveCallStore";
import { useRouter } from "expo-router";
import { TwilioError } from "@twilio/voice-react-native-sdk/lib/typescript/error";
import { Alert } from "react-native";

const useTwilioVoice = ({ loaded }: { loaded: boolean }) => {
  const { twilioState, updateState } = useTwilioEnvStore();
  const { bootstrapState } = useActivaCallStore();
  const router = useRouter();

  const registeredHandler = () => {
    console.log("el token se ha registrado correctamente");
    updateState({ twilioTokenRegistered: true });
  };

  const callInviteAcceptedHandler = async (call: Call) => {
    console.log("accepted call");

    const newIncomingCall: CallInfo = {
      from: call.getFrom(),
      to: call.getTo(),
      isMuted: call.isMuted(),
      sid: call.getSid(),
    };

    bootstrapState(call, newIncomingCall);
    router.push("/active-call");
  };

  const callInviteHandler = (callInvite: CallInvite) => {
    console.log("incoming calling");
    callInvite.updateCallerHandle("Jonathan Dev");
    callInvite.on(CallInvite.Event.Accepted, callInviteAcceptedHandler);
    callInvite.on(CallInvite.Event.Cancelled, (error?: TwilioError) => {
      console.log("canceled");
    });
    callInvite.on(CallInvite.Event.Rejected, () => {
      console.log("rejected");
    });
  };

  useEffect(() => {
    voice.initializePushRegistry();

    voice.on(Voice.Event.Registered, registeredHandler);
    voice.on(Voice.Event.CallInvite, callInviteHandler);

    return () => {
      voice.off(Voice.Event.Registered);
      voice.off(Voice.Event.CallInvite);
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      registerToken();
    }
  }, [loaded]);

  const registerToken = async () => {
    try {
      await voice.register(twilioState.twilioToken);
    } catch (error) {
      console.error("Error registering voice:", error);
      updateState({ twilioTokenRegistered: false });
    }
  };
};

export default useTwilioVoice;
