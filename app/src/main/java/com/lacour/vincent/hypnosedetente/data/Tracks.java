package com.lacour.vincent.hypnosedetente.data;

import android.content.Context;

import com.lacour.vincent.hypnosedetente.R;

import java.util.ArrayList;
import java.util.List;

public class Tracks {

    private List<Sample> trackList;

    public Tracks(Context ctx) {

        Sample sample_0 = new Sample(
                0, ctx.getString(R.string.titleTrack_0),
                ctx.getString(R.string.descriptionTrack_0),
                ctx.getString(R.string.fileTrack_0),
                ctx.getString(R.string.urlTrack_0),
                R.drawable.image_0,
                19,
                22);

        Sample sample_1 = new Sample(1, ctx.getString(R.string.titleTrack_1),
                ctx.getString(R.string.descriptionTrack_1),
                ctx.getString(R.string.fileTrack_1),
                ctx.getString(R.string.urlTrack_1),
                R.drawable.image_1,
                15,
                19);

        Sample sample_2 = new Sample(2, ctx.getString(R.string.titleTrack_2),
                ctx.getString(R.string.descriptionTrack_2),
                ctx.getString(R.string.fileTrack_2),
                ctx.getString(R.string.urlTrack_2),
                R.drawable.image_2,
                27,
                30);

        Sample sample_3 = new Sample(3, ctx.getString(R.string.titleTrack_3),
                ctx.getString(R.string.descriptionTrack_3),
                ctx.getString(R.string.fileTrack_3),
                ctx.getString(R.string.urlTrack_3),
                R.drawable.image_3,
                36,
                44);

        Sample sample_4 = new Sample(4, ctx.getString(R.string.titleTrack_4),
                ctx.getString(R.string.descriptionTrack_4),
                ctx.getString(R.string.fileTrack_4),
                ctx.getString(R.string.urlTrack_4),
                R.drawable.image_4,
                31,
                38);

        Sample sample_5 = new Sample(5, ctx.getString(R.string.titleTrack_5),
                ctx.getString(R.string.descriptionTrack_5),
                ctx.getString(R.string.fileTrack_5),
                ctx.getString(R.string.urlTrack_5),
                R.drawable.image_5,
                36,
                43);

        Sample sample_6 = new Sample(6, ctx.getString(R.string.titleTrack_6),
                ctx.getString(R.string.descriptionTrack_6),
                ctx.getString(R.string.fileTrack_6),
                ctx.getString(R.string.urlTrack_6),
                R.drawable.image_6,
                38,
                46);

        Sample sample_7 = new Sample(7, ctx.getString(R.string.titleTrack_7),
                ctx.getString(R.string.descriptionTrack_7),
                ctx.getString(R.string.fileTrack_7),
                ctx.getString(R.string.urlTrack_7),
                R.drawable.image_7,
                27,
                32);

        Sample sample_8 = new Sample(8, ctx.getString(R.string.titleTrack_8),
                ctx.getString(R.string.descriptionTrack_8),
                ctx.getString(R.string.fileTrack_8),
                ctx.getString(R.string.urlTrack_8),
                R.drawable.image_8,
                22,
                27);

        Sample sample_9 = new Sample(9, ctx.getString(R.string.titleTrack_9),
                ctx.getString(R.string.descriptionTrack_9),
                ctx.getString(R.string.fileTrack_9),
                ctx.getString(R.string.urlTrack_9),
                R.drawable.image_9,
                21,
                26);

        Sample sample_10 = new Sample(10, ctx.getString(R.string.titleTrack_10),
                ctx.getString(R.string.descriptionTrack_10),
                ctx.getString(R.string.fileTrack_10),
                ctx.getString(R.string.urlTrack_10),
                R.drawable.image_10,
                40,
                47);

        Sample sample_11 = new Sample(11, ctx.getString(R.string.titleTrack_11),
                ctx.getString(R.string.descriptionTrack_11),
                ctx.getString(R.string.fileTrack_11),
                ctx.getString(R.string.urlTrack_11),
                R.drawable.image_11,
                21,
                24);

        Sample sample_12 = new Sample(12, ctx.getString(R.string.titleTrack_12),
                ctx.getString(R.string.descriptionTrack_12),
                ctx.getString(R.string.fileTrack_12),
                ctx.getString(R.string.urlTrack_12),
                R.drawable.image_12,
                25,
                28);

        Sample sample_13 = new Sample(13, ctx.getString(R.string.titleTrack_13),
                ctx.getString(R.string.descriptionTrack_13),
                ctx.getString(R.string.fileTrack_13),
                ctx.getString(R.string.urlTrack_13),
                R.drawable.image_13,
                30,
                34);

        Sample sample_14 = new Sample(14, ctx.getString(R.string.titleTrack_14),
                ctx.getString(R.string.descriptionTrack_14),
                ctx.getString(R.string.fileTrack_14),
                ctx.getString(R.string.urlTrack_14),
                R.drawable.image_14,
                45,
                52);

        Sample sample_15 = new Sample(15, ctx.getString(R.string.titleTrack_15),
                ctx.getString(R.string.descriptionTrack_15),
                ctx.getString(R.string.fileTrack_15),
                ctx.getString(R.string.urlTrack_15),
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
