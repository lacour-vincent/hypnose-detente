package com.lacour.vincent.hypnosedetente.screen

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.GridLayoutManager
import com.flyco.animation.BounceEnter.BounceTopEnter
import com.flyco.animation.SlideExit.SlideBottomExit
import com.flyco.dialog.listener.OnBtnClickL
import com.flyco.dialog.widget.NormalDialog
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
                            showFlycoInformationDialog(
                                getString(R.string.error_internet_title),
                                getString(R.string.error_internet_content)
                            )
                        }
                    }
                })
        )
    }

    override fun onResume() {
        super.onResume();
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
                showFlycoRatingDialog(getString(R.string.rating_title), getString(R.string.rating_content))
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

    private fun showFlycoInformationDialog(title: String, message: String) {
        val dialog = NormalDialog(this)
        dialog.isTitleShow(true)//
            .btnNum(1)
            .title(title)
            .titleTextSize(18f)
            .content(message)
            .contentTextSize(15f)
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

    private fun showFlycoRatingDialog(title: String, message: String) {
        val dialog = NormalDialog(this)
        dialog.isTitleShow(true)
            .btnNum(2)
            .title(title)
            .titleTextSize(18f)
            .content(message)
            .contentTextSize(15f)
            .btnText(getString(R.string.rating_no), getString(R.string.rating_yes))
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
            OnBtnClickL
            { dialog.dismiss() },
            OnBtnClickL
            {
                navigateToPlayStore()
                dialog.dismiss()
            }
        )

    }

}