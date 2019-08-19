package com.lacour.vincent.hypnosedetente.screen;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;

import com.flyco.animation.BounceEnter.BounceTopEnter;
import com.flyco.animation.SlideExit.SlideBottomExit;
import com.flyco.dialog.widget.NormalDialog;
import com.lacour.vincent.hypnosedetente.R;
import com.lacour.vincent.hypnosedetente.component.CustomMorceauAdapter;
import com.lacour.vincent.hypnosedetente.component.RecyclerItemClickListener;
import com.lacour.vincent.hypnosedetente.data.Sample;
import com.lacour.vincent.hypnosedetente.data.Tracks;
import com.lacour.vincent.hypnosedetente.utils.AppUtils;

import java.util.List;

public class Welcome extends AppCompatActivity {

    private AppUtils appUtils;
    private static final String PLAYSTORE_LINK = "market://details?id=com.lacour.vincent.hypnosedetente";
    private CustomMorceauAdapter CMA;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        setSupportActionBar(findViewById(R.id.toolbar_welcome));

        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle(R.string.applicationName);
        }

        appUtils = new AppUtils(this);

        Tracks tracks = new Tracks(this);
        final List<Sample> sampleList = tracks.getTrackList();

        RecyclerView recyclerView = findViewById(R.id.recycler_view);
        RecyclerView.LayoutManager mLayoutManager = new GridLayoutManager(this, 2);
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        CMA = new CustomMorceauAdapter(this, sampleList);
        recyclerView.setAdapter(CMA);

        recyclerView.addOnItemTouchListener(
                new RecyclerItemClickListener(this, recyclerView, new RecyclerItemClickListener.OnItemClickListener() {
                    @Override
                    public void onItemClick(View view, int position) {
                        boolean hasInternetOrSampleInLocalStorage = appUtils.hasInternet() || appUtils.isFileExist(sampleList.get(position).getFile());
                        if (hasInternetOrSampleInLocalStorage) {
                            Intent intent = new Intent(Welcome.this, AudioPlayer.class);
                            intent.putExtra("sample", sampleList.get(position));
                            startActivity(intent);
                            Welcome.this.overridePendingTransition(R.anim.anim_slide_in_left,
                                    R.anim.anim_slide_out_left);
                        } else {
                            showFlycoInformationDialog(getString(R.string.noInternetTitle), getString(R.string.noInternetText));
                        }
                    }

                    @Override
                    public void onLongItemClick(View view, int position) {
                        // do for long click
                    }
                })
        );
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.toolbar_welcome_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        switch (item.getItemId()) {
            case R.id.action_rating:
                showFlycoRatingDialog(getString(R.string.titleRating), getString(R.string.textRating));
                return true;
            case R.id.action_settings:
                Intent settingsIntent = new Intent(this, Settings.class);
                startActivity(settingsIntent);
                Welcome.this.overridePendingTransition(R.anim.anim_slide_in_left,
                        R.anim.anim_slide_out_left);
                return true;
            case R.id.action_information:
                Intent informationIntent = new Intent(this, Information.class);
                startActivity(informationIntent);
                Welcome.this.overridePendingTransition(R.anim.anim_slide_in_left,
                        R.anim.anim_slide_out_left);
            default:
                return super.onOptionsItemSelected(item);
        }
    }


    private void OpenPlayStore() {
        if (!appUtils.isPlayStoreInstalled()) return;
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(PLAYSTORE_LINK));
        startActivity(intent);
    }

    private void showFlycoInformationDialog(String title, String message) {
        final NormalDialog dialog = new NormalDialog(this);
        dialog.isTitleShow(true)//
                .btnNum(1)
                .title(title)
                .titleTextSize(18)
                .content(message)
                .contentTextSize(15)
                .btnText(getString(R.string.agreeDialogText))
                .titleTextColor(ContextCompat.getColor(this, R.color.colorDialogTitle))
                .btnTextColor(ContextCompat.getColor(this, R.color.colorDialogButtonText))
                .contentTextColor(ContextCompat.getColor(this, R.color.colorDialogContent))
                .bgColor(ContextCompat.getColor(this, R.color.colorDialogBackground))
                .btnPressColor(ContextCompat.getColor(this, R.color.colorDialogButtonPressed))
                .showAnim(new BounceTopEnter())
                .dismissAnim(new SlideBottomExit())
                .show();

        dialog.setOnBtnClickL(() -> dialog.dismiss());

    }

    private void showFlycoRatingDialog(String title, String message) {
        final NormalDialog dialog = new NormalDialog(this);
        dialog.isTitleShow(true)
                .btnNum(2)
                .title(title)
                .titleTextSize(18)
                .content(message)
                .contentTextSize(15)
                .btnText(getString(R.string.textGoPlayStoreNo), getString(R.string.textGoPlayStoreYes))
                .titleTextColor(ContextCompat.getColor(this, R.color.colorDialogTitle))
                .btnTextColor(ContextCompat.getColor(this, R.color.colorDialogButtonText), ContextCompat.getColor(this, R.color.colorDialogButtonText))
                .contentTextColor(ContextCompat.getColor(this, R.color.colorDialogContent))
                .bgColor(ContextCompat.getColor(this, R.color.colorDialogBackground))
                .btnPressColor(ContextCompat.getColor(this, R.color.colorDialogButtonPressed))
                .showAnim(new BounceTopEnter())
                .dismissAnim(new SlideBottomExit())
                .show();

        dialog.setOnBtnClickL(() -> dialog.dismiss()
                , () -> {
                    OpenPlayStore();
                    dialog.dismiss();
                });

    }

}
