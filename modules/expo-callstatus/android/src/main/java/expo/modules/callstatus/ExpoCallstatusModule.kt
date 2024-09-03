package expo.modules.callstatus

import android.content.Context
import android.telephony.TelephonyCallback
import android.telephony.TelephonyManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

class ExpoCallstatusModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoCallstatus")

    AsyncFunction("getCallStatus") { _: Unit, promise: Promise ->
      val telephonyManager = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

      val telephonyCallback = object : TelephonyCallback(), TelephonyCallback.CallStateListener {
        override fun onCallStateChanged(state: Int) {
          callState = when (state) {
            TelephonyManager.CALL_STATE_IDLE -> "IDLE"
            else -> "IN CALL"
          }
        }
      }

      telephonyManager.registerTelephonyCallback(context.mainExecutor, telephonyCallback)

      promise.resolve(callState)
    }
  }
}