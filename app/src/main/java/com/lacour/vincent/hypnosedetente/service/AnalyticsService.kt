package com.lacour.vincent.hypnosedetente.service

import android.content.Context
import android.os.Bundle
import com.google.firebase.analytics.FirebaseAnalytics
import com.lacour.vincent.hypnosedetente.storage.Preferences

class AnalyticsService(ctx: Context) {

    companion object {
        private const val VIEW_SAMPLE_EVENT = "sample_view"
        private const val INFORMATION_SAMPLE_EVENT = "sample_information"
        private const val END_SAMPLE_EVENT = "sample_end"
        private const val DOWNLOAD_SAMPLE = "sample_download"
        private const val ERROR_SAMPLE_EVENT = "sample_error"
        private const val DEVICE_INCOMPATIBLE_EVENT = "incompatible_device"
        private const val SAMPLE_PARAM = "sample"
        private const val ERROR_MESSAGE_PARAM = "error_message"
    }

    private val firebaseAnalytics = FirebaseAnalytics.getInstance(ctx)
    private val preferences: Preferences = Preferences(ctx)

    init {
        firebaseAnalytics.setAnalyticsCollectionEnabled(preferences.getIsAnalyticsEnabled())
    }

    private fun logEvent(event: String, bundle: Bundle?) {
        return firebaseAnalytics.logEvent(event, bundle)
    }

    fun logViewSampleEvent(sample: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        return logEvent(VIEW_SAMPLE_EVENT, params)
    }

    fun logSampleInformationEvent(sample: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        return logEvent(INFORMATION_SAMPLE_EVENT, params)
    }

    fun logSampleDownloadEvent(sample: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        return logEvent(DOWNLOAD_SAMPLE, params)
    }

    fun logSampleEndEvent(sample: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        return logEvent(END_SAMPLE_EVENT, params)
    }

    fun logErrorSample(sample: String, message: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        params.putString(ERROR_MESSAGE_PARAM, message)
        return logEvent(ERROR_SAMPLE_EVENT, params)
    }

    fun logIncompatibleDevice() {
        return logEvent(DEVICE_INCOMPATIBLE_EVENT, null)
    }

}