package com.lacour.vincent.hypnosedetente.screen

import android.app.Dialog
import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.view.KeyEvent
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.SeekBar
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.view.ContextThemeWrapper
import androidx.core.content.ContextCompat
import com.bumptech.glide.Glide
import com.flyco.animation.BounceEnter.BounceTopEnter
import com.flyco.animation.SlideExit.SlideBottomExit
import com.flyco.dialog.listener.OnBtnClickL
import com.flyco.dialog.widget.NormalDialog
import com.google.android.exoplayer2.ExoPlaybackException
import com.google.android.exoplayer2.ExoPlayerFactory
import com.google.android.exoplayer2.Player
import com.google.android.exoplayer2.SimpleExoPlayer
import com.google.android.exoplayer2.source.ExtractorMediaSource
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory
import com.google.android.exoplayer2.util.Util
import com.lacour.vincent.hypnosedetente.R
import com.lacour.vincent.hypnosedetente.data.Sample
import com.lacour.vincent.hypnosedetente.service.ForegroundService
import com.lacour.vincent.hypnosedetente.utils.AppUtils
import kotlinx.android.synthetic.main.activity_audio_player.*
import java.io.File
import java.util.*

class AudioPlayer : AppCompatActivity() {

    private lateinit var appUtils: AppUtils

    private var isPlaying = false
    private var firstPlaying = true

    private lateinit var progressDialog: Dialog

    private lateinit var exoPlayer: SimpleExoPlayer
    private lateinit var audio: AudioManager
    private val myHandler = Handler()
    private lateinit var componentListener: ComponentListener

