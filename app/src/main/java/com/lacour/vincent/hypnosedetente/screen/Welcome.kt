package com.lacour.vincent.hypnosedetente.screen

import android.content.Intent
import android.net.Uri
import android.os.Bundle

import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.view.ContextThemeWrapper
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.GridLayoutManager
import com.lacour.vincent.hypnosedetente.R
import com.lacour.vincent.hypnosedetente.component.RecyclerItemClickListener
import com.lacour.vincent.hypnosedetente.component.SampleAdapter
import com.lacour.vincent.hypnosedetente.data.Tracks
import com.lacour.vincent.hypnosedetente.utils.AppUtils

import kotlinx.android.synthetic.main.activity_welcome.*

class Welcome : AppCompatActivity() {

    companion object {
        private const val PLAYSTORE_LINK = "market://details?id=com.lacour.vincent.hypnosedetente"
    }

    private lateinit var appUtils: AppUtils
    private lateinit var sampleAdapter: SampleAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_welcome)
        setSupportActionBar(findViewById(R.id.toolbar_welcome))

        if (supportActionBar != null) {
            supportActionBar!!.setTitle(R.string.app_name)
        }

        appUtils = AppUtils(this)

        val (samples) = Tracks()
        sampleAdapter = SampleAdapter(this, samples)
        val mLayoutManager = GridLayoutManager(this, 2)
        recycler_view.adapter = sampleAdapter
        recycler_view.layoutManager = mLayoutManager
        recycler_view.itemAnimator = DefaultItemAnimator()

        recycler_view.addOnItemTouchListener(
            RecyclerItemClickListener(
                this,
                object : RecyclerItemClickListener.OnItemClickListener {
                    override fun onItemClick(view: View, position: Int) {
                        val hasInternetOrIsSampleIsInLocalStorage =
                            appUtils.hasInternet() || appUtils.isFileExist(samples[position].file)

                        if (hasInternetOrIsSampleIsInLocalStorage) {
                            val intent = Intent(this@Welcome, AudioPlayer::class.java)
                            intent.putExtra("sample", samples[position])
                            startActivity(intent)
                            this@Welcome.overridePendingTransition(
                                R.anim.anim_slide_in_left,
                                R.anim.anim_slide_out_left
                            )
                        } else {
                            showInformationDialog(
                                getString(R.string.error_internet_title),
                                getString(R.string.error_internet_content)
                            )
                        }
                    }
                })
        )
    }

    override fun onResume() {
        super.onResume()
        sampleAdapter.notifyDataSetChanged()
    }


    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        val inflater = menuInflater
        inflater.inflate(R.menu.toolbar_welcome_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean =
        when (item.itemId) {
            R.id.action_rating -> {
                showRatingDialog(
                    getString(R.string.rating_title),
                    getString(R.string.rating_content)
                )
                true
            }
            R.id.action_settings -> {
                val settingsIntent = Intent(this, Settings::class.java)
                startActivity(settingsIntent)
                this@Welcome.overridePendingTransition(
                    R.anim.anim_slide_in_left,
                    R.anim.anim_slide_out_left
                )
                true
            }
            R.id.action_information -> {
                val informationIntent = Intent(this, Information::class.java)
                startActivity(informationIntent)
                this@Welcome.overridePendingTransition(
                    R.anim.anim_slide_in_left,
                    R.anim.anim_slide_out_left
                )
                true
            }
            else -> super.onOptionsItemSelected(item)
        }


    private fun navigateToPlayStore() {
        if (!appUtils.isPlayStoreInstalled()) return
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse(PLAYSTORE_LINK)
        startActivity(intent)
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

    private fun showRatingDialog(title: String, message: String) {
        val builder = AlertDialog.Builder(ContextThemeWrapper(this, R.style.AppTheme_Dialog))
        with(builder) {
            setTitle(title)
            setMessage(message)
            setPositiveButton(getString(R.string.rating_yes)) { _, _ -> navigateToPlayStore() }
            setNegativeButton(getString(R.string.rating_no)) { _, _ -> }
            show()
        }
    }


}