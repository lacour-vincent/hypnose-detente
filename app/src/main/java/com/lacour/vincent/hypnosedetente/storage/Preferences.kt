package com.lacour.vincent.hypnosedetente.storage

import android.content.Context
import android.content.SharedPreferences
import androidx.preference.PreferenceManager

class Preferences(ctx: Context) {

    companion object {
        const val THEME_KEY: String = "theme"
        const val THEME_DEFAULT_VALUE: String = "-1"
        const val IS_ANALYTICS_ENABLED_KEY: String = "analytics"
        const val IS_ANALYTICS_ENABLED_DEFAULT_VALUE: Boolean = true
        const val BATTERY_OPTIMIZATION_KEY = "battery_optimization"
    }

    private val preferences: SharedPreferences = PreferenceManager.getDefaultSharedPreferences(ctx)

    fun getTheme(): Int {
        return Integer.parseInt(preferences.getString(THEME_KEY, THEME_DEFAULT_VALUE) as String)
    }

    fun getIsAnalyticsEnabled(): Boolean {
        return preferences.getBoolean(IS_ANALYTICS_ENABLED_KEY, IS_ANALYTICS_ENABLED_DEFAULT_VALUE)
    }


}