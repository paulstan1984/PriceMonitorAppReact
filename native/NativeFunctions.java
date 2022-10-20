package io.paulstan.pricemonitorapp;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

public class NativeFunctions {
    private Activity activity;

    public NativeFunctions(Activity activity) {
        this.activity = activity;
    }

    @JavascriptInterface
    public String sayHello(String Name){
        return "Hello " + Name;
    }

    public static void SetupJS (WebView appView, Activity activity){
        NativeFunctions jsInterface = new NativeFunctions(activity);
        appView.getSettings().setJavaScriptEnabled(true);
        appView.addJavascriptInterface(jsInterface, "NativeFunctions");
    }
}

//
NativeFunctions.SetupJS((WebView)appView.getView(), this);
