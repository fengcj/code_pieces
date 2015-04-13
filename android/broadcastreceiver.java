package course.examples.broadcastreceiver.singlebroadcaststaticregistration;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;


/*
  In AndroidManifest.xml file:


         <receiver
            android:name="course.examples.broadcastreceiver.singlebroadcaststaticregistration.Receiver"
            android:exported="false" >
            <intent-filter>
                <action android:name="course.examples.BroadcastReceiver.show_toast" >
                </action>
            </intent-filter>
         </receiver>



*/


public class SimpleBroadcast extends Activity {

	private static final String CUSTOM_INTENT = "course.examples.BroadcastReceiver.show_toast";
		
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		
		Button button = (Button) findViewById(R.id.button);
		button.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				
				sendBroadcast(new Intent(CUSTOM_INTENT),
						android.Manifest.permission.VIBRATE);
			}
		});
	}
}
