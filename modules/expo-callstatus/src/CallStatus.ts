import ExpoCallstatusModule from "./ExpoCallstatusModule"

/**
 * Retorna el estatus de CallKit o TelephonyManager
 */
export const getCallStatus = (): string => {
  var callState = ExpoCallstatusModule.getCallStatus();

  return callState;
}