package com.lacour.vincent.hypnosedetente.fragment

import android.content.SharedPreferences
import android.os.Bundle

import androidx.appcompat.app.AppCompatDelegate
import androidx.preference.PreferenceFragment

import com.lacour.vincent.hypnosedetente.R

class SettingsFragment : PreferenceFragment(), SharedPreferences.OnSharedPreferenceChangeListener {

    private val THEME_KEY = "theme"
    private val THEME_DEFAULT_VALUE = "-1"

    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        addPreferencesFromResource(R.xml.preferences)
    }

    override fun onResume() {
        super.onResume()
        preferenceScreen.sharedPreferences.registerOnSharedPreferenceChangeListener(this)
    }

    override fun onPause() {
        super.onPause()
        preferenceScreen.sharedPreferences.unregisterOnSharedPreferenceChangeListener(this)
    }

    private fun applyTheme(dayNightMode: Int) {
        AppCompatDelegate.setDefaultNightMode(dayNightMode)
        this.activity.finish()
    }

    override fun onSharedPreferenceChanged(sharedPreferences: SharedPreferences, key: String) {
        if (key == THEME_KEY) {
            val dayNightMode: Int = Integer.parseInt(sharedPreferences.getString(key, THEME_DEFAULT_VALUE)!!)
            when (dayNightMode) {
                AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM -> applyTheme(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
                AppCompatDelegate.MODE_NIGHT_AUTO -> applyTheme(AppCompatDelegate.MODE_NIGHT_AUTO)
                AppCompatDelegate.MODE_NIGHT_NO -> applyTheme(AppCompatDelegate.MODE_NIGHT_NO)
                AppCompatDelegate.MODE_NIGHT_YES -> applyTheme(AppCompatDelegate.MODE_NIGHT_YES)
                else -> applyTheme(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
            }
        }
    }

}