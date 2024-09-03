import { create } from "zustand";

interface TwilioManagerProps {
  twilioToken: string;
  twilioTokenRegistered: boolean | null;
}

/**
 * In this example project, I'm hardcoding the twilioToken, but
 * you can use axios or fetch, to call your /generate-token endpoint
 * and store it the result in the app to register it in twilio
 */
const initialState: TwilioManagerProps = {
  twilioToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTS2ZiZGM0NmYyZWQzZWNlYWNlYTFkNTMzZGNlNjE2ZTA2IiwiZXhwIjoxNzI1MjI3NTMwLCJqdGkiOiJTS2ZiZGM0NmYyZWQzZWNlYWNlYTFkNTMzZGNlNjE2ZTA2LTE3MjUyMjM5MzAiLCJzdWIiOiJBQzdiNDAwNjFlNzQ4YjAxY2M1ODI5ZGJjM2VjYzc5ZmI3IiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiYmVub216biIsInZvaWNlIjp7ImluY29taW5nIjp7ImFsbG93Ijp0cnVlfSwib3V0Z29pbmciOnsiYXBwbGljYXRpb25fc2lkIjoiQVA3NjQwNWNkYWE1MGNkNDc5YmRkMmM3MTU4Y2RlY2ExYyJ9LCJwdXNoX2NyZWRlbnRpYWxfc2lkIjoiQ1JiN2I5NTg3YjI4NzM3YjQwOTM5NDEwNzg5MWQ5YWU5MCJ9fX0.xBZuTHEVHOFE01UK_Des4c3q2k3xPitPe15uRXsbjyI",
  twilioTokenRegistered: null,
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
