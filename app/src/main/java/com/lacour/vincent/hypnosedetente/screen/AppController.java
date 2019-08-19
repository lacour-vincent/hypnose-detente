package com.lacour.vincent.hypnosedetente.screen;

import android.app.Application;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import androidx.appcompat.app.AppCompatDelegate;

public class AppController extends Application {

    final String THEME_KEY = "theme";
    final String THEME_DEFAULT_VALUE = "-1";

    @Override
    public void onCreate() {
        super.onCreate();
        initTheme();
    }

    private void initTheme() {
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(this);
        String prefsTheme = prefs.getString(THEME_KEY, THEME_DEFAULT_VALUE);
        int theme = Integer.parseInt(prefsTheme);
        switch (theme) {
            case AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM:
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);
                break;
            case AppCompatDelegate.MODE_NIGHT_AUTO:
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_AUTO);
                break;
            case AppCompatDelegate.MODE_NIGHT_NO:
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
                break;
            case AppCompatDelegate.MODE_NIGHT_YES:
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
                break;
            default:
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);
                break;
        }
    }
}