package com.lacour.vincent.hypnosedetente.fragment

import android.content.SharedPreferences
import android.os.Bundle
import androidx.appcompat.app.AppCompatDelegate
import androidx.preference.ListPreference
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import com.lacour.vincent.hypnosedetente.R
import com.lacour.vincent.hypnosedetente.storage.Preferences.Companion.THEME_KEY
import com.lacour.vincent.hypnosedetente.storage.Preferences.Companion.THEME_DEFAULT_VALUE


class SettingsFragment : PreferenceFragmentCompat(),
    SharedPreferences.OnSharedPreferenceChangeListener {


    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        addPreferencesFromResource(R.xml.preferences)
        setPreferenceThemeOnChange()
    }

    override fun onResume() {
        super.onResume()
        preferenceScreen.sharedPreferences.registerOnSharedPreferenceChangeListener(this)
    }

    override fun onPause() {
        super.onPause()
        preferenceScreen.sharedPreferences.unregisterOnSharedPreferenceChangeListener(this)
    }


    private fun setPreferenceThemeOnChange() {
        val preference: ListPreference? = findPreference(THEME_KEY)
        val themes = resources.getStringArray(R.array.theme_entries)
        preference?.summaryProvider =
            Preference.SummaryProvider<ListPreference> { pref ->
                val themeIndex = pref.value
                val value = if (themeIndex.isNullOrBlank()) THEME_DEFAULT_VALUE else themeIndex
                themes[Integer.parseInt(value) + 1]
            }
    }

    override fun onSharedPreferenceChanged(sharedPreferences: SharedPreferences, key: String) {
        if (key == THEME_KEY) {
            val dayNightMode: Int =
                Integer.parseInt(sharedPreferences.getString(key, THEME_DEFAULT_VALUE) as String)
            AppCompatDelegate.setDefaultNightMode(dayNightMode)
        }
    }

}