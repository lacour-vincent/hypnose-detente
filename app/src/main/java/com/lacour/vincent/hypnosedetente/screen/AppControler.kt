package com.lacour.vincent.hypnosedetente.screen

import android.app.Application
import androidx.appcompat.app.AppCompatDelegate
import com.lacour.vincent.hypnosedetente.storage.Preferences

class AppController : Application() {

    override fun onCreate() {
        super.onCreate()
        val preferences = Preferences(this)
        AppCompatDelegate.setDefaultNightMode(preferences.getTheme())
    }


}