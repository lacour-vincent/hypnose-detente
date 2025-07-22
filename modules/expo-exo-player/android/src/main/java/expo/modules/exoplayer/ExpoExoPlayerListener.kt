package expo.modules.exoplayer

import androidx.media3.common.PlaybackException
import androidx.media3.common.Player

class ExpoExoPlayerListener(val module: ExpoExoPlayerModule) :
    Player.Listener {
    override fun onPlaybackStateChanged(state: Int) {
        super.onPlaybackStateChanged(state)
        val bundle = module.onPlaybackStateChangedAsBundle(state)
        module.sendEvent("onPlaybackStateChanged", bundle)
    }

    override fun onPlayerError(error: PlaybackException) {
        super.onPlayerError(error)
        val bundle = module.onPlayerErrorAsBundle(error)
        module.sendEvent("onPlayerError", bundle)

    }
}