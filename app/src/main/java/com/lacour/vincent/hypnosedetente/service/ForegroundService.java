package com.lacour.vincent.hypnosedetente.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;

import com.lacour.vincent.hypnosedetente.R;
import com.lacour.vincent.hypnosedetente.screen.AudioPlayer;

public class ForegroundService extends Service {

    public static final String ACTION_START_FOREGROUND_SERVICE = "ACTION_START_FOREGROUND_SERVICE";
    public static final String ACTION_STOP_FOREGROUND_SERVICE = "ACTION_STOP_FOREGROUND_SERVICE";

    final String NOTIFICATION_CHANNEL_ID = "57070615ece54925b49fc1ce1cb965b3";
    final CharSequence NOTIFICATION_CHANNEL_NAME = "COM.LACOUR.VINCENT.HYPNOSEDETENTE";
    final String NOTIFICATION_CHANNEL_DESCRIPTION = "FOREGROUND_SERVICE";
    final int FOREGROUND_SERVICE_ID = 20100;


    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            String action = intent.getAction();
            Bundle bundle = intent.getExtras();
            String selectedSound = "";
            if (bundle != null) {
                selectedSound = bundle.getString("SELECTED_SOUND");
            }
            if (action != null) {
                switch (action) {
                    case ACTION_START_FOREGROUND_SERVICE:
                        this.startForegroundService(selectedSound);
                        break;
                    case ACTION_STOP_FOREGROUND_SERVICE:
                        this.stopForegroundService();
                        break;
                    default:
                        this.stopForegroundService();
                        break;
                }
            }
        }
        return super.onStartCommand(intent, flags, startId);
    }

    private void startForegroundService(String selectedSound) {
        Intent notificationIntent = new Intent(this, AudioPlayer.class);
        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, (int) System.currentTimeMillis(), notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        createNotificationChannel();
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID);
        builder.setContentTitle(getString(R.string.appName));
        builder.setContentText(getString(R.string.notificationContent, selectedSound));
        builder.setWhen(System.currentTimeMillis());
        builder.setSmallIcon(R.drawable.ic_music_note);
        builder.setPriority(Notification.PRIORITY_LOW);
        builder.setContentIntent(pendingIntent);
        Notification notification = builder.build();

        this.startForeground(FOREGROUND_SERVICE_ID, notification);
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_NAME, NotificationManager.IMPORTANCE_DEFAULT);
            channel.setDescription(NOTIFICATION_CHANNEL_DESCRIPTION);
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void stopForegroundService() {
        this.stopForeground(true);
        stopSelf();
    }
}