    private lateinit var sample: Sample


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_audio_player)
        setSupportActionBar(findViewById(R.id.toolbar_audio_player))

        appUtils = AppUtils(this)

        button_play.setOnClickListener { handlePlayPause() }
        seekbar_avancement.isClickable = false

        try {
            val bundle: Bundle? = intent.extras
            if (bundle != null) sample = bundle.getParcelable("sample")!!
            if (supportActionBar != null) {
                with(supportActionBar!!) {
                    setDisplayHomeAsUpEnabled(true)
                    setDisplayShowHomeEnabled(true)
                    title = sample.title
                }
            }

            Glide.with(this).load(sample.thumbnail).into(image_sample)
            prepareAudioPlayer(sample.file, sample.url)

            audio = getSystemService(Context.AUDIO_SERVICE) as AudioManager
            seekbar_sound.max = audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
            seekbar_sound.progress = audio.getStreamVolume(AudioManager.STREAM_MUSIC)

            if (audio.getStreamVolume(AudioManager.STREAM_MUSIC) == 0) {
                icon_sound.setImageResource(R.drawable.ic_volume_off)
            }

            seekbar_sound.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                override fun onStopTrackingTouch(seekBar: SeekBar) {}
                override fun onStartTrackingTouch(seekBar: SeekBar) {}
                override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
                    audio.setStreamVolume(AudioManager.STREAM_MUSIC, progress, 0)
                    if (progress == 0) {
                        icon_sound.setImageResource(R.drawable.ic_volume_off)
                    } else {
                        icon_sound.setImageResource(R.drawable.ic_volume_up)
                    }
                }
            })

            seekbar_avancement.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                override fun onStopTrackingTouch(seekBar: SeekBar) {}
                override fun onStartTrackingTouch(seekBar: SeekBar) {}
                override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
                    if (fromUser && exoPlayer.playWhenReady) {
                        exoPlayer.seekTo((progress * 1000).toLong())
                    }
                }
            })

            progressDialog = createLoadingDialog()
            progressDialog.setCancelable(false)
            progressDialog.show()

        } catch (e: Exception) {
            button_play.isEnabled = false
            showFlycoInformationDialog(
                getString(R.string.error_device_title),
                getString(R.string.error_device_content)
            )
        }

    }

    private fun prepareAudioPlayer(audioName: String, audioURL: String) {

        val trackSelector = DefaultTrackSelector()
        exoPlayer = ExoPlayerFactory.newSimpleInstance(this, trackSelector)
        val dataSourceFactory = DefaultDataSourceFactory(
            this,
            Util.getUserAgent(this, "com.lacour.vincent.hypnose_detente"), null
        )

        val audioSrc: String = if (!appUtils.isFileExist(audioName)) {
            audioURL
        } else {
            File(getExternalFilesDir(filesDir.absolutePath), audioName).absolutePath
        }
        val audioSource = ExtractorMediaSource.Factory(dataSourceFactory)
            .createMediaSource(Uri.parse(audioSrc))
        componentListener = ComponentListener()
        exoPlayer.addListener(componentListener)
        exoPlayer.prepare(audioSource)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        val inflater = menuInflater
        inflater.inflate(R.menu.toolbar_audio_player_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean =
        when (item.itemId) {
            android.R.id.home -> {
                finish()
                this@AudioPlayer.overridePendingTransition(
                    R.anim.anim_slide_in_right,
                    R.anim.anim_slide_out_right
                )
                true
            }
            R.id.action_download -> {
                if (appUtils.isFileExist(sample.file)) {
                    showFlycoDownloadDeleteDialog(
                        getString(R.string.download_title),
                        getString(R.string.download_content_already)
                    )
                } else {
                    showFlycoDownloadDialog(
                        getString(R.string.download_title),
                        getString(R.string.download_content, sample.size)
                    )
                }
                true
            }
            R.id.action_information -> {
                showFlycoInformationDialog(
                    getString(R.string.information_title),
                    sample.description
                )
                true
            }
            else -> super.onOptionsItemSelected(item)
        }


    public override fun onDestroy() {
        super.onDestroy()
        stopSound()
        stopAudioPlayerService()
        appUtils.setStayAwakeLock(false)
        myHandler.removeCallbacksAndMessages(null)
    }

    private fun stopSound() {
        exoPlayer.playWhenReady = false
        exoPlayer.removeListener(componentListener)
        exoPlayer.release()
    }

    private fun handlePlayPause() {
        val canPlaySample = appUtils.hasInternet() || appUtils.isFileExist(sample.file)
        if (!canPlaySample) {
            Toast.makeText(
                this@AudioPlayer,
                getString(R.string.error_internet_content),
                Toast.LENGTH_LONG
            ).show()
            return
        }
        if (firstPlaying) {
            appUtils.setStayAwakeLock(true)
            firstPlaying = false
        }
        if (isPlaying) {
            handlePause()
        } else {
            handlePlay()
        }
    }

    private fun handlePlay() {
        if (isPlaying) return
        isPlaying = true
        startAudioPlayerService()
        exoPlayer.playWhenReady = true
        text_current_time.text = stringForTime(exoPlayer.currentPosition.toInt())
        text_total_time.text = stringForTime(exoPlayer.duration.toInt())
        text_current_time.visibility = View.VISIBLE
        text_total_time.visibility = View.VISIBLE
        button_play.setImageResource(android.R.drawable.ic_media_pause)
        seekbar_avancement.progress = exoPlayer.currentPosition.toInt() / 1000
        myHandler.postDelayed(updateSongTime, 100)


    }

    private fun handlePause() {
        if (!isPlaying) return
        isPlaying = false
        button_play!!.setImageResource(android.R.drawable.ic_media_play)
        stopAudioPlayerService()
        exoPlayer.playWhenReady = false
    }

    private val updateSongTime = object : Runnable {
        override fun run() {
            text_current_time.text = stringForTime(exoPlayer.currentPosition.toInt())
            seekbar_avancement.progress = exoPlayer.currentPosition.toInt() / 1000
            myHandler.postDelayed(this, 100)
        }
    }

    private fun stringForTime(timeMs: Int): String {
        val mFormatBuilder = StringBuilder()
        val mFormatter = Formatter(mFormatBuilder, Locale.getDefault())
        val totalSeconds = timeMs / 1000
        val seconds = totalSeconds % 60
        val minutes = totalSeconds / 60 % 60
        val hours = totalSeconds / 3600
        mFormatBuilder.setLength(0)
        return if (hours > 0) {
            mFormatter.format("%d:%02d:%02d", hours, minutes, seconds).toString()
        } else {
            mFormatter.format("%02d:%02d", minutes, seconds).toString()
        }
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            finish()
            this@AudioPlayer.overridePendingTransition(
                R.anim.anim_slide_in_right,
                R.anim.anim_slide_out_right
            )
        }
        if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
            audio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_RAISE, 0)
            seekbar_sound.progress = audio.getStreamVolume(AudioManager.STREAM_MUSIC)
        }
        if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            audio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_LOWER, 0)
            seekbar_sound.progress = audio.getStreamVolume(AudioManager.STREAM_MUSIC)
        }
        return true
    }


    private fun startAudioPlayerService() {
        val intent = Intent(this@AudioPlayer, ForegroundService::class.java)
        intent.putExtra("SELECTED_SOUND", sample.title)
        intent.action = ForegroundService.ACTION_START_FOREGROUND_SERVICE
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            this.startForegroundService(intent)
            return
        }
        this.startService(intent)
    }

    private fun stopAudioPlayerService() {
        val intent = Intent(this@AudioPlayer, ForegroundService::class.java)
        intent.action = ForegroundService.ACTION_STOP_FOREGROUND_SERVICE
        this.stopService(intent)
    }


    private fun makeDownloadRequest(downloadUri: Uri, name: String, fileName: String) {
        if (appUtils.isFileExist(fileName)) {
            Toast.makeText(
                this@AudioPlayer,
                getString(R.string.file_already_exist),
                Toast.LENGTH_LONG
            ).show()
            return
        }
        try {
            val request = DownloadManager.Request(downloadUri)
            request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI or DownloadManager.Request.NETWORK_MOBILE)
            request.setAllowedOverRoaming(false)
            request.setTitle(getString(R.string.download_notification_content))
            request.setDescription(name)
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE)
            request.setDestinationInExternalFilesDir(this, filesDir.absolutePath, fileName)

            val manager = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            manager.enqueue(request)
        } catch (e: IllegalStateException) {
            Toast.makeText(
                this@AudioPlayer,
                getString(R.string.download_unavailable),
                Toast.LENGTH_LONG
            ).show()
        }

    }

    private fun createLoadingDialog(): Dialog {
        val builder =
            AlertDialog.Builder(ContextThemeWrapper(this, R.style.AppTheme_Loading_Dialog))
        with(builder) {
            setView(R.layout.loading_layout)
        }
        return builder.create()
    }

    private fun showFlycoInformationDialog(title: String, message: String) {
        val dialog = NormalDialog(this)
        dialog.isTitleShow(true)
            .btnNum(1)
            .title(title)
            .titleTextSize(17f)
            .content(message)
            .contentTextSize(14f)
            .btnText(getString(R.string.information_yes))
            .titleTextColor(ContextCompat.getColor(this, R.color.colorDialogTitle))
            .btnTextColor(ContextCompat.getColor(this, R.color.colorDialogButtonText))
            .contentTextColor(ContextCompat.getColor(this, R.color.colorDialogContent))
            .bgColor(ContextCompat.getColor(this, R.color.colorDialogBackground))
            .btnPressColor(ContextCompat.getColor(this, R.color.colorDialogButtonPressed))
            .showAnim(BounceTopEnter())
            .dismissAnim(SlideBottomExit())
            .show()

        dialog.setOnBtnClickL(OnBtnClickL { dialog.dismiss() })
    }


    private fun showFlycoDownloadDialog(title: String, message: String) {
        val dialog = NormalDialog(this)
        dialog.isTitleShow(true)
            .btnNum(2)
            .title(title)
            .titleTextSize(18f)
            .content(message)
            .contentTextSize(15f)
            .btnText(getString(R.string.download_no), getString(R.string.download_yes))
            .titleTextColor(ContextCompat.getColor(this, R.color.colorDialogTitle))
            .btnTextColor(
                ContextCompat.getColor(this, R.color.colorDialogButtonText),
                ContextCompat.getColor(this, R.color.colorDialogButtonText)
            )
            .contentTextColor(ContextCompat.getColor(this, R.color.colorDialogContent))
            .bgColor(ContextCompat.getColor(this, R.color.colorDialogBackground))
            .btnPressColor(ContextCompat.getColor(this, R.color.colorDialogButtonPressed))
            .showAnim(BounceTopEnter())
            .dismissAnim(SlideBottomExit())
            .show()

        dialog.setOnBtnClickL(
            OnBtnClickL { dialog.dismiss() },
            OnBtnClickL {
                makeDownloadRequest(Uri.parse(sample.url), sample.title, sample.file)
                dialog.dismiss()
            })
    }

    private fun showFlycoDownloadDeleteDialog(title: String, message: String) {
        val dialog = NormalDialog(this)
        dialog.isTitleShow(true)
            .btnNum(2)
            .title(title)
            .titleTextSize(18f)
            .content(message)
            .contentTextSize(15f)
            .btnText(
                getString(R.string.download_delete_yes),
                getString(R.string.download_delete_no)
            )
            .titleTextColor(ContextCompat.getColor(this, R.color.colorDialogTitle))
            .btnTextColor(
                ContextCompat.getColor(this, R.color.colorDialogButtonText),
                ContextCompat.getColor(this, R.color.colorDialogButtonText)
            )
            .contentTextColor(ContextCompat.getColor(this, R.color.colorDialogContent))
            .bgColor(ContextCompat.getColor(this, R.color.colorDialogBackground))
            .btnPressColor(ContextCompat.getColor(this, R.color.colorDialogButtonPressed))
            .showAnim(BounceTopEnter())
            .dismissAnim(SlideBottomExit())
            .show()

        dialog.setOnBtnClickL(OnBtnClickL {
            dialog.dismiss()
            val isSuccessfulDeleted: Boolean = appUtils.deleteFile(sample.file)
            val information: String =
                if (isSuccessfulDeleted) getString(R.string.file_delete_success) else getString(R.string.file_delete_failure)
            Toast.makeText(this@AudioPlayer, information, Toast.LENGTH_SHORT).show()
        }, OnBtnClickL { dialog.dismiss() })

    }

    private inner class ComponentListener : Player.EventListener {

        override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {
            when (playbackState) {
                Player.STATE_READY -> {
                    progressDialog.dismiss()
                    seekbar_avancement.max = exoPlayer.duration.toInt() / 1000
                }
                Player.STATE_ENDED -> {
                    button_play.setImageResource(android.R.drawable.ic_media_play)
                    exoPlayer.playWhenReady = false
                    isPlaying = false
                    exoPlayer.seekTo(0)
                    stopAudioPlayerService()
                }
                else -> {
                }
            }
        }

        override fun onPlayerError(error: ExoPlaybackException?) {
            progressDialog.dismiss()
            showFlycoInformationDialog(
                getString(R.string.error_player_title),
                getString(R.string.error_player_content)
            )
            button_play.isEnabled = false
            stopAudioPlayerService()
        }
    }

}