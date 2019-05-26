package com.lacour.vincent.hypnosedetente.screen;

import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.TypedValue;
import android.view.View;
import android.widget.ImageButton;
import android.widget.PopupMenu;

import com.flyco.animation.BounceEnter.BounceTopEnter;
import com.flyco.animation.SlideExit.SlideBottomExit;
import com.flyco.dialog.listener.OnBtnClickL;
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

        appUtils = new AppUtils(this);

        ImageButton btn_info = findViewById(R.id.btn_info);
        btn_info.setOnClickListener(view -> {
            openPopupMenu(btn_info);
        });

        ImageButton btn_rating = findViewById(R.id.btn_etoile);
        btn_rating.setOnClickListener(view -> {
            showFlycoRatingDialog(getString(R.string.TitleRating), getString(R.string.TextRating));
        });

        Tracks tracks = new Tracks(this);
        final List<Sample> sampleList = tracks.getTrackList();

        RecyclerView recyclerView = findViewById(R.id.recycler_view);
        RecyclerView.LayoutManager mLayoutManager = new GridLayoutManager(this, 2);
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.addItemDecoration(new EqualSpacingItemDecoration(dpToPx(), EqualSpacingItemDecoration.GRID));
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
    public void onResume() {
        super.onResume();
        CMA.notifyDataSetChanged();
    }

    private void OpenPlayStore() {
        if (!appUtils.isPlayStoreInstalled()) return;
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(PLAYSTORE_LINK));
        startActivity(intent);
    }

    private void openPopupMenu(ImageButton button) {
        PopupMenu popup = new PopupMenu(this, button);
        popup.getMenuInflater().inflate(R.menu.popup_menu, popup.getMenu());
        popup.setOnMenuItemClickListener(item -> {
            switch (item.getItemId()) {
                case R.id.settings:
                    Intent settingsIntent = new Intent(this, Settings.class);
                    startActivity(settingsIntent);
                    Welcome.this.overridePendingTransition(R.anim.anim_slide_in_left,
                            R.anim.anim_slide_out_left);
                    return true;
                case R.id.information:
                    Intent informationIntent = new Intent(this, Information.class);
                    startActivity(informationIntent);
                    Welcome.this.overridePendingTransition(R.anim.anim_slide_in_left,
                            R.anim.anim_slide_out_left);
                    return true;
                default:
                    return false;
            }
        });
        popup.show();
    }


    private void showFlycoInformationDialog(String title, String message) {
        final NormalDialog dialog = new NormalDialog(this);
        dialog.isTitleShow(true)//
                .btnNum(1)
                .title(title)
                .titleTextSize(18)
                .content(message)//
                .contentTextSize(15)
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

    private void showFlycoRatingDialog(String title, String message) {
        final NormalDialog dialog = new NormalDialog(this);
        dialog.isTitleShow(true)//
                .btnNum(2)
                .title(title)
                .titleTextSize(18)
                .content(message)//
                .contentTextSize(15)
                .btnText(getString(R.string.TextGoPlayStoreNo), getString(R.string.TextGoPlayStoreYes))//
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
                        OpenPlayStore();
                        dialog.dismiss();
                    }
                }
        );
    }

    public class EqualSpacingItemDecoration extends RecyclerView.ItemDecoration {
        private final int spacing;
        private int displayMode;

        private static final int HORIZONTAL = 0;
        private static final int VERTICAL = 1;
        private static final int GRID = 2;

        private EqualSpacingItemDecoration(int spacing, int displayMode) {
            this.spacing = spacing;
            this.displayMode = displayMode;
        }

        @Override
        public void getItemOffsets(@NonNull Rect outRect, @NonNull View view, @NonNull RecyclerView parent, @NonNull RecyclerView.State state) {
            int position = parent.getChildViewHolder(view).getAdapterPosition();
            int itemCount = state.getItemCount();
            RecyclerView.LayoutManager layoutManager = parent.getLayoutManager();
            setSpacingForDirection(outRect, layoutManager, position, itemCount);
        }

        private void setSpacingForDirection(Rect outRect,
                                            RecyclerView.LayoutManager layoutManager,
                                            int position,
                                            int itemCount) {

            if (displayMode == -1) {
                displayMode = resolveDisplayMode(layoutManager);
            }

            switch (displayMode) {
                case HORIZONTAL:
                    outRect.left = spacing;
                    outRect.right = position == itemCount - 1 ? spacing : 0;
                    outRect.top = spacing;
                    outRect.bottom = spacing;
                    break;
                case VERTICAL:
                    outRect.left = spacing;
                    outRect.right = spacing;
                    outRect.top = spacing;
                    outRect.bottom = position == itemCount - 1 ? spacing : 0;
                    break;
                case GRID:
                    if (layoutManager instanceof GridLayoutManager) {
                        GridLayoutManager gridLayoutManager = (GridLayoutManager) layoutManager;
                        int cols = gridLayoutManager.getSpanCount();
                        int rows = itemCount / cols;

                        outRect.left = spacing;
                        outRect.right = position % cols == cols - 1 ? spacing : 0;
                        outRect.top = spacing;
                        outRect.bottom = position / cols == rows - 1 ? spacing : 0;
                    }
                    break;
            }
        }

        private int resolveDisplayMode(RecyclerView.LayoutManager layoutManager) {
            if (layoutManager instanceof GridLayoutManager) return GRID;
            if (layoutManager.canScrollHorizontally()) return HORIZONTAL;
            return VERTICAL;
        }

    }

    private int dpToPx() {
        Resources r = getResources();
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 1, r.getDisplayMetrics()));
    }

}
