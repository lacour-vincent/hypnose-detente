package com.lacour.vincent.hypnosedetente.screen;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.widget.ImageButton;

import com.lacour.vincent.hypnosedetente.R;
import com.lacour.vincent.hypnosedetente.fragment.SettingsFragment;

public class Settings extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        ImageButton btn_back_settings = findViewById(R.id.btn_back_settings);
        btn_back_settings.setOnClickListener(view -> finishActivity());

        getFragmentManager()
                .beginTransaction()
                .replace(R.id.content_frame, new SettingsFragment())
                .commit();

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
        Settings.this.overridePendingTransition(R.anim.anim_slide_in_right,
                R.anim.anim_slide_out_right);
    }

}
