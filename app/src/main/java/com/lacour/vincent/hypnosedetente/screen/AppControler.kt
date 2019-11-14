package com.lacour.vincent.hypnosedetente.screen

import android.app.Application
import androidx.preference.PreferenceManager
import androidx.appcompat.app.AppCompatDelegate

class AppController : Application() {

    companion object {
        private const val THEME_KEY: String = "theme"
        private const val THEME_DEFAULT_VALUE: String = "-1"
    }

    override fun onCreate() {
        super.onCreate()
        initTheme()
    }

    private fun initTheme() {
        val prefs = PreferenceManager.getDefaultSharedPreferences(this)
        val prefsTheme = prefs.getString(THEME_KEY, THEME_DEFAULT_VALUE)
        val theme = Integer.parseInt(prefsTheme!!)
        when (theme) {
            AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM -> AppCompatDelegate.setDefaultNightMode(
                AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
            )
            AppCompatDelegate.MODE_NIGHT_AUTO_BATTERY -> AppCompatDelegate.setDefaultNightMode(
                AppCompatDelegate.MODE_NIGHT_AUTO_BATTERY
            )
            AppCompatDelegate.MODE_NIGHT_NO -> AppCompatDelegate.setDefaultNightMode(
                AppCompatDelegate.MODE_NIGHT_NO
            )
            AppCompatDelegate.MODE_NIGHT_YES -> AppCompatDelegate.setDefaultNightMode(
                AppCompatDelegate.MODE_NIGHT_YES
            )
            else -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
        }
    }
}