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

import com.lacour.vincent.hypnosedetente.data.Sample
import com.lacour.vincent.hypnosedetente.utils.AppUtils


class SampleAdapter(val context: Context, val samples: List<Sample>) :
    RecyclerView.Adapter<SampleAdapter.ViewHolder>() {

    private val appUtils = AppUtils(context)

    override fun getItemCount(): Int = samples.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val sample: Sample = samples[position]
        holder.title.text = sample.title
        holder.duration.text = context.getString(R.string.sample_duration, sample.duration)
        Glide.with(context).load(sample.thumbnail).into(holder.thumbnail);
        holder.airplane.setVisibility(if (appUtils.isFileExist(sample.file)) View.VISIBLE else View.GONE)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.card_layout, parent, false)
        return ViewHolder(v);
    }


    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val title = itemView.findViewById<TextView>(R.id.title)
        val duration = itemView.findViewById<TextView>(R.id.duration)
        val thumbnail = itemView.findViewById<ImageView>(R.id.thumbnail)
        val airplane = itemView.findViewById<ImageView>(R.id.airplane)

    }
}