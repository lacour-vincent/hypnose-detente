package com.lacour.vincent.hypnosedetente.utils

import android.content.Context
import android.net.ConnectivityManager
import android.os.Build
import android.os.PowerManager
import java.io.File

class AppUtils(private val ctx: Context) {

    companion object {
        private const val PLAYSTORE_PACKAGE_NAME = "com.android.vending"
    }

    fun isPlayStoreInstalled(): Boolean {
        val mIntent = this.ctx.packageManager.getLaunchIntentForPackage(PLAYSTORE_PACKAGE_NAME)
        return mIntent != null
    }

    fun hasInternet(): Boolean {
        /* Solution exists with API 23 min */
        val connectivityManager =
            this.ctx.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val networkInfo = connectivityManager.activeNetworkInfo
        return networkInfo != null && networkInfo.isConnected
    }

    fun isFileExist(fileName: String): Boolean {
        val file = File(this.ctx.getExternalFilesDir(this.ctx.filesDir.absolutePath), fileName)
        return file.exists()
    }

    fun deleteFile(fileName: String): Boolean {
        val file = File(this.ctx.getExternalFilesDir(this.ctx.filesDir.absolutePath), fileName)
        return if (file.exists()) file.delete() else false
    }

    fun isIgnoringBatteryOptimizations(): Boolean {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return true
        val powerManager =
            this.ctx.applicationContext.getSystemService(Context.POWER_SERVICE) as PowerManager
        return powerManager.isIgnoringBatteryOptimizations(this.ctx.packageName)
    }

}