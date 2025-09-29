package com.luciferstudios.PokegoExpCalculator

import android.os.Bundle
import android.view.KeyEvent  // NEW: Import for handling physical back button
import android.webkit.WebView  // NEW: Import to access the WebView
import androidx.activity.enableEdgeToEdge
import androidx.activity.OnBackPressedCallback  // NEW: Import for handling back gesture

class MainActivity : TauriActivity() {
  private lateinit var wv: WebView
  // NEW: Declare a variable to store reference to the WebView
  // lateinit means "I'll initialize this later, but I promise it will be set before use"
  // This lets us access the WebView from anywhere in this class

  override fun onWebViewCreate(webView: WebView) {
    wv = webView
    // NEW: This is a Tauri lifecycle method that gets called when WebView is created
    // We store the WebView reference in our 'wv' variable so we can use it later
  }

  private fun handleBackPress(): Boolean {
    // NEW: A helper function that contains all our back button logic
    // This will be called from TWO places: gesture handler and physical button handler
    // Returns Boolean but we always return true (we'll handle everything ourselves)
    
    wv.evaluateJavascript(
      // NEW: This executes JavaScript code inside the WebView
      // It's how Kotlin talks to your React app
      
      """
      try {
        window.androidBackCallback()
        // Try to call the JavaScript function we'll define in React
        // This function will return true or false
      } catch (_) {
        true
        // If the function doesn't exist (app just started), return true
        // This means "yes, close the app"
      }
      """.trimIndent()
      // trimIndent() removes the extra spacing from our multi-line string
      
    ) { result ->
      // This is a callback - it runs AFTER the JavaScript finishes executing
      // 'result' contains what the JavaScript returned (as a string: "true" or "false")
      
      if (result == "true") {
        // If JavaScript returned true, it means "I'm on home page, please close app"
        finish()
        // finish() closes the activity (your app)
      }
      // If result is "false", we do nothing - app stays open and React handled navigation
    }
    return true
    // Return true to say "yes, we handled this event"
  }

  override fun dispatchKeyEvent(event: KeyEvent): Boolean {
    // NEW: This intercepts ALL key events before they reach the WebView
    // This is crucial! Without this, the WebView might handle back button itself
    // and cause unwanted navigation
    
    if (event.keyCode == KeyEvent.KEYCODE_BACK && event.action == KeyEvent.ACTION_DOWN) {
      // Check if:
      // 1. The key pressed is the back button (KEYCODE_BACK)
      // 2. The action is DOWN (button was pressed, not released)
      // We only care about the DOWN event to avoid handling the same press twice
      
      return handleBackPress()
      // Call our helper function and return its result
      // This prevents the default behavior (WebView handling it)
    }
    return super.dispatchKeyEvent(event)
    // For any other key, let the parent class handle it normally
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    // This runs when your app starts up
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)

    // NEW: Handle modern back gesture (swipe from edge)
    onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
      // onBackPressedDispatcher is Android's modern way to handle back navigation
      // addCallback registers our custom behavior
      // 'this' refers to MainActivity
      // 'true' means this callback is enabled
      
      override fun handleOnBackPressed() {
        // This method is called when user swipes back
        handleBackPress()
        // Call our helper function (same one used for physical button)
      }
    })
  }
}