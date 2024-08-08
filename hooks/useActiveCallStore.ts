import { AudioDevice, Call } from "@twilio/voice-react-native-sdk";
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
  currentDeviceAudio: AudioDevice.Type | null;
  bootstrapState: (
    newCall: Call,
    newCallInfo: Partial<CallInfo>,
    newCurrentDeviceAudio: AudioDevice.Type
  ) => void;
  setCallInfo: (callInfo: CallInfo) => void;
  setCurrentDeviceAudio: (deviceAudio: AudioDevice.Type) => void;
  clearState: () => void;
}

export const useActivaCallStore = create<ActiveCallProps>((set) => ({
  call: null,
  callInfo: null,
  currentDeviceAudio: null,
  bootstrapState: (
    newCall: Call,
    newCallInfo: Partial<CallInfo>,
    newCurrentDeviceAudio: AudioDevice.Type
  ) =>
    set((state) => ({
      call: newCall,
      callInfo: {
        ...state.callInfo,
        ...newCallInfo,
      },
      currentDeviceAudio: newCurrentDeviceAudio,
    })),
  setCallInfo: (callInfo: CallInfo) =>
    set((state) => ({
      callInfo: {
        ...state.callInfo,
        ...callInfo,
      },
    })),
  setCurrentDeviceAudio: (deviceAudio: AudioDevice.Type) =>
    set((state) => ({
      currentDeviceAudio: deviceAudio,
    })),
  clearState: () => set({ call: null, callInfo: null, currentDeviceAudio: null }),
}));

export default useActivaCallStore;
