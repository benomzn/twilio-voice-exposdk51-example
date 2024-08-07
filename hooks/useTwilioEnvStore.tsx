import { create } from "zustand";
import { Audio } from "expo-av";

interface TwilioManagerProps {
  twilioToken: string;
  twilioTokenRegistered: boolean | null;
  voicePermission: Audio.PermissionStatus | null;
  inCall: boolean;
}

/**
 * In this example project, I'm hardcoding the twilioToken, but
 * you can use axios or fetch, to call your /generate-token endpoint
 * and store it the result in the app to register it in twilio
 */
const initialState: TwilioManagerProps = {
  twilioToken: "xaxaxaxaxaxaxaxaxaxaxaxaxaxaxaxaxa",
  twilioTokenRegistered: null,
  voicePermission: null,
  inCall: false,
};

interface TwilioEnvStoreProps {
  twilioState: TwilioManagerProps;
  updateState: (newState: Partial<TwilioManagerProps>) => void;
}

export const useTwilioEnvStore = create<TwilioEnvStoreProps>((set) => ({
  twilioState: initialState,
  updateState: (newState: Partial<TwilioEnvStoreProps>) =>
    set((state) => ({
      twilioState: {
        ...state.twilioState,
        ...newState,
      },
    })),
}));
