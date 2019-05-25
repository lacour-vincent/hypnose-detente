package com.lacour.vincent.hypnosedetente.utils;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiManager;

import java.io.File;

public class AppUtils {

    private Context ctx;
    private final static String PLAYSTORE_PACKAGE_NAME = "com.android.vending";

    public AppUtils(Context context) {
        this.ctx = context;
    }

    public boolean hasInternet() {
        ConnectivityManager cm = (ConnectivityManager) this.ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfoMobile = cm.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
        NetworkInfo netInfoWifi = cm.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
        return (netInfoMobile != null && netInfoMobile.isConnectedOrConnecting())
                || (netInfoWifi != null && netInfoWifi.isConnectedOrConnecting());
    }

    public boolean isFileExist(String fileName) {
        File file = new File(this.ctx.getExternalFilesDir(this.ctx.getFilesDir().getAbsolutePath()), fileName);
        return file.exists();
    }

    public boolean deleteFile(String fileName) {
        File file = new File(this.ctx.getExternalFilesDir(this.ctx.getFilesDir().getAbsolutePath()), fileName);
        if (file.exists())
            return file.delete();
        return false;
    }

    public boolean isPlayStoreInstalled() {
        return isAppInstalled(PLAYSTORE_PACKAGE_NAME);
    }

    private boolean isAppInstalled(String packageName) {
        Intent mIntent = this.ctx.getPackageManager().getLaunchIntentForPackage(packageName);
        return mIntent != null;
    }

    public void setStayAwakeLock(boolean state) {
        WifiManager wifiManager = (WifiManager) this.ctx.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        WifiManager.WifiLock wifiLock = wifiManager.createWifiLock(WifiManager.WIFI_MODE_FULL, "WIFI_LOCK_APP_HYPNOSE_DETENTE");
        wifiLock.setReferenceCounted(false);
        if (!wifiLock.isHeld() && state) {
            wifiLock.acquire();
            return;
        }
        if (wifiLock.isHeld()) wifiLock.release();
    }

}

