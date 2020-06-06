package com.lacour.vincent.hypnosedetente.fragment

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.widget.Toast
import androidx.appcompat.app.AppCompatDelegate
import androidx.preference.ListPreference
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import com.lacour.vincent.hypnosedetente.R
import com.lacour.vincent.hypnosedetente.storage.Preferences.Companion.BATTERY_OPTIMIZATION_KEY
import com.lacour.vincent.hypnosedetente.storage.Preferences.Companion.THEME_DEFAULT_VALUE
import com.lacour.vincent.hypnosedetente.storage.Preferences.Companion.THEME_KEY
import com.lacour.vincent.hypnosedetente.utils.AppUtils


class SettingsFragment : PreferenceFragmentCompat(),
    SharedPreferences.OnSharedPreferenceChangeListener {

    private lateinit var appUtils: AppUtils

    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        addPreferencesFromResource(R.xml.preferences)
        appUtils = AppUtils(this.requireContext())
        setPreferenceThemeOnChange()
        setBatteryOptimizationClick()
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

    @SuppressLint("BatteryLife", "InlinedApi")
    private fun requestIgnoreBatteryOptimizations() {
        val ctx: Context = requireContext()
        val packageName: String = ctx.packageName
        if (appUtils.isIgnoringBatteryOptimizations()) {
            Toast.makeText(
                ctx,
                getString(R.string.battery_optimization_already_set),
                Toast.LENGTH_LONG
            ).show()
            return
        }
        val intent = Intent()
        intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS)
        intent.setData(Uri.parse("package:$packageName"))
        ctx.startActivity(intent)
    }

    private fun setBatteryOptimizationClick() {
        val preference: Preference? = findPreference(BATTERY_OPTIMIZATION_KEY)
        preference?.setOnPreferenceClickListener {
            requestIgnoreBatteryOptimizations()
            true
        }
    }

}