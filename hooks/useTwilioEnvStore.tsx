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
  twilioToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIiwidHdyIjoiaWUxIn0.eyJpc3MiOiJTSzRhMTMyOTViYTYwMDI4YmE3MWE4NDA5ZGVkOWViNzAxIiwiZXhwIjoxNzIzMjg0NTM4LCJqdGkiOiJTSzRhMTMyOTViYTYwMDI4YmE3MWE4NDA5ZGVkOWViNzAxLTE3MjMyODA5MzgiLCJzdWIiOiJBQzdiNDAwNjFlNzQ4YjAxY2M1ODI5ZGJjM2VjYzc5ZmI3IiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiYmVub216biIsInZvaWNlIjp7ImluY29taW5nIjp7ImFsbG93Ijp0cnVlfSwib3V0Z29pbmciOnsiYXBwbGljYXRpb25fc2lkIjoiQVBjNzUwOTY5NDU2NmQ0NjI1MWQ0YTE4ZjFlNDM1ODBhZSJ9LCJwdXNoX2NyZWRlbnRpYWxfc2lkIjoiQ1JhODQ3NmQzYTQyNThlZjQ3MDRjYzEzMzVjYTNlZDA4YyJ9fX0.0dqiN9UHbkQZKtT-Tjhyt8A6C_Au6qF6AMnC-JpH-Rk",
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
