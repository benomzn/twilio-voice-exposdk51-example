import {
  Voice,
  CallInvite,
  Call
} from "@twilio/voice-react-native-sdk";
import { useCallback, useEffect } from "react";
import { voice } from "@/utils/voice";
import { useTwilioEnvStore } from "./useTwilioEnvStore";
import useActivaCallStore, { CallInfo } from "./useActiveCallStore";
import { useRouter } from "expo-router";

const useTwilioVoice = ({ loaded }: { loaded: boolean }) => {
  const { twilioState, updateState } = useTwilioEnvStore();
  const { bootstrapState } = useActivaCallStore();
  const router = useRouter();

  const registeredHandler = useCallback(async () => {
    console.log("el token se ha registrado correctamente");
    updateState({ twilioTokenRegistered: true });
  }, [updateState]);

  const callInviteHandler = useCallback(async (callInvite: CallInvite) => {
    console.log("incoming calling");
    await callInvite.updateCallerHandle("Jonathan Dev");
    callInvite.on(CallInvite.Event.Accepted, callInviteAcceptedHandler);
  }, []);

  const callInviteAcceptedHandler = useCallback(async (call: Call) => {
    console.log("accepted call");

    const newIncomingCall: CallInfo = {
      from: call.getFrom(),
      to: call.getTo(),
      isMuted: call.isMuted(),
      sid: call.getSid(),
    };

    bootstrapState(call, newIncomingCall);
    router.push("/active-call");
  }, [bootstrapState]);

  useEffect(() => {
    voice.initializePushRegistry();

    voice.on(Voice.Event.Registered, registeredHandler);
    voice.on(Voice.Event.CallInvite, callInviteHandler);

    return () => {
      voice.off(Voice.Event.Registered, registeredHandler);
      voice.off(Voice.Event.CallInvite, callInviteHandler);
    };
  }, [registeredHandler, callInviteHandler]);

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
