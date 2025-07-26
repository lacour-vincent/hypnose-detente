package expo.modules.foregroundservice

import android.content.Context
import android.content.Intent
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoForegroundServiceModule : Module() {

    override fun definition() = ModuleDefinition {
        Name("ExpoForegroundService")

        Function("start") { sample: String ->
            val context = this@ExpoForegroundServiceModule.ctx
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                ForegroundService.startService(context, sample)
            } else {
                val intent = Intent(context, ForegroundService::class.java)
                intent.putExtra("sample", sample)
                context.startService(intent)
            }
        }

        Function("stop") {
            val context = this@ExpoForegroundServiceModule.ctx
            ForegroundService.stopService(context)
        }
    }

    private val ctx get(): Context = requireNotNull(appContext.reactContext)
}
