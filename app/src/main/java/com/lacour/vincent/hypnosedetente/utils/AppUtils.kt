package com.lacour.vincent.hypnosedetente.utils

import android.content.Context
import android.os.Build
import android.os.PowerManager

class AppUtils(private val ctx: Context) {

    companion object {
        private const val PLAYSTORE_PACKAGE_NAME = "com.android.vending"
    }

    fun isPlayStoreInstalled(): Boolean {
        val mIntent = this.ctx.packageManager.getLaunchIntentForPackage(PLAYSTORE_PACKAGE_NAME)
        return mIntent != null
    }

    fun isIgnoringBatteryOptimizations(): Boolean {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return true
        val powerManager =
            this.ctx.applicationContext.getSystemService(Context.POWER_SERVICE) as PowerManager
        return powerManager.isIgnoringBatteryOptimizations(this.ctx.packageName)
    }

}