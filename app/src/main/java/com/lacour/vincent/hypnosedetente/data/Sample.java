package com.lacour.vincent.hypnosedetente.data;

import android.os.Parcel;
import android.os.Parcelable;

public class Sample implements Parcelable {

    private int id;
    private String title;
    private String description;
    private String file;
    private String url;
    private int thumbnail;
    private int duration;
    private int size;

    public Sample(int id, String title, String description, String file, String url, int thumbnail, int duration, int size) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.file = file;
        this.url = url;
        this.thumbnail = thumbnail;
        this.duration = duration;
        this.size = size;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return this.title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return this.description;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getFile() {
        return this.file;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return this.url;
    }

    public void setThumbnail(int thumbnail) {
        this.thumbnail = thumbnail;
    }

    public int getThumbnail() {
        return this.thumbnail;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getDuration() {
        return this.duration;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getSize() {
        return this.size;
    }


    protected Sample(Parcel in) {
        id = in.readInt();
        title = in.readString();
        description = in.readString();
        file = in.readString();
        url = in.readString();
        thumbnail = in.readInt();
        duration = in.readInt();
        size = in.readInt();
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(id);
        dest.writeString(title);
        dest.writeString(description);
        dest.writeString(file);
        dest.writeString(url);
        dest.writeInt(thumbnail);
        dest.writeInt(duration);
        dest.writeInt(size);
    }

    @SuppressWarnings("unused")
    public static final Parcelable.Creator<Sample> CREATOR = new Parcelable.Creator<Sample>() {
        @Override
        public Sample createFromParcel(Parcel in) {
            return new Sample(in);
        }

        @Override
        public Sample[] newArray(int size) {
            return new Sample[size];
        }
    };
}
