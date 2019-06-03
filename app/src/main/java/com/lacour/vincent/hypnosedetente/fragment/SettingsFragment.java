package com.lacour.vincent.hypnosedetente.fragment;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceFragment;
import android.support.v7.app.AppCompatDelegate;

import com.lacour.vincent.hypnosedetente.R;

public class SettingsFragment extends PreferenceFragment implements SharedPreferences.OnSharedPreferenceChangeListener {

    final String THEME_KEY = "theme";
    final String THEME_DEFAULT_VALUE = "-1";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.preferences);
    }


    @Override
    public void onResume() {
        super.onResume();
        getPreferenceScreen().getSharedPreferences().registerOnSharedPreferenceChangeListener(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        getPreferenceScreen().getSharedPreferences().unregisterOnSharedPreferenceChangeListener(this);
    }

    private void applyTheme(int dayNightMode) {
        AppCompatDelegate.setDefaultNightMode(dayNightMode);
        this.getActivity().finish();
    }

    @Override
    public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) {
        if (key.equals(THEME_KEY)) {
            String dayNightMode = sharedPreferences.getString(key, THEME_DEFAULT_VALUE);
            if (dayNightMode == null) return;
            int mode = Integer.parseInt(dayNightMode);
            switch (mode) {
                case AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM:
                    applyTheme(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);
                    break;
                case AppCompatDelegate.MODE_NIGHT_AUTO:
                    applyTheme(AppCompatDelegate.MODE_NIGHT_AUTO);
                    break;
                case AppCompatDelegate.MODE_NIGHT_NO:
                    applyTheme(AppCompatDelegate.MODE_NIGHT_NO);
                    break;
                case AppCompatDelegate.MODE_NIGHT_YES:
                    applyTheme(AppCompatDelegate.MODE_NIGHT_YES);
                    break;
                default:
                    applyTheme(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);
                    break;
            }
        }
    }

}