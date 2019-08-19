package com.lacour.vincent.hypnosedetente.screen;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.MenuItem;

import com.lacour.vincent.hypnosedetente.R;
import com.lacour.vincent.hypnosedetente.fragment.SettingsFragment;

public class Settings extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        setSupportActionBar(findViewById(R.id.toolbar_settings));

        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle(R.string.menuSettingsLabel);
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setDisplayShowHomeEnabled(true);
        }

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

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finishActivity();
            return true;
        } else {
            return super.onOptionsItemSelected(item);
        }
    }

    private void finishActivity() {
        finish();
        Settings.this.overridePendingTransition(R.anim.anim_slide_in_right,
                R.anim.anim_slide_out_right);
    }

}
