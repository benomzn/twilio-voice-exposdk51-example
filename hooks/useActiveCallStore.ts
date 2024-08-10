import { Call } from "@twilio/voice-react-native-sdk";
import { create } from "zustand";

export interface CallInfo {
  from?: string;
  to?: string;
  sid?: string;
  isMuted?: boolean;
}

interface ActiveCallProps {
  call: Call | null;
  callInfo: CallInfo | null;
  bootstrapState: (
    newCall: Call,
    newCallInfo: Partial<CallInfo>,
  ) => void;
  setCallInfo: (callInfo: CallInfo) => void;
  clearState: () => void;
}

export const useActivaCallStore = create<ActiveCallProps>((set) => ({
  call: null,
  callInfo: null,
  currentDeviceAudio: null,
  bootstrapState: (
    newCall: Call,
    newCallInfo: Partial<CallInfo>,
  ) =>
    set((state) => ({
      call: newCall,
      callInfo: {
        ...state.callInfo,
        ...newCallInfo,
      },
    })),
  setCallInfo: (callInfo: CallInfo) =>
    set((state) => ({
      callInfo: {
        ...state.callInfo,
        ...callInfo,
      },
    })),
  clearState: () => set({ call: null, callInfo: null }),
}));

export default useActivaCallStore;
