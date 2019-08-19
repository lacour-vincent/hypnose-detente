package com.lacour.vincent.hypnosedetente.service

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat

import com.lacour.vincent.hypnosedetente.screen.AudioPlayer
import com.lacour.vincent.hypnosedetente.R


class ForegroundService : Service() {

    companion object {
        const val ACTION_START_FOREGROUND_SERVICE: String = "ACTION_START_FOREGROUND_SERVICE"
        const val ACTION_STOP_FOREGROUND_SERVICE = "ACTION_STOP_FOREGROUND_SERVICE"

        private const val NOTIFICATION_CHANNEL_ID: String = "57070615ece54925b49fc1ce1cb965b3hgtff"
        private val NOTIFICATION_CHANNEL_NAME: CharSequence = "COM.LACOUR.VINCENT.HYPNOSEDETENTE"
        private const val NOTIFICATION_CHANNEL_DESCRIPTION: String = "FOREGROUND_SERVICE"
        private const val FOREGROUND_SERVICE_ID: Int = 20100
    }


    override fun onBind(intent: Intent): IBinder? {
        // TODO: Return the communication channel to the service.
        throw UnsupportedOperationException("Not yet implemented")
    }

    override fun onDestroy() {
        super.onDestroy()
        stopForeground(true)
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
        super.onTaskRemoved(rootIntent)
        stopSelf()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent != null) {
            val action = intent.action
            val bundle = intent.extras
            val selectedSound: String = if (bundle != null) bundle.getString("SELECTED_SOUND")!! else ""
            if (action != null) {
                when (action) {
                    ACTION_START_FOREGROUND_SERVICE -> getNotification(selectedSound)
                    ACTION_STOP_FOREGROUND_SERVICE -> stopForegroundService()
                    else -> this.stopForegroundService()
                }
            }
        }
        return super.onStartCommand(intent, flags, startId)
    }

    private fun getNotification(seletedSound: String) {

        createChannel(this)

        val notifyIntent = Intent(this, AudioPlayer::class.java)
        notifyIntent.flags = Intent.FLAG_ACTIVITY_SINGLE_TOP
        val pendingIntent = PendingIntent.getActivity(
            this, 0, notifyIntent, PendingIntent.FLAG_UPDATE_CURRENT
        )

        val mNotification: Notification = NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_music_note)
            .setWhen(System.currentTimeMillis())
            .setAutoCancel(true)
            .setContentTitle(getString(R.string.app_name))
            .setContentText(getString(R.string.notification_description, seletedSound))
            .setContentIntent(pendingIntent)
            .build()

        startForeground(FOREGROUND_SERVICE_ID, mNotification)
    }


    private fun createChannel(context: Context) {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            // Create the NotificationChannel, but only on API 26+ because
            // the NotificationChannel class is new and not in the support library
            val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            val importance = NotificationManager.IMPORTANCE_LOW
            val notificationChannel =
                NotificationChannel(NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_NAME, importance)
            notificationChannel.enableVibration(true)
            notificationChannel.setShowBadge(true)
            notificationChannel.enableLights(true)
            notificationChannel.description = NOTIFICATION_CHANNEL_DESCRIPTION
            notificationChannel.lockscreenVisibility = Notification.VISIBILITY_PUBLIC
            notificationManager.createNotificationChannel(notificationChannel)
        }

    }

    private fun stopForegroundService() {
        stopForeground(true)
        stopSelf()
    }

}