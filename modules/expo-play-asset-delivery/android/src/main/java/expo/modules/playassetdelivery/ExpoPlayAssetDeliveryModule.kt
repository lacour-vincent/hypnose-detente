package expo.modules.playassetdelivery

import android.content.Context
import android.os.Bundle
import androidx.core.os.bundleOf
import com.google.android.play.core.assetpacks.AssetPackManager
import com.google.android.play.core.assetpacks.AssetPackManagerFactory
import com.google.android.play.core.assetpacks.AssetPackState
import com.google.android.play.core.ktx.requestPackStates
import expo.modules.kotlin.functions.Coroutine
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoPlayAssetDeliveryModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoPlayAssetDelivery")

        AsyncFunction("getAssetPackStates") Coroutine { packs: List<String> ->
            assetPackManager.requestPackStates(packs).packStates()
                .mapValues { assetPackStateAsBundle(it.value) }
        }

        Function("getAssetPackFileLocation") { pack: String, filename: String ->
            val location = assetPackManager.getPackLocation(pack) ?: return@Function null
            val folder = location.assetsPath() ?: return@Function null
            return@Function "$folder/$filename"
        }

        Function("requestAssetPackFetch") { pack: String ->
            assetPackManager.fetch(listOf(pack))
        }

        Events("onAssetPackStateUpdate")

        OnStartObserving {
            assetPackManager.registerListener(listener)
        }

        OnStopObserving {
            assetPackManager.unregisterListener(listener)
        }

    }

    private val ctx get(): Context = requireNotNull(appContext.reactContext)
    private val assetPackManager
        get(): AssetPackManager =
            requireNotNull(AssetPackManagerFactory.getInstance(ctx))
    private val listener = ExpoAssetPackStateUpdateListener(this)

    fun assetPackStateAsBundle(state: AssetPackState): Bundle {
        return bundleOf(
            "name" to state.name(),
            "status" to state.status(),
            "errorCode" to state.errorCode(),
        )
    }
}
