import ExpoCallstatusModule from "./ExpoCallstatusModule"

/**
 * Retorna el estatus de CallKit o TelephonyManager
 */
export const getCallStatus = async (): Promise<string> => {
  var callState = await ExpoCallstatusModule.getCallStatus();

  return callState;
}