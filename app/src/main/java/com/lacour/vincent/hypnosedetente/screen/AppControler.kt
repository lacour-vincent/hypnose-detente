package com.lacour.vincent.hypnosedetente.screen

import android.app.Application
import android.content.Context
import androidx.appcompat.app.AppCompatDelegate
import com.lacour.vincent.hypnosedetente.storage.Preferences

class AppController : Application() {
    init {
        instance = this
    }

    companion object {
        private lateinit var instance: AppController

        fun getAppContext(): Context {
            return instance.applicationContext
        }
    }


    override fun onCreate() {
        super.onCreate()
        val preferences = Preferences(getAppContext())
        AppCompatDelegate.setDefaultNightMode(preferences.getTheme())
    }


}