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
import android.os.Looper
import android.view.KeyEvent
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.SeekBar
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.view.ContextThemeWrapper
import com.bumptech.glide.Glide
import com.lacour.vincent.hypnosedetente.R
import com.lacour.vincent.hypnosedetente.adapter.MusicPlayer
import com.lacour.vincent.hypnosedetente.model.Sample
import com.lacour.vincent.hypnosedetente.service.AnalyticsService
import com.lacour.vincent.hypnosedetente.service.ForegroundService
import com.lacour.vincent.hypnosedetente.utils.AppUtils
import kotlinx.android.synthetic.main.activity_audio_player.*
import java.util.*

class AudioPlayer : AppCompatActivity() {

    private lateinit var appUtils: AppUtils
    private lateinit var progressDialog: Dialog

    private lateinit var musicPlayer: MusicPlayer
    private lateinit var audio: AudioManager
    private val myHandler = Handler(Looper.getMainLooper())

    private lateinit var sample: Sample

    private lateinit var analyticsService: AnalyticsService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_audio_player)
        setSupportActionBar(findViewById(R.id.toolbar_audio_player))

        appUtils = AppUtils(this)
        analyticsService = AnalyticsService(this)
        button_play.setOnClickListener { handlePlayPause() }
        seekbar_avancement.isClickable = false

        try {
            val bundle: Bundle? = intent.extras
            if (bundle != null) sample = bundle.getParcelable("sample")!!
            if (supportActionBar != null) {
                with(supportActionBar!!) {
                    setDisplayHomeAsUpEnabled(true)
                    setDisplayShowHomeEnabled(true)
                    title = sample.fullTitle
                }
            }

            musicPlayer = MusicPlayer(this)
            prepareMusicPlayer(sample.file, sample.url)
            musicPlayer.setOnStateReadyListener { onMusicPlayerStateReady() }
            musicPlayer.setOnStateEndedListener { onMusicPlayerStateEnded() }
            musicPlayer.setOnErrorListener { message -> onMusicsPlayerError(message) }

            audio = getSystemService(Context.AUDIO_SERVICE) as AudioManager
            seekbar_sound.max = audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
            seekbar_sound.progress = audio.getStreamVolume(AudioManager.STREAM_MUSIC)

            if (audio.getStreamVolume(AudioManager.STREAM_MUSIC) == 0) {
                icon_sound.setImageResource(R.drawable.ic_volume_off)
            }

            Glide.with(this).load(sample.thumbnail).into(image_sample)
            analyticsService.logViewSampleEvent(sample.slug)


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
                    if (fromUser && musicPlayer.isPlaying()) {
                        val position = (progress * 1000).toLong()
                        musicPlayer.seekTo(position)
                    }
                }
            })

            progressDialog = createLoadingDialog()
            progressDialog.setCancelable(false)
            progressDialog.show()

        } catch (e: Exception) {
            button_play.isEnabled = false
            showInformationDialog(
                getString(R.string.error_device_title),
                getString(R.string.error_device_content)
            )
            analyticsService.logIncompatibleDevice()
        }

    }

    private fun prepareMusicPlayer(file: String, url: String) {
        val isFileExists = appUtils.isFileExist(file)
        if (isFileExists) {
            musicPlayer.prepareLocalFile(file)
        } else {
            musicPlayer.prepareRemoteFile(url)
        }
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
                handleDownloadClick()
                true
            }
            R.id.action_information -> {
                showInformationDialog(
                    sample.fullTitle,
                    sample.description
                )
                analyticsService.logSampleInformationEvent(sample.slug)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }


    public override fun onDestroy() {
        stopMusicPlayer()
        stopAudioPlayerService()
        myHandler.removeCallbacksAndMessages(null)
        super.onDestroy()
    }

    private fun stopMusicPlayer() {
        musicPlayer.setPause()
        musicPlayer.onDestroy()
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
        val isPlaying = musicPlayer.isPlaying()
        return if (isPlaying) handlePause() else handlePlay()
    }

    private fun handlePlay() {
        musicPlayer.setPlay()
        val position: Int = musicPlayer.getCurrentPosition().toInt()
        val duration: Int = musicPlayer.getDuration().toInt()
        text_current_time.text = stringForTime(position)
        text_total_time.text = stringForTime(duration)
        button_play.setImageResource(android.R.drawable.ic_media_pause)
        seekbar_avancement.progress = position / 1000
        startAudioPlayerService()
        text_current_time.visibility = View.VISIBLE
        text_total_time.visibility = View.VISIBLE
        myHandler.postDelayed(updateSongTime, 100)
    }

    private fun handlePause() {
        musicPlayer.setPause()
        button_play.setImageResource(android.R.drawable.ic_media_play)
        stopAudioPlayerService()
    }

    private val updateSongTime = object : Runnable {
        override fun run() {
            val position: Int = musicPlayer.getCurrentPosition().toInt()
            text_current_time.text = stringForTime(position)
            seekbar_avancement.progress = position / 1000
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

    private fun onMusicPlayerStateReady() {
        val max: Int = musicPlayer.getDuration().toInt() / 1000
        seekbar_avancement.max = max
        progressDialog.dismiss()
    }

    private fun onMusicPlayerStateEnded() {
        if (!musicPlayer.isPlaying()) return
        musicPlayer.setPause()
        musicPlayer.seekTo(0)
        button_play.setImageResource(android.R.drawable.ic_media_play)
        stopAudioPlayerService()
        analyticsService.logSampleEndEvent(sample.slug)
    }

    private fun onMusicsPlayerError(message: String) {
        stopAudioPlayerService()
        button_play.isEnabled = false
        progressDialog.dismiss()
        showInformationDialog(
            getString(R.string.error_player_title),
            getString(R.string.error_player_content)
        )
        analyticsService.logErrorSample(sample.slug, message)
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean = when (keyCode) {
        KeyEvent.KEYCODE_BACK -> {
            finish()
            this@AudioPlayer.overridePendingTransition(
                R.anim.anim_slide_in_right,
                R.anim.anim_slide_out_right
            )
            true
        }
        KeyEvent.KEYCODE_VOLUME_UP -> {
            audio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_RAISE, 0)
            seekbar_sound.progress = audio.getStreamVolume(AudioManager.STREAM_MUSIC)
            true
        }
        KeyEvent.KEYCODE_VOLUME_DOWN -> {
            audio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_LOWER, 0)
            seekbar_sound.progress = audio.getStreamVolume(AudioManager.STREAM_MUSIC)
            true
        }
        else -> super.onKeyDown(keyCode, event)
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

    private fun handleDownloadClick() {
        val isFileAlreadyDownloaded = appUtils.isFileExist(sample.file)
        if (isFileAlreadyDownloaded) {
            showDownloadDeleteDialog(
                getString(R.string.download_title),
                getString(R.string.download_content_already)
            )
        } else {
            showDownloadDialog(
                getString(R.string.download_title),
                getString(R.string.download_content, sample.size)
            )
        }
    }

    private fun makeDownloadRequest(downloadUri: Uri, name: String, fileName: String) {
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
            analyticsService.logDownloadSampleEvent(sample.slug)
        } catch (e: IllegalStateException) {
            Toast.makeText(
                this@AudioPlayer,
                getString(R.string.download_unavailable),
                Toast.LENGTH_LONG
            ).show()
            analyticsService.logErrorDownloadSample(sample.slug)
        }
    }

    private fun createLoadingDialog(): Dialog {
        return AlertDialog.Builder(ContextThemeWrapper(this, R.style.AppTheme_Loading_Dialog))
            .setView(R.layout.loading_layout).create()
    }

    private fun showInformationDialog(title: String, message: String) {
        val builder = AlertDialog.Builder(ContextThemeWrapper(this, R.style.AppTheme_Dialog))
        with(builder) {
            setTitle(title)
            setMessage(message)
            setPositiveButton(getString(R.string.information_yes)) { _, _ -> }
            show()
        }
    }

    private fun showDownloadDialog(title: String, message: String) {
        val builder = AlertDialog.Builder(ContextThemeWrapper(this, R.style.AppTheme_Dialog))
        with(builder) {
            setTitle(title)
            setMessage(message)
            setPositiveButton(getString(R.string.download_yes)) { _, _ ->
                makeDownloadRequest(
                    Uri.parse(
                        sample.url
                    ), sample.title, sample.file
                )
            }
            setNegativeButton(getString(R.string.download_no)) { _, _ -> }
            show()
        }
    }

    private fun showDownloadDeleteDialog(title: String, message: String) {
        val builder = AlertDialog.Builder(ContextThemeWrapper(this, R.style.AppTheme_Dialog))
        with(builder) {
            setTitle(title)
            setMessage(message)
            setPositiveButton(getString(R.string.download_delete_no)) { _, _ -> }
            setNegativeButton(getString(R.string.download_delete_yes)) { _, _ ->
                val isSuccessfulDeleted: Boolean = appUtils.deleteFile(sample.file)
                val information: String =
                    if (isSuccessfulDeleted) getString(R.string.file_delete_success) else getString(
                        R.string.file_delete_failure
                    )
                Toast.makeText(this@AudioPlayer, information, Toast.LENGTH_SHORT).show()
                analyticsService.logDeleteSampleEvent(sample.slug)
            }
            show()
        }
    }


}