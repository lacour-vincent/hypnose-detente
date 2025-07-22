package expo.modules.exoplayer

import android.content.Context
import android.os.Bundle
import androidx.core.net.toUri
import androidx.core.os.bundleOf
import androidx.media3.common.MediaItem
import androidx.media3.common.PlaybackException
import androidx.media3.exoplayer.ExoPlayer
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoExoPlayerModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoExoPlayer")

        Function("prepare") { file: String ->
            val media = MediaItem.fromUri(file.toUri())
            player.setMediaItem(media)
            player.prepare()
        }

        Function("release") {
            player.release()
        }

        Function("setPlay") {
            player.play()
        }

        Function("setPause") {
            player.pause()
        }

        Function("isPlaying") {
            return@Function player.isPlaying
        }

        Function("seekTo") { position: Long ->
            player.seekTo(position)
        }

        Function("getCurrentPosition") {
            return@Function player.currentPosition
        }

        Function("getDuration") {
            return@Function player.duration
        }

        Events("onPlaybackStateChanged")

        Events("onPlayerError")

        OnStartObserving {
            player.addListener(listener)
        }

        OnStopObserving {
            player.removeListener(listener)
        }
    }

    private val ctx get(): Context = requireNotNull(appContext.reactContext)
    private val player get() = requireNotNull(ExoPlayer.Builder(ctx).build())
    private val listener = ExpoExoPlayerListener(this)

    fun onPlaybackStateChangedAsBundle(state: Int): Bundle {
        return bundleOf("state" to state)
    }

    fun onPlayerErrorAsBundle(error: PlaybackException): Bundle {
        return bundleOf("error" to error)
    }
}
