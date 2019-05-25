package com.lacour.vincent.hypnosedetente.screen;

import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.net.Uri;

import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import com.flyco.animation.BounceEnter.BounceTopEnter;
import com.flyco.animation.SlideExit.SlideBottomExit;
import com.flyco.dialog.listener.OnBtnClickL;
import com.flyco.dialog.widget.NormalDialog;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;
import com.lacour.vincent.hypnosedetente.data.Sample;
import com.lacour.vincent.hypnosedetente.service.ForegroundService;
import com.lacour.vincent.hypnosedetente.R;
import com.bumptech.glide.Glide;
import com.lacour.vincent.hypnosedetente.utils.AppUtils;

import java.io.File;
import java.util.Formatter;
import java.util.Locale;

import de.hdodenhof.circleimageview.CircleImageView;


public class AudioPlayer extends AppCompatActivity {

    ImageButton btn_retour = null;
    TextView title_toolbar = null;
    ImageButton btn_info = null;
    ImageButton btn_download = null;

    // PlayAudio widgets
    FloatingActionButton btn_play_pause = null;
    CircleImageView picture_audio = null;
    private ProgressDialog ringProgressDialog;

    // Variables
    boolean isPlaying = false;
    boolean firstPlaying = true;

    // Audio Player
    private double startTime = 0;
    private double finalTime = 0;
    private Handler myHandler = new Handler();
    private SeekBar seekBarPlayer;
    private SeekBar seekBarVolume;
    private ImageView pictureVolume;
    private TextView textCurrentTime;
    private TextView textFinalTime;

    private AudioManager audio;
    private SimpleExoPlayer exoPlayer;
    private ComponentListener componentListener;
    private Sample sample;

