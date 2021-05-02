package com.lacour.vincent.hypnosedetente.adapter

import android.content.Context
import android.net.Uri
import com.google.android.exoplayer2.C.WAKE_MODE_NETWORK
import com.google.android.exoplayer2.ExoPlaybackException
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.Player
import com.google.android.exoplayer2.SimpleExoPlayer
import java.io.File


class MusicPlayer(context: Context) {

    private val ctx: Context = context
    private val player = SimpleExoPlayer.Builder(ctx).build()

    private var onStateReady: (() -> Unit)? = null
    private var onStateEnded: (() -> Unit)? = null
    private var onError: ((message: String) -> Unit)? = null

    private val playerListener = object : Player.EventListener {
        override fun onPlayerError(error: ExoPlaybackException) {
            super.onPlayerError(error)
            val message = when (error.type) {
                ExoPlaybackException.TYPE_SOURCE -> "SOURCE - ${error.sourceException.message}"
                ExoPlaybackException.TYPE_RENDERER -> "RENDERER - ${error.rendererException.message}"
                ExoPlaybackException.TYPE_UNEXPECTED -> "UNEXPECTED - ${error.unexpectedException.message}"
                ExoPlaybackException.TYPE_REMOTE -> "Remote - ${error.message}"
                else -> "UNKNOWN - unknown"
            }
            onError?.invoke(message)
        }

        override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {
            super.onPlaybackStateChanged(playbackState)
            when (playbackState) {
                Player.STATE_READY -> onStateReady?.invoke()
                Player.STATE_ENDED -> onStateEnded?.invoke()
                Player.STATE_BUFFERING -> Unit
                Player.STATE_IDLE -> Unit
            }
        }
    }


    init {
        player.addListener(playerListener)
        player.setWakeMode(WAKE_MODE_NETWORK)
    }

    fun prepareLocalFile(file: File) {
        val mediaUri = Uri.parse(file.absolutePath)
        val mediaItem = MediaItem.fromUri(mediaUri)
        player.setMediaItem(mediaItem)
        player.prepare()
    }

    fun isPlaying(): Boolean {
        return player.playWhenReady
    }

    fun setPlay() {
        player.playWhenReady = true
    }

    fun setPause() {
        player.playWhenReady = false
    }

    fun seekTo(position: Long) {
        return player.seekTo(position)
    }

    fun getCurrentPosition(): Long {
        return player.currentPosition
    }

    fun getDuration(): Long {
        return player.duration
    }

    fun onDestroy() {
        player.removeListener(playerListener)
        player.release()
    }

    fun setOnStateReadyListener(onStateReadyFunction: () -> Unit) {
        onStateReady = onStateReadyFunction
    }

    fun setOnStateEndedListener(onStateEndedFunction: () -> Unit) {
        onStateEnded = onStateEndedFunction
    }

    fun setOnErrorListener(onErrorFunction: (message: String) -> Unit) {
        onError = onErrorFunction
    }

}