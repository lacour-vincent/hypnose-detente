package com.lacour.vincent.hypnosedetente.screen;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.widget.ImageButton;

import com.lacour.vincent.hypnosedetente.R;

public class Information extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_information);

        ImageButton btn_back_information = findViewById(R.id.btn_back_information);
        btn_back_information.setOnClickListener(view -> finishActivity());
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            finishActivity();
        }
        return true;
    }

    private void finishActivity() {
        finish();
        Information.this.overridePendingTransition(R.anim.anim_slide_in_right,
                R.anim.anim_slide_out_right);
    }

}
