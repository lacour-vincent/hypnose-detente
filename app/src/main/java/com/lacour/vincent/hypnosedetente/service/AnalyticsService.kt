package com.lacour.vincent.hypnosedetente.service

import android.content.Context
import android.os.Bundle
import com.google.firebase.analytics.FirebaseAnalytics
import com.lacour.vincent.hypnosedetente.storage.Preferences


class AnalyticsService(ctx: Context) {

    companion object {
        private const val VIEW_SAMPLE_EVENT = "sample_view"
        private const val INFORMATION_SAMPLE_EVENT = "sample_information"
        private const val DOWNLOAD_SAMPLE_EVENT = "sample_download"
        private const val DELETE_SAMPLE_EVENT = "sample_delete"
        private const val ERROR_DOWNLOAD_SAMPLE_EVENT = "sample_download_error"
        private const val ERROR_SAMPLE_EVENT = "sample_error"
        private const val DEVICE_INCOMPATIBLE_EVENT = "incompatible_device"

        private const val SAMPLE_PARAM = "sample"
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

    fun logDownloadSampleEvent(sample: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        return logEvent(DOWNLOAD_SAMPLE_EVENT, params)
    }

    fun logDeleteSampleEvent(sample: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        return logEvent(DELETE_SAMPLE_EVENT, params)
    }

    fun logErrorDownloadSample(sample: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        return logEvent(ERROR_DOWNLOAD_SAMPLE_EVENT, params)
    }

    fun logErrorSample(sample: String) {
        val params = Bundle()
        params.putString(SAMPLE_PARAM, sample)
        return logEvent(ERROR_SAMPLE_EVENT, params)
    }

    fun logIncompatibleDevice() {
        return logEvent(DEVICE_INCOMPATIBLE_EVENT, null)
    }

}