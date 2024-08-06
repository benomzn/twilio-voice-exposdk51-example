import { create } from "zustand";
import { Audio } from "expo-av";

interface TwilioManagerProps {
  twilioToken: string;
  twilioTokenRegistered: boolean | null;
  voicePermission: Audio.PermissionStatus | null;
  inCall: boolean;
}

const initialState: TwilioManagerProps = {
  twilioToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTS2ZiZGM0NmYyZWQzZWNlYWNlYTFkNTMzZGNlNjE2ZTA2IiwiZXhwIjoxNzIyOTM3NTAzLCJqdGkiOiJTS2ZiZGM0NmYyZWQzZWNlYWNlYTFkNTMzZGNlNjE2ZTA2LTE3MjI5MzM5MDMiLCJzdWIiOiJBQzdiNDAwNjFlNzQ4YjAxY2M1ODI5ZGJjM2VjYzc5ZmI3IiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiYmVub216biIsInZvaWNlIjp7ImluY29taW5nIjp7ImFsbG93Ijp0cnVlfSwib3V0Z29pbmciOnsiYXBwbGljYXRpb25fc2lkIjoiQVA3NjQwNWNkYWE1MGNkNDc5YmRkMmM3MTU4Y2RlY2ExYyJ9LCJwdXNoX2NyZWRlbnRpYWxfc2lkIjoiQ1JiN2I5NTg3YjI4NzM3YjQwOTM5NDEwNzg5MWQ5YWU5MCJ9fX0.6rguYWnvprp6hj_M1jMAfcnM8NQE9neiMXg_84AY-GM",
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
