package com.paperalerts;

// For React Native Immersive Bar DayNightDetection
import android.content.res.Configuration;

// For React Native BootSplash
import android.os.Bundle;

import com.facebook.react.ReactActivity;

// For React Native Gensute Handler
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

// For React Native Bootsplash
import com.zoontek.rnbootsplash.RNBootSplash;

// For React Native Immersive Bars
import com.rnimmersivebars.ImmersiveBars;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "PaperAlerts";
  }

  // React Native Gensute Handler
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // React Native Immersive Bars
    boolean isDarkMode = false;
    int currentNightMode = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;

    if (currentNightMode == Configuration.UI_MODE_NIGHT_YES) {
      isDarkMode = true;
    }

    ImmersiveBars.changeBarColors(this, isDarkMode);
    
    // Reaact Native Screens 
    // See: https://github.com/software-mansion/react-native-screens/issues/17#issuecomment-424704633
    super.onCreate(null);

    // React Native Bootsplash
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
  }
}
