package expo.modules.ignorebatteryoptimizations

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.PowerManager
import android.provider.Settings
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import androidx.core.net.toUri

class ExpoIgnoreBatteryOptimizationsModule : Module() {
    @SuppressLint("BatteryLife")
    override fun definition() = ModuleDefinition {
        Name("ExpoIgnoreBatteryOptimizations")

        Function<Boolean>("isIgnoringBatteryOptimizations") {
            val ctx = this@ExpoIgnoreBatteryOptimizationsModule.ctx
            val power = ctx.getSystemService(Context.POWER_SERVICE) as PowerManager
            return@Function power.isIgnoringBatteryOptimizations(ctx.packageName)
        }

        Function("requestIgnoreBatteryOptimizations") {
            val ctx = this@ExpoIgnoreBatteryOptimizationsModule.ctx
            val intent = Intent()
            intent.setData("package:${ctx.packageName}".toUri())
            intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS)
            ctx.startActivity(intent)
        }
    }

    private val ctx get(): Context = requireNotNull(appContext.reactContext)
}
