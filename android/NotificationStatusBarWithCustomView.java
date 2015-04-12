package course.examples.notification.statusbarwithcustomview;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.RemoteViews;
import android.widget.Toast;

public class NotificationStatusBarWithCustomViewActivity extends Activity {

	// Notification ID to allow for future updates
	private static final int MY_NOTIFICATION_ID = 1;

    private static final String TAG = "NotificationStatusBarWithCustomViewActivity";

	// Notification Count
	private int mNotificationCount;

	// Notification Text Elements
	private final CharSequence tickerText = "This is a Really, Really, Super Long Notification Message!";
	private final CharSequence contentText = "You've Been Notified!";

	// Notification Action Elements
	private Intent mNotificationIntent;
	private PendingIntent mContentIntent;

	// Notification Sound and Vibration on Arrival
	private Uri soundURI = Uri
			.parse("android.resource://course.examples.Notification.StatusBarWithCustomView/"
					+ R.raw.alarm_rooster);
	private long[] mVibratePattern = { 0, 200, 200, 300 };
    /*
    *      When I run this project, it cause a crash, and the error is:
    *           Bad notification posted from package course.examples.notification.status bar with custom view: Couldn't expand RemoteViews for ...
    *      It takes me a hole night to find the reason, finally I found professor use the wrong package name, it should be
    *           "course.examples.notification.statusbarwithcustomview", but he use "course.examples.Notification.StatusBarWithCustomView"
    *      The best way is use getApplicationContext().getPackageName() to get the package name.
    *
    *
    *      This remind us we should never use hard－coded !!!
    *
    *      By the way, when the error occurs, I feel is may caused by the package name, but I just change it to "course.examples.notification.statusbarWithCustomview", then I run
    *      the project, still not right, so I change my mind to the resources. What a pity! This remind me to trust my first feel!!!
    *
    * */
	RemoteViews mContentView = new RemoteViews(
            "course.examples.notification.statusbarwithcustomview",  //   "course.examples.Notification.StatusBarWithCustomView"
			R.layout.custom_notification);

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.main);

		mNotificationIntent = new Intent(getApplicationContext(),
				NotificationSubActivity.class);
		mContentIntent = PendingIntent.getActivity(getApplicationContext(), 0,
				mNotificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

		final Button button = (Button) findViewById(R.id.button1);
		button.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {

				// Define the Notification's expanded message and Intent:
//                RemoteViews mContentView = new RemoteViews(
//                        getApplicationContext().getPackageName(),
//                        R.layout.custom_notification);


				mContentView.setTextViewText(R.id.text, contentText + " ("
						+ ++mNotificationCount + ")");

				// Build the Notification

				Notification.Builder notificationBuilder = new Notification.Builder(
						getApplicationContext());
				notificationBuilder
                    .setTicker(tickerText)
					.setSmallIcon(android.R.drawable.stat_sys_warning)
                        .setAutoCancel(true)
					.setContentIntent(mContentIntent)
					.setSound(soundURI)
					.setVibrate(mVibratePattern);
				//	.setContent(mContentView);
                Notification notification = notificationBuilder.getNotification();
                notification.contentView = mContentView;
				// Pass the Notification to the NotificationManager:
				NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
				mNotificationManager.notify(MY_NOTIFICATION_ID,
						notification);  //  notificationBuilder.getNotification()

                // Log.i(TAG,getApplicationContext().getPackageName());

                // Toast.makeText(getApplicationContext(),getApplicationContext().getPackageName(),Toast.LENGTH_LONG).show();

			}
		});

	}
}
