package com.lacour.vincent.hypnosedetente.utils

import android.content.Context
import android.net.ConnectivityManager
import android.net.wifi.WifiManager

import java.io.File

class AppUtils(private val ctx: Context) {

    companion object {
        private const val PLAYSTORE_PACKAGE_NAME = "com.android.vending"
        private const val WIFI_LOCK_TAG = "WIFI_LOCK_APP_HYPNOSE_DETENTE"
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

    fun setStayAwakeLock(state: Boolean) {
        val wifiManager =
            this.ctx.applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
        val wifiLock =
            wifiManager.createWifiLock(WifiManager.WIFI_MODE_FULL_HIGH_PERF, WIFI_LOCK_TAG)
        wifiLock.setReferenceCounted(false)
        if (!wifiLock.isHeld && state) {
            wifiLock.acquire()
            return
        }
        if (wifiLock.isHeld) wifiLock.release()
    }


}