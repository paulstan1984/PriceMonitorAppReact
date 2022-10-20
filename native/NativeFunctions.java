package io.paulstan.pricemonitorapp;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import java.io.File;
import java.io.FileWriter;

public class NativeFunctions {
    private Activity activity;

    public NativeFunctions(Activity activity) {
        this.activity = activity;
    }

    @JavascriptInterface
    public String writeFile(String name, String content){
        File dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        File file = new File(dir, name);

        try {
            FileWriter writer = new FileWriter(file);
            writer.write(content);
            writer.flush();
            writer.close();
            return "Ok";
        }
        catch (Exception ex){
            return ex.getMessage().toString();
        }
    }

    public static void SetupJS (WebView appView, Activity activity){
        NativeFunctions jsInterface = new NativeFunctions(activity);
        appView.getSettings().setJavaScriptEnabled(true);
        appView.addJavascriptInterface(jsInterface, "NativeFunctions");
    }
}

//
NativeFunctions.SetupJS((WebView)appView.getView(), this);
