package expo.modules.foregroundservice

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat

class ForegroundService : Service() {

    companion object {
        const val FOREGROUND_SERVICE_ID = 20100
        const val FOREGROUND_SERVICE_CHANNEL_ID = "media_playback_channel"
        const val FOREGROUND_SERVICE_CHANNEL_NAME = "Media Playback"
        const val FOREGROUND_SERVICE_NOTIFICATION_TITLE = "Hypnose — Détente"
        const val FOREGROUND_SERVICE_NOTIFICATION_TEXT = "{sample} — Lecture en cours"

        fun startService(context: Context, sample: String) {
            val intent = Intent(context, ForegroundService::class.java)
            intent.putExtra("sample", sample)
            ContextCompat.startForegroundService(context, intent)
        }

        fun stopService(context: Context) {
            val intent = Intent(context, ForegroundService::class.java)
            context.stopService(intent)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val sample = intent?.getStringExtra("sample") as String

        createNotificationChannel()

        val notification = NotificationCompat.Builder(this, FOREGROUND_SERVICE_CHANNEL_ID)
            .setContentTitle(FOREGROUND_SERVICE_NOTIFICATION_TITLE)
            .setContentText(FOREGROUND_SERVICE_NOTIFICATION_TEXT.replace("{sample}", sample))
            .setOngoing(true)
            .setContentIntent(createPendingIntent())
            .build()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(
                FOREGROUND_SERVICE_ID,
                notification,
                ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
            )
        } else {
            startForeground(FOREGROUND_SERVICE_ID, notification)
        }

        return START_STICKY
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
        val channel = NotificationChannel(
            FOREGROUND_SERVICE_CHANNEL_ID,
            FOREGROUND_SERVICE_CHANNEL_NAME,
            NotificationManager.IMPORTANCE_LOW
        )
        channel.description = "Controls for ongoing audio playback"
        channel.setSound(null, null)
        channel.enableVibration(false)
        channel.enableLights(false)
        channel.lockscreenVisibility = Notification.VISIBILITY_PUBLIC
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(channel)
    }

    private fun createPendingIntent(): PendingIntent {
        val intent = packageManager.getLaunchIntentForPackage(packageName)?.apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        return PendingIntent.getActivity(
            this,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}