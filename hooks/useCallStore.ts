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
  setActiveCall: (newState: Partial<CallInfo>, newCall?: Call) => void;
  clearState: () => void;
}

export const useActivaCallStore = create<ActiveCallProps>((set) => ({
  call: null,
  callInfo: null,
  setActiveCall: (newState: Partial<CallInfo>, newCall?: Call) =>
    set((state) => ({
      call: newCall ?? state.call,
      callInfo: {
        ...state.callInfo,
        ...newState,
      },
    })),
  clearState: () => set({ call: null, callInfo: null }),
}));

export default useActivaCallStore;
