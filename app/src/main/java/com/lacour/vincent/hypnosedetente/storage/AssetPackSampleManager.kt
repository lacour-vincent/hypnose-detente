package com.lacour.vincent.hypnosedetente.storage

import android.content.Context
import com.google.android.play.core.assetpacks.AssetPackManagerFactory
import com.google.android.play.core.assetpacks.AssetPackState
import com.google.android.play.core.assetpacks.AssetPackStateUpdateListener
import com.google.android.play.core.assetpacks.AssetPackStates
import com.google.android.play.core.assetpacks.model.AssetPackStatus
import com.google.android.play.core.tasks.RuntimeExecutionException
import java.io.File
import java.util.*

class AssetPackSampleManager(private val assetPackName: String, ctx: Context) {
    private val assetPackManager = AssetPackManagerFactory.getInstance(ctx)
    private var onAssetStateCompleted: (() -> Unit)? = null
    private var onAssetStateError: ((message: String) -> Unit)? = null

    private val onAssetPackUpdateStateListener: AssetPackStateUpdateListener =
        AssetPackStateUpdateListener { state ->
            when (state.status()) {
                AssetPackStatus.PENDING -> Unit
                AssetPackStatus.DOWNLOADING -> Unit
                AssetPackStatus.TRANSFERRING -> Unit
                AssetPackStatus.FAILED -> onAssetStateError?.invoke("ASSET_PACK_STATUS_FAILED")
                AssetPackStatus.CANCELED -> onAssetStateError?.invoke("ASSET_PACK_STATUS_CANCEL")
                AssetPackStatus.COMPLETED -> onAssetStateCompleted?.invoke()
                AssetPackStatus.WAITING_FOR_WIFI -> Unit
                AssetPackStatus.NOT_INSTALLED -> Unit
                else -> Unit
            }
        }

    init {
        assetPackManager.registerListener(onAssetPackUpdateStateListener)
        this.requestAssetPackState()
    }

    private fun requestAssetPackState() {
        assetPackManager.getPackStates(Collections.singletonList(this.assetPackName))
            .addOnCompleteListener { task ->
                val states: AssetPackStates
                try {
                    states = task.result
                    val state: AssetPackState? = states.packStates()[this.assetPackName]
                    if (state?.status() == AssetPackStatus.COMPLETED) {
                        onAssetStateCompleted?.invoke()
                    } else {
                        assetPackManager.fetch(mutableListOf(this.assetPackName))
                    }
                } catch (e: RuntimeExecutionException) {
                    onAssetStateError?.invoke("ASSET_GET_STATE_ERROR")
                }
            }
    }

    fun removeListener() {
        assetPackManager.unregisterListener(onAssetPackUpdateStateListener)
    }

    fun getAssetPackFile(filename: String): File? {
        val assetPackLocation = assetPackManager.getPackLocation(this.assetPackName) ?: return null
        val assetsFolderPath = assetPackLocation.assetsPath() ?: return null
        return File("$assetsFolderPath/$filename")
    }


    fun setOnAssetStateCompleted(setOnAssetStateCompletedFunction: () -> Unit) {
        onAssetStateCompleted = setOnAssetStateCompletedFunction
    }

    fun setOnAssetStateError(setOnAssetStateErrorFunction: (message: String) -> Unit) {
        onAssetStateError = setOnAssetStateErrorFunction
    }


}