package com.lacour.vincent.hypnosedetente.screen

import android.content.pm.PackageManager
import android.os.Bundle
import android.view.KeyEvent
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import com.lacour.vincent.hypnosedetente.R
import kotlinx.android.synthetic.main.activity_information.*

class Information : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_information)
        setSupportActionBar(findViewById(R.id.toolbar_information))

        if (supportActionBar != null) {
            with(supportActionBar!!) {
                setDisplayHomeAsUpEnabled(true)
                setDisplayShowHomeEnabled(true)
            }
        }

        try {
            val pInfo = this.packageManager.getPackageInfo(packageName, 0)
            number_version.text = pInfo.versionName
        } catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
        }

    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            finishActivity()
        }
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            finishActivity()
            return true
        } else {
            return super.onOptionsItemSelected(item)
        }
    }

    private fun finishActivity() {
        finish()
        this@Information.overridePendingTransition(
            R.anim.anim_slide_in_right,
            R.anim.anim_slide_out_right
        )
    }

}
