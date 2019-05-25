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

    /* Used to build and start foreground service. */
    private void startForegroundService(String seletedSound) {
        Intent notificationIntent = new Intent(this, AudioPlayer.class);
        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, (int) System.currentTimeMillis(), notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        // Create notification builder.
        createNotificationChannel();
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "200195");
        builder.setContentTitle(getString(R.string.app_name));
        builder.setContentText(seletedSound + " - Lecture en cours");
        builder.setWhen(System.currentTimeMillis());
        builder.setSmallIcon(R.drawable.ic_music_note);
        builder.setPriority(Notification.PRIORITY_LOW);
        builder.setContentIntent(pendingIntent);

        // Build the notification.
        Notification notification = builder.build();
        // Start foreground service.
        this.startForeground(200195, notification);
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "com.lacour.vincent.hypnosedetente";
            String description = "description of the channel";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("200195", name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void stopForegroundService() {
        // Stop foreground service and remove the notification.
        this.stopForeground(true);
        stopSelf();
    }
}