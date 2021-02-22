package com.lacour.vincent.hypnosedetente.storage

import android.content.Context
import com.google.android.play.core.assetpacks.AssetPackManagerFactory
import com.google.android.play.core.assetpacks.AssetPackState
import com.google.android.play.core.assetpacks.AssetPackStateUpdateListener
import com.google.android.play.core.assetpacks.AssetPackStates
import com.google.android.play.core.assetpacks.model.AssetPackErrorCode
import com.google.android.play.core.assetpacks.model.AssetPackStatus
import com.google.android.play.core.tasks.RuntimeExecutionException
import java.io.File
import java.util.*

class AssetPackSampleManager(private val assetPackName: String, ctx: Context) {
    private val assetPackManager = AssetPackManagerFactory.getInstance(ctx)
    private var onAssetStateReady: (() -> Unit)? = null
    private var onAssetStateDownloadCompleted: (() -> Unit)? = null
    private var onAssetStateError: ((message: String) -> Unit)? = null

    fun requestAssetPackState() {
        assetPackManager.getPackStates(Collections.singletonList(this.assetPackName))
            .addOnCompleteListener { task ->
                val states: AssetPackStates
                try {
                    states = task.result
                    val state: AssetPackState? = states.packStates()[this.assetPackName]
                    if (state?.status() == AssetPackStatus.COMPLETED) {
                        onAssetStateReady?.invoke()
                    } else {
                        assetPackManager.fetch(mutableListOf(this.assetPackName))
                    }
                } catch (e: RuntimeExecutionException) {
                    onAssetStateError?.invoke("ASSET_STATE: ${e.message.toString()}")
                } catch (e: Exception) {
                    onAssetStateError?.invoke("ASSET_STATE: ${e.message.toString()}")
                }
            }
    }

    private val onAssetPackUpdateStateListener: AssetPackStateUpdateListener =
        AssetPackStateUpdateListener { state ->
            when (state.status()) {
                AssetPackStatus.PENDING -> Unit
                AssetPackStatus.DOWNLOADING -> Unit
                AssetPackStatus.TRANSFERRING -> Unit
                AssetPackStatus.WAITING_FOR_WIFI -> Unit
                AssetPackStatus.NOT_INSTALLED -> Unit
                AssetPackStatus.CANCELED -> onAssetStateError?.invoke("ASSET_STATUS_CANCEL")
                AssetPackStatus.COMPLETED -> onAssetStateDownloadCompleted?.invoke()
                AssetPackStatus.FAILED -> onAssetStateError?.invoke(
                    this.getErrorMessageFromCode(
                        state.errorCode()
                    )
                )
                else -> Unit
            }
        }

    fun registerListener() {
        assetPackManager.registerListener(onAssetPackUpdateStateListener)
    }

    fun unregisterListener() {
        assetPackManager.cancel(mutableListOf(this.assetPackName))
        assetPackManager.unregisterListener(onAssetPackUpdateStateListener)
    }

    fun getAssetPackFile(filename: String): File? {
        val assetPackLocation = assetPackManager.getPackLocation(this.assetPackName) ?: return null
        val assetsFolderPath = assetPackLocation.assetsPath() ?: return null
        return File("$assetsFolderPath/$filename")
    }

    fun isAssetPackDownloaded(assetPackName: String): Boolean {
        return assetPackManager.getPackLocation(assetPackName) != null
    }

    fun setOnAssetStateReady(cb: () -> Unit) {
        onAssetStateReady = cb
    }

    fun setOnAssetStateDownloadCompleted(cb: () -> Unit) {
        onAssetStateDownloadCompleted = cb
    }


    fun setOnAssetStateError(cb: (message: String) -> Unit) {
        onAssetStateError = cb
    }

    private fun getErrorMessageFromCode(code: Int): String = when (code) {
        AssetPackErrorCode.ACCESS_DENIED -> "ASSET_STATUS_FAILED: ACCESS_DENIED"
        AssetPackErrorCode.API_NOT_AVAILABLE -> "ASSET_STATUS_FAILED: API_NOT_AVAILABLE"
        AssetPackErrorCode.APP_NOT_OWNED -> "ASSET_STATUS_FAILED: APP_NOT_OWNED"
        AssetPackErrorCode.APP_UNAVAILABLE -> "ASSET_STATUS_FAILED: APP_UNAVAILABLE"
        AssetPackErrorCode.DOWNLOAD_NOT_FOUND -> "ASSET_STATUS_FAILED: DOWNLOAD_NOT_FOUND"
        AssetPackErrorCode.INSUFFICIENT_STORAGE -> "ASSET_STATUS_FAILED: INSUFFICIENT_STORAGE"
        AssetPackErrorCode.INTERNAL_ERROR -> "ASSET_STATUS_FAILED: INTERNAL_ERROR"
        AssetPackErrorCode.INVALID_REQUEST -> "ASSET_STATUS_FAILED: INVALID_REQUEST"
        AssetPackErrorCode.NETWORK_ERROR -> "ASSET_STATUS_FAILED: NETWORK_ERROR"
        AssetPackErrorCode.NO_ERROR -> "ASSET_STATUS_FAILED: NO_ERROR"
        AssetPackErrorCode.PACK_UNAVAILABLE -> "ASSET_STATUS_FAILED: PACK_UNAVAILABLE"
        else -> "ASSET_STATUS_FAILED: UNKNOWN"
    }

}