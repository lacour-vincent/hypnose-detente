package com.lacour.vincent.hypnosedetente.component;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

import com.bumptech.glide.Glide;
import com.lacour.vincent.hypnosedetente.R;
import com.lacour.vincent.hypnosedetente.data.Sample;
import com.lacour.vincent.hypnosedetente.utils.AppUtils;

public class CustomMorceauAdapter extends RecyclerView.Adapter<CustomMorceauAdapter.MyViewHolder> {

    private List<Sample> sampleList;
    private Context mContext;
    private AppUtils appUtils;

    /**
     * View holder class
     */
    public class MyViewHolder extends RecyclerView.ViewHolder {

        private TextView txtTitle;
        private TextView txtDuration;
        private ImageView imgThumbnail;
        private ImageView imgAirplane;

        public MyViewHolder(View view) {
            super(view);
            txtTitle = view.findViewById(R.id.autor);
            txtDuration = view.findViewById(R.id.duration);
            imgThumbnail = view.findViewById(R.id.thumbnail);
            imgAirplane = view.findViewById(R.id.airplaneMode);
        }
    }

    public CustomMorceauAdapter(Context mContext, List<Sample> sampleList) {
        this.mContext = mContext;
        this.sampleList = sampleList;
        this.appUtils = new AppUtils(this.mContext);
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.card_layout, parent, false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Sample sample = sampleList.get(position);
        holder.txtTitle.setText(sample.getTitle());
        String duration = "⏰" + "  " + String.valueOf(sample.getDuration()) + " min";
        holder.txtDuration.setText(duration);
        Glide.with(mContext).load(sample.getThumbnail()).into(holder.imgThumbnail);
        if (appUtils.isFileExist(sample.getFile())) {
            holder.imgAirplane.setVisibility(View.VISIBLE);
        }
        else{
            holder.imgAirplane.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return sampleList.size();
    }

    public Object getItem(int position) {
        return sampleList.get(position);
    }

    public long getItemId(int position) {
        return position;
    }

}