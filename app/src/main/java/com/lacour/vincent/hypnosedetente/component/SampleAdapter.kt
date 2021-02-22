package com.lacour.vincent.hypnosedetente.component

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.lacour.vincent.hypnosedetente.R
import com.lacour.vincent.hypnosedetente.model.Sample
import com.lacour.vincent.hypnosedetente.storage.AssetPackSampleManager

class SampleAdapter(private val context: Context, private val samples: List<Sample>) :
    RecyclerView.Adapter<SampleAdapter.ViewHolder>() {

    private val assetPackSampleManager = AssetPackSampleManager("", context)
    override fun getItemCount(): Int = samples.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val sample: Sample = samples[position]
        holder.title.text = sample.title
        holder.duration.text = context.getString(R.string.sample_duration, sample.duration)
        Glide.with(context).load(sample.thumbnail).into(holder.thumbnail)
        holder.airplane.visibility =
            if (assetPackSampleManager.isAssetPackDownloaded(sample.asset)) View.VISIBLE else View.GONE
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.card_layout, parent, false)
        return ViewHolder(v)
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val title: TextView = itemView.findViewById(R.id.title)
        val duration: TextView = itemView.findViewById(R.id.duration)
        val thumbnail: ImageView = itemView.findViewById(R.id.thumbnail)
        val airplane: ImageView = itemView.findViewById(R.id.airplane)
    }
}