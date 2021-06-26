package com.lacour.vincent.hypnosedetente.storage

import android.content.Context
import com.google.android.play.core.assetpacks.AssetPackManagerFactory
import com.google.android.play.core.assetpacks.AssetPackState
import com.google.android.play.core.assetpacks.AssetPackStateUpdateListener
import com.google.android.play.core.assetpacks.AssetPackStates
import com.google.android.play.core.assetpacks.model.AssetPackErrorCode
import com.google.android.play.core.assetpacks.model.AssetPackStatus
import java.io.File
import java.util.*

class AssetPackSampleManager(private val assetPackName: String, ctx: Context) {
    private val assetPackManager = AssetPackManagerFactory.getInstance(ctx)
    private var onAssetStateReady: (() -> Unit)? = null
    private var onAssetStateDownloadCompleted: (() -> Unit)? = null
    private var onAssetStateError: ((message: String) -> Unit)? = null


    fun retrieveAssetPackState(filename: String) {
        val file = this.getAssetPackFile(filename)
        if (file == null) this.requestAssetPackState()
        else onAssetStateReady?.invoke()
    }

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
                } catch (e: RuntimeException) {
                    // should normally throw an AssetPackException instead of Runtime -> getErrorCode
                    onAssetStateError?.invoke("ASSET_PACK_MANAGER_ERROR: RUNTIME_EXCEPTION")
                } catch (e: Exception) {
                    onAssetStateError?.invoke("ASSET_PACK_MANAGER_ERROR: EXCEPTION")
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
                AssetPackStatus.CANCELED -> onAssetStateError?.invoke("ASSET_PACK_MANAGER_ERROR: CANCELED")
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
        AssetPackErrorCode.ACCESS_DENIED -> "ASSET_PACK_MANAGER_ERROR: ACCESS_DENIED"
        AssetPackErrorCode.API_NOT_AVAILABLE -> "ASSET_PACK_MANAGER_ERROR: API_NOT_AVAILABLE"
        AssetPackErrorCode.APP_NOT_OWNED -> "ASSET_PACK_MANAGER_ERROR: APP_NOT_OWNED"
        AssetPackErrorCode.APP_UNAVAILABLE -> "ASSET_PACK_MANAGER_ERROR: APP_UNAVAILABLE"
        AssetPackErrorCode.DOWNLOAD_NOT_FOUND -> "ASSET_PACK_MANAGER_ERROR: DOWNLOAD_NOT_FOUND"
        AssetPackErrorCode.INSUFFICIENT_STORAGE -> "ASSET_PACK_MANAGER_ERROR: INSUFFICIENT_STORAGE"
        AssetPackErrorCode.INTERNAL_ERROR -> "ASSET_PACK_MANAGER_ERROR: INTERNAL_ERROR"
        AssetPackErrorCode.INVALID_REQUEST -> "ASSET_PACK_MANAGER_ERROR: INVALID_REQUEST"
        AssetPackErrorCode.NETWORK_ERROR -> "ASSET_PACK_MANAGER_ERROR: NETWORK_ERROR"
        AssetPackErrorCode.NO_ERROR -> "ASSET_PACK_MANAGER_ERROR: NO_ERROR"
        AssetPackErrorCode.PACK_UNAVAILABLE -> "ASSET_PACK_MANAGER_ERROR: PACK_UNAVAILABLE"
        -11 -> "ASSET_PACK_MANAGER_ERROR: PLAY_STORE_NOT_FOUND"
        else -> "ASSET_PACK_MANAGER_ERROR: UNKNOWN"
    }
    
}