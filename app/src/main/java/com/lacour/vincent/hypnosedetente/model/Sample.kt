package com.lacour.vincent.hypnosedetente.model

import android.os.Parcel
import android.os.Parcelable

data class Sample(
    val id: Int,
    val title: String,
    val fullTitle: String,
    val slug: String,
    val description: String,
    val asset: String,
    val filename: String,
    val thumbnail: Int,
    val duration: Int,
    val size: Int
) : Parcelable {

    constructor(parcel: Parcel) : this(
        parcel.readInt(),
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readInt(),
        parcel.readInt(),
        parcel.readInt()
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeInt(id)
        parcel.writeString(title)
        parcel.writeString(fullTitle)
        parcel.writeString(slug)
        parcel.writeString(description)
        parcel.writeString(asset)
        parcel.writeString(filename)
        parcel.writeInt(thumbnail)
        parcel.writeInt(duration)
        parcel.writeInt(size)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Sample> {
        override fun createFromParcel(parcel: Parcel): Sample {
            return Sample(parcel)
        }

        override fun newArray(size: Int): Array<Sample?> {
            return arrayOfNulls(size)
        }
    }
}