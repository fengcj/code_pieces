package course.examples.networking.androidhttpclientxml;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;

import android.app.ListActivity;
import android.net.http.AndroidHttpClient;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;

public class NetworkingAndroidHttpClientXMLActivity extends ListActivity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		new HttpGetTask().execute();
	}

	private class HttpGetTask extends AsyncTask<Void, Void, List<String>> {

		// Get your own user name at http://www.geonames.org/login
		private static final String USER_NAME = "aporter";

		private static final String URL = "http://api.geonames.org/earthquakes?north=44.1&south=-9.9&east=-22.4&west=55.2&username="
				+ USER_NAME;

		AndroidHttpClient mClient = AndroidHttpClient.newInstance("");

		@Override
		protected List<String> doInBackground(Void... params) {
			HttpGet request = new HttpGet(URL);
			XMLResponseHandler responseHandler = new XMLResponseHandler();
			try {
				return mClient.execute(request, responseHandler);
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return null;
		}

		@Override
		protected void onPostExecute(List<String> result) {
			if (null != mClient)
				mClient.close();
			setListAdapter(new ArrayAdapter<String>(
					NetworkingAndroidHttpClientXMLActivity.this,
					R.layout.list_item, result));
		}
	}


    private class XMLResponseHandler implements ResponseHandler<List<String>> {

        private static final String MAGNITUDE_TAG = "magnitude";
        private static final String LONGITUDE_TAG = "lng";
        private static final String LATITUDE_TAG = "lat";
        private String mLat, mLng, mMag;
        private boolean mIsParsingLat, mIsParsingLng, mIsParsingMag;
        private final List<String> mResults = new ArrayList<String>();

        @Override
        public List<String> handleResponse(HttpResponse response)
                throws ClientProtocolException, IOException {
            try {

                // Create the Pull Parser
                XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
                XmlPullParser xpp = factory.newPullParser();

                // Set the Parser's input to be the XML document in the HTTP Response
                xpp.setInput(new InputStreamReader(response.getEntity()
                        .getContent()));

                // Get the first Parser event and start iterating over the XML document
                int eventType = xpp.getEventType();

                // this is the key code
                while (eventType != XmlPullParser.END_DOCUMENT) {

                    if (eventType == XmlPullParser.START_TAG) {
                        startTag(xpp.getName());
                    } else if (eventType == XmlPullParser.END_TAG) {
                        endTag(xpp.getName());
                    } else if (eventType == XmlPullParser.TEXT) {
                        text(xpp.getText());
                    }
                    eventType = xpp.next();
                }
                return mResults;
            } catch (XmlPullParserException e) {
            }
            return null;
        }

        public void startTag(String localName) {
            if (localName.equals(LATITUDE_TAG)) {
                mIsParsingLat = true;
            } else if (localName.equals(LONGITUDE_TAG)) {
                mIsParsingLng = true;
            } else if (localName.equals(MAGNITUDE_TAG)) {
                mIsParsingMag = true;
            }
        }

        public void text(String text) {
            if (mIsParsingLat) {
                mLat = text.trim();
            } else if (mIsParsingLng) {
                mLng = text.trim();
            } else if (mIsParsingMag) {
                mMag = text.trim();
            }
        }

        public void endTag(String localName) {
            if (localName.equals(LATITUDE_TAG)) {
                mIsParsingLat = false;
            } else if (localName.equals(LONGITUDE_TAG)) {
                mIsParsingLng = false;
            } else if (localName.equals(MAGNITUDE_TAG)) {
                mIsParsingMag = false;
            } else if (localName.equals("earthquake")) {
                mResults.add(MAGNITUDE_TAG + ":" + mMag + "," + LATITUDE_TAG + ":"
                        + mLat + "," + LONGITUDE_TAG + ":" + mLng);
                mLat = null;
                mLng = null;
                mMag = null;
            }
        }
    }
}
