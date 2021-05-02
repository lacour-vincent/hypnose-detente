package com.lacour.vincent.hypnosedetente.screen

import android.content.pm.PackageManager
import android.os.Bundle
import android.view.KeyEvent
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import com.lacour.vincent.hypnosedetente.R
import com.lacour.vincent.hypnosedetente.databinding.ActivityInformationBinding

class Information : AppCompatActivity() {

    private lateinit var binding: ActivityInformationBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInformationBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(findViewById(R.id.toolbar_information))

        if (supportActionBar != null) {
            with(supportActionBar!!) {
                setDisplayHomeAsUpEnabled(true)
                setDisplayShowHomeEnabled(true)
            }
        }

        try {
            val pInfo = this.packageManager.getPackageInfo(packageName, 0)
            binding.numberVersion.text = pInfo.versionName
        } catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
        }

    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean = when (keyCode) {
        KeyEvent.KEYCODE_BACK -> {
            finishActivity()
            true
        }
        else -> super.onKeyDown(keyCode, event)
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean = when (item.itemId) {
        android.R.id.home -> {
            finishActivity()
            true
        }
        else -> super.onOptionsItemSelected(item)
    }


    private fun finishActivity() {
        finish()
        this@Information.overridePendingTransition(
            R.anim.anim_slide_in_right,
            R.anim.anim_slide_out_right
        )
    }

}