    private AppUtils appUtils;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_audio_player);

        appUtils = new AppUtils(this);

        btn_retour = findViewById(R.id.btn_back_ecoute);
        btn_retour.setOnClickListener(view -> {
            finish();
            AudioPlayer.this.overridePendingTransition(R.anim.anim_slide_in_right,
                    R.anim.anim_slide_out_right);
        });

        btn_info = findViewById(R.id.toolbar_btn_information);
        btn_info.setOnClickListener(view -> {
            showFlycoInformationDialog(getString(R.string.TitleInformation), sample.getDescription());
        });

        btn_download = findViewById(R.id.toolbar_btn_download);
        btn_download.setOnClickListener(view -> {
            if (appUtils.isFileExist(sample.getFile())) {
                showFlycoDownloadInformationDialog(getString(R.string.TitleDialogDownload), getString(R.string.TextDialogAlreadyDownload));
                return;
            }
            String textDialogDownload = getString(R.string.TextDialogDownload) + "\n\n";
            textDialogDownload += String.valueOf(sample.getSize()) + " Mo d'espace libre nécessaire.";
            showFlycoDownloadDialog(getString(R.string.TitleDialogDownload), textDialogDownload);
        });

        btn_play_pause = findViewById(R.id.button_play);
        btn_play_pause.setOnClickListener(view -> handlePlayPauseClick());

        title_toolbar = findViewById(R.id.toolbar_title_ecoute);
        picture_audio = findViewById(R.id.picture_audio);
        seekBarPlayer = findViewById(R.id.seekbar_avancement);
        textCurrentTime = findViewById(R.id.textViewCurrentTime);
        textFinalTime = findViewById(R.id.textViewTotalTime);
        seekBarVolume = findViewById(R.id.seekbar_sound);
        pictureVolume = findViewById(R.id.imageViewSound);

        try {
            Bundle bundle = getIntent().getExtras();
            if (bundle != null) sample = bundle.getParcelable("sample");
            if (sample != null) title_toolbar.setText(sample.getTitle());
            Glide.with(this).load(sample.getThumbnail()).into(picture_audio);
            prepareAudioPlayer(sample.getFile(), sample.getUrl());

            ringProgressDialog = new ProgressDialog(this, R.style.NewDialog);
            ringProgressDialog.setTitle(getString(R.string.loadingTitle));
            ringProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
            ringProgressDialog.setIndeterminate(true);
            ringProgressDialog.setProgressNumberFormat(null);
            ringProgressDialog.setProgressPercentFormat(null);
            ringProgressDialog.setCancelable(false);
            ringProgressDialog.show();

            audio = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
            seekBarVolume.setMax(audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC));
            seekBarVolume.setProgress(audio.getStreamVolume(AudioManager.STREAM_MUSIC));

            if (audio.getStreamVolume(AudioManager.STREAM_MUSIC) == 0) {
                pictureVolume.setImageResource(R.drawable.ic_volume_off);
            }

            seekBarVolume.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
                @Override
                public void onStopTrackingTouch(SeekBar seekBar) {
                }

                @Override
                public void onStartTrackingTouch(SeekBar seekBar) {
                }

                @Override
                public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                    audio.setStreamVolume(AudioManager.STREAM_MUSIC, progress, 0);
                    if (progress == 0) {
                        Glide.with(AudioPlayer.this).load(R.drawable.ic_volume_off).into(pictureVolume);
                    } else {
                        Glide.with(AudioPlayer.this).load(R.drawable.ic_volume_up).into(pictureVolume);
                    }
                }
            });

            seekBarPlayer.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
                @Override
                public void onStopTrackingTouch(SeekBar seekBar) {
                }

                @Override
                public void onStartTrackingTouch(SeekBar seekBar) {
                }

                @Override
                public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                    if (exoPlayer != null && fromUser) {
                        if (exoPlayer.getPlayWhenReady()) {
                            exoPlayer.seekTo(progress * 1000);
                        }
                    }
                }
            });
        } catch (Exception e) {
            btn_play_pause.setEnabled(false);
            btn_download.setEnabled(false);
            btn_info.setEnabled(false);
            showFlycoInformationDialog(getString(R.string.deviceErrorTitle), getString(R.string.deviceErrorText));
        }
    }

    private void prepareAudioPlayer(String audioName, String audioURL) {
        String audioSrc;
        TrackSelector trackSelector = new DefaultTrackSelector();
        exoPlayer = ExoPlayerFactory.newSimpleInstance(this, trackSelector);
        DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(this,
                Util.getUserAgent(this, "hypnosedetente"), null);
        if (appUtils.isFileExist(audioName)) {
            File file = new File(getExternalFilesDir(getFilesDir().getAbsolutePath()), audioName);
            audioSrc = file.getAbsolutePath();
        } else {
            audioSrc = audioURL;
        }
        MediaSource audioSource = new ExtractorMediaSource.Factory(dataSourceFactory)
                .createMediaSource(Uri.parse(audioSrc));
        componentListener = new ComponentListener();
        exoPlayer.addListener(componentListener);
        exoPlayer.prepare(audioSource);
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        StopSound();
        stopForeGroundService();
        appUtils.setStayAwakeLock(false);
        myHandler.removeCallbacksAndMessages(null);
    }

    private void StopSound() {
        if (exoPlayer != null) {
            exoPlayer.setPlayWhenReady(false);
            exoPlayer.removeListener(componentListener);
            exoPlayer.release();
            exoPlayer = null;
        }
    }

    private void startForeGroundService() {
        Intent intent = new Intent(AudioPlayer.this, ForegroundService.class);
        intent.putExtra("SELECTED_SOUND", sample.getTitle());
        intent.setAction(ForegroundService.ACTION_START_FOREGROUND_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            this.startForegroundService(intent);
            return;
        }
        this.startService(intent);
    }

    private void stopForeGroundService() {
        Intent intent = new Intent(AudioPlayer.this, ForegroundService.class);
        intent.setAction(ForegroundService.ACTION_STOP_FOREGROUND_SERVICE);
        this.stopService(intent);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            finish();
            AudioPlayer.this.overridePendingTransition(R.anim.anim_slide_in_right,
                    R.anim.anim_slide_out_right);
        }
        if ((keyCode == KeyEvent.KEYCODE_VOLUME_UP)) {
            audio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_RAISE, 0);
            seekBarVolume.setProgress(audio.getStreamVolume(AudioManager.STREAM_MUSIC));
        }
        if ((keyCode == KeyEvent.KEYCODE_VOLUME_DOWN)) {
            audio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_LOWER, 0);
            seekBarVolume.setProgress(audio.getStreamVolume(AudioManager.STREAM_MUSIC));
        }
        return true;
    }

    private void handlePlayPauseClick() {
        boolean canPlaySample = appUtils.hasInternet() || appUtils.isFileExist(sample.getFile());
        if (!canPlaySample) {
            Toast.makeText(AudioPlayer.this, getString(R.string.noInternetText), Toast.LENGTH_LONG).show();
            return;
        }
        if (firstPlaying) {
            appUtils.setStayAwakeLock(true);
            firstPlaying = false;
        }
        if (isPlaying) {
            handlePause();
            return;
        }
        handlePlay();
    }

    private void handlePause() {
        if (!isPlaying) return;
        isPlaying = false;
        btn_play_pause.setImageResource(android.R.drawable.ic_media_play);
        exoPlayer.setPlayWhenReady(false);
        stopForeGroundService();
    }

    private void handlePlay() {
        if (isPlaying) return;
        isPlaying = true;
        btn_play_pause.setImageResource(android.R.drawable.ic_media_pause);
        exoPlayer.setPlayWhenReady(true); // PLAY
        finalTime = exoPlayer.getDuration();
        startTime = exoPlayer.getCurrentPosition();
        String textTimeFinal = stringForTime((int) finalTime);
        String textTimeCurrent = stringForTime((int) startTime);
        textFinalTime.setText(textTimeFinal);
        textCurrentTime.setText(textTimeCurrent);
        textFinalTime.setVisibility(View.VISIBLE);
        textCurrentTime.setVisibility(View.VISIBLE);
        int mCurrentPosition = (int) exoPlayer.getCurrentPosition() / 1000;
        seekBarPlayer.setProgress(mCurrentPosition);
        myHandler.postDelayed(UpdateSongTime, 100);
        startForeGroundService();
    }

    private Runnable UpdateSongTime = new Runnable() {
        public void run() {
            startTime = exoPlayer.getCurrentPosition();
            String textTime = stringForTime((int) startTime);
            textCurrentTime.setText(textTime);
            int mCurrentPosition = (int) exoPlayer.getCurrentPosition() / 1000;
            seekBarPlayer.setProgress(mCurrentPosition);
            myHandler.postDelayed(this, 100);
        }
    };

    private String stringForTime(int timeMs) {
        StringBuilder mFormatBuilder;
        Formatter mFormatter;
        mFormatBuilder = new StringBuilder();
        mFormatter = new Formatter(mFormatBuilder, Locale.getDefault());
        int totalSeconds = timeMs / 1000;

        int seconds = totalSeconds % 60;
        int minutes = (totalSeconds / 60) % 60;
        int hours = totalSeconds / 3600;

        mFormatBuilder.setLength(0);
        if (hours > 0) {
            return mFormatter.format("%d:%02d:%02d", hours, minutes, seconds).toString();
        } else {
            return mFormatter.format("%02d:%02d", minutes, seconds).toString();
        }
    }

    private void makeDownloadRequest(Uri downloadUri, String name, String fileName) {
        if (appUtils.isFileExist(fileName)) {
            Toast.makeText(AudioPlayer.this, getString(R.string.TextFileAlreadyExist), Toast.LENGTH_LONG).show();
            return;
        }
        try {
            DownloadManager.Request request = new DownloadManager.Request(downloadUri);
            request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI | DownloadManager.Request.NETWORK_MOBILE);
            request.setAllowedOverRoaming(false);
            request.setTitle(getString(R.string.TitleDownloadNotif));
            request.setDescription(name);
            request.setVisibleInDownloadsUi(true);
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
            request.setDestinationInExternalFilesDir(this, getFilesDir().getAbsolutePath(), fileName);

            DownloadManager manager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
            manager.enqueue(request);
        } catch (IllegalStateException e) {
            Toast.makeText(AudioPlayer.this, getString(R.string.TextExceptionDownload), Toast.LENGTH_LONG).show();
        }
    }


    /**
     * Flyco One Button Dialog
     *
     * @param title   : title of the dialog
     * @param message : text of the dialog
     */
    private void showFlycoInformationDialog(String title, String message) {
        final NormalDialog dialog = new NormalDialog(this);
        dialog.isTitleShow(true)//
                .btnNum(1)
                .title(title)
                .titleTextSize(17)
                .content(message)//
                .contentTextSize(14)
                .btnText(getString(R.string.agreeDialogText))//
                .showAnim(new BounceTopEnter())//
                .dismissAnim(new SlideBottomExit())//
                .show();

        dialog.setOnBtnClickL(
                new OnBtnClickL() { //Simple click on "OK"
                    @Override
                    public void onBtnClick() {
                        dialog.dismiss();
                    }
                }
        );
    }


    private void showFlycoDownloadDialog(String title, String message) {
        final NormalDialog dialog = new NormalDialog(this);
        dialog.isTitleShow(true)//
                .btnNum(2)
                .title(title)
                .titleTextSize(18)
                .content(message)
                .contentTextSize(15)
                .btnText(getString(R.string.TextDownloadNo), getString(R.string.TextDownloadYes))
                .showAnim(new BounceTopEnter())//
                .dismissAnim(new SlideBottomExit())//
                .show();

        dialog.setOnBtnClickL(
                new OnBtnClickL() {//left btn click listener = Negative button
                    @Override
                    public void onBtnClick() {
                        dialog.dismiss();
                    }
                },
                new OnBtnClickL() {//right btn click listener = Positive button
                    @Override
                    public void onBtnClick() {
                        makeDownloadRequest(Uri.parse(sample.getUrl()), title_toolbar.getText().toString(), sample.getFile());
                        dialog.dismiss();
                    }
                }
        );
    }

    private void showFlycoDownloadInformationDialog(String title, String message) {
        final NormalDialog dialog = new NormalDialog(this);
        dialog.isTitleShow(true)//
                .btnNum(2)
                .title(title)
                .titleTextSize(18)
                .content(message)
                .contentTextSize(15)
                .btnText(getString(R.string.TextDownloadDelete), getString(R.string.agreeDialogText))
                .showAnim(new BounceTopEnter())//
                .dismissAnim(new SlideBottomExit())//
                .show();

        dialog.setOnBtnClickL(
                new OnBtnClickL() {//left btn click listener = Negative button
                    @Override
                    public void onBtnClick() {
                        dialog.dismiss();
                        if (appUtils.deleteFile(sample.getFile())) {
                            Toast.makeText(AudioPlayer.this, getString(R.string.TextFileDeleteDPositive), Toast.LENGTH_SHORT).show();
                            return;
                        }
                        Toast.makeText(AudioPlayer.this, getString(R.string.TextFileDeleteDNegative), Toast.LENGTH_SHORT).show();
                    }
                },
                new OnBtnClickL() {//right btn click listener = Positive button
                    @Override
                    public void onBtnClick() {
                        dialog.dismiss();
                    }
                }
        );
    }

    private class ComponentListener extends Player.DefaultEventListener {

        @Override
        public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
            //String stateString;
            switch (playbackState) {
                case Player.STATE_IDLE:
                    //stateString = "ExoPlayer.STATE_IDLE      -";
                    break;
                case Player.STATE_BUFFERING:
                    //stateString = "ExoPlayer.STATE_BUFFERING -";
                    break;
                case Player.STATE_READY:
                    //stateString = "ExoPlayer.STATE_READY     -";
                    ringProgressDialog.dismiss();
                    seekBarPlayer.setMax(0);
                    seekBarPlayer.setMax((int) exoPlayer.getDuration() / 1000);
                    break;
                case Player.STATE_ENDED:
                    //stateString = "ExoPlayer.STATE_ENDED     -";
                    btn_play_pause.setImageResource(android.R.drawable.ic_media_play);
                    exoPlayer.setPlayWhenReady(false); // PAUSE
                    isPlaying = false;
                    exoPlayer.seekTo(0);
                    stopForeGroundService();
                    break;
                default:
                    //stateString = "UNKNOWN_STATE             -";
                    break;
            }
            //Log.i("Info", "changed state to " + stateString + " playWhenReady: " + playWhenReady);
        }

        @Override
        public void onPlayerError(ExoPlaybackException error) {
            ringProgressDialog.dismiss();
            showFlycoInformationDialog(getString(R.string.playerErrorTitle), getString(R.string.playerErrorText));
            btn_play_pause.setEnabled(false);
            stopForeGroundService();
        }
    }

}