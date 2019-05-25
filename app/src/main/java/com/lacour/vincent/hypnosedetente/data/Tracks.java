package com.lacour.vincent.hypnosedetente.data;

import android.content.Context;

import com.lacour.vincent.hypnosedetente.R;

import java.util.ArrayList;
import java.util.List;

public class Tracks {

    private List<Sample> trackList;

    public Tracks(Context ctx) {

        Sample sample_0 = new Sample(
                0, ctx.getString(R.string.TitleTrack_0),
                ctx.getString(R.string.DescriptionTrack_0),
                ctx.getString(R.string.FileTrack_0),
                ctx.getString(R.string.UrlTrack_0),
                R.drawable.image_0,
                19,
                22);

        Sample sample_1 = new Sample(1, ctx.getString(R.string.TitleTrack_1),
                ctx.getString(R.string.DescriptionTrack_1),
                ctx.getString(R.string.FileTrack_1),
                ctx.getString(R.string.UrlTrack_1),
                R.drawable.image_1,
                15,
                19);

        Sample sample_2 = new Sample(2, ctx.getString(R.string.TitleTrack_2),
                ctx.getString(R.string.DescriptionTrack_2),
                ctx.getString(R.string.FileTrack_2),
                ctx.getString(R.string.UrlTrack_2),
                R.drawable.image_2,
                27,
                30);

        Sample sample_3 = new Sample(3, ctx.getString(R.string.TitleTrack_3),
                ctx.getString(R.string.DescriptionTrack_3),
                ctx.getString(R.string.FileTrack_3),
                ctx.getString(R.string.UrlTrack_3),
                R.drawable.image_3,
                36,
                44);

        Sample sample_4 = new Sample(4, ctx.getString(R.string.TitleTrack_4),
                ctx.getString(R.string.DescriptionTrack_4),
                ctx.getString(R.string.FileTrack_4),
                ctx.getString(R.string.UrlTrack_4),
                R.drawable.image_4,
                31,
                38);

        Sample sample_5 = new Sample(5, ctx.getString(R.string.TitleTrack_5),
                ctx.getString(R.string.DescriptionTrack_5),
                ctx.getString(R.string.FileTrack_5),
                ctx.getString(R.string.UrlTrack_5),
                R.drawable.image_5,
                36,
                43);

        Sample sample_6 = new Sample(6, ctx.getString(R.string.TitleTrack_6),
                ctx.getString(R.string.DescriptionTrack_6),
                ctx.getString(R.string.FileTrack_6),
                ctx.getString(R.string.UrlTrack_6),
                R.drawable.image_6,
                38,
                46);

        Sample sample_7 = new Sample(7, ctx.getString(R.string.TitleTrack_7),
                ctx.getString(R.string.DescriptionTrack_7),
                ctx.getString(R.string.FileTrack_7),
                ctx.getString(R.string.UrlTrack_7),
                R.drawable.image_7,
                27,
                32);

        Sample sample_8 = new Sample(8, ctx.getString(R.string.TitleTrack_8),
                ctx.getString(R.string.DescriptionTrack_8),
                ctx.getString(R.string.FileTrack_8),
                ctx.getString(R.string.UrlTrack_8),
                R.drawable.image_8,
                22,
                27);

        Sample sample_9 = new Sample(9, ctx.getString(R.string.TitleTrack_9),
                ctx.getString(R.string.DescriptionTrack_9),
                ctx.getString(R.string.FileTrack_9),
                ctx.getString(R.string.UrlTrack_9),
                R.drawable.image_9,
                21,
                26);

        Sample sample_10 = new Sample(10, ctx.getString(R.string.TitleTrack_10),
                ctx.getString(R.string.DescriptionTrack_10),
                ctx.getString(R.string.FileTrack_10),
                ctx.getString(R.string.UrlTrack_10),
                R.drawable.image_10,
                40,
                47);

        Sample sample_11 = new Sample(11, ctx.getString(R.string.TitleTrack_11),
                ctx.getString(R.string.DescriptionTrack_11),
                ctx.getString(R.string.FileTrack_11),
                ctx.getString(R.string.UrlTrack_11),
                R.drawable.image_11,
                21,
                24);

        Sample sample_12 = new Sample(12, ctx.getString(R.string.TitleTrack_12),
                ctx.getString(R.string.DescriptionTrack_12),
                ctx.getString(R.string.FileTrack_12),
                ctx.getString(R.string.UrlTrack_12),
                R.drawable.image_12,
                25,
                28);

        Sample sample_13 = new Sample(13, ctx.getString(R.string.TitleTrack_13),
                ctx.getString(R.string.DescriptionTrack_13),
                ctx.getString(R.string.FileTrack_13),
                ctx.getString(R.string.UrlTrack_13),
                R.drawable.image_13,
                30,
                34);

        Sample sample_14 = new Sample(14, ctx.getString(R.string.TitleTrack_14),
                ctx.getString(R.string.DescriptionTrack_14),
                ctx.getString(R.string.FileTrack_14),
                ctx.getString(R.string.UrlTrack_14),
                R.drawable.image_14,
                45,
                52);

        Sample sample_15 = new Sample(15, ctx.getString(R.string.TitleTrack_15),
                ctx.getString(R.string.DescriptionTrack_15),
                ctx.getString(R.string.FileTrack_15),
                ctx.getString(R.string.UrlTrack_15),
                R.drawable.image_15,
                24,
                27);

        trackList = new ArrayList<>();
        trackList.add(sample_0);
        trackList.add(sample_1);
        trackList.add(sample_2);
        trackList.add(sample_3);
        trackList.add(sample_4);
        trackList.add(sample_5);
        trackList.add(sample_6);
        trackList.add(sample_7);
        trackList.add(sample_8);
        trackList.add(sample_9);
        trackList.add(sample_10);
        trackList.add(sample_11);
        trackList.add(sample_12);
        trackList.add(sample_13);
        trackList.add(sample_14);
        trackList.add(sample_15);
    }

    public void setTrackList(List<Sample> trackList) {
        this.trackList = trackList;
    }

    public List<Sample> getTrackList() {
        return this.trackList;
    }

}
