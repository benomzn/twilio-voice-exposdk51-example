package expo.modules.callstatus

import android.Manifest
import android.app.Activity
import android.content.Context
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager
import android.telephony.TelephonyCallback
import android.telephony.TelephonyManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.interfaces.permissions.Permissions

class ExpoCallstatusModule : Module() {
  private val activity: Activity
    get() = appContext.activityProvider?.currentActivity ?: throw Exceptions.MissingActivity()
  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()
  private val telephonyCallBack: TelephonyCallbackListener = TelephonyCallbackListener()
  private lateinit var telephonyManager: TelephonyManager

  override fun definition() = ModuleDefinition {
    Name("ExpoCallstatus")

    OnCreate {
      telephonyManager = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
      registerTelephonyManagerCallBack()
    }

    Function("getCallStatus") { ->
      checkReadPhoneStatePermission()
      telephonyCallBack.getCallState()
    }
  }

  private fun registerTelephonyManagerCallBack() {
    if (ContextCompat.checkSelfPermission(activity.applicationContext, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED) {
      telephonyManager.registerTelephonyCallback(context.mainExecutor, telephonyCallBack);
    }
  }

  private fun checkReadPhoneStatePermission() {
    val permission = ContextCompat.checkSelfPermission(activity.applicationContext, Manifest.permission.READ_PHONE_STATE)
    if (permission != PackageManager.PERMISSION_GRANTED) {
      throw Exception("No tienes el permiso para acceder a las llamadas")
    }
  }
}