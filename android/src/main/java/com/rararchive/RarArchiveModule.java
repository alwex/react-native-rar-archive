package com.rararchive;

import androidx.annotation.NonNull;

import com.github.junrar.Junrar;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = RarArchiveModule.NAME)
public class RarArchiveModule extends ReactContextBaseJavaModule {
  public static final String NAME = "RarArchive";

  public RarArchiveModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void unrar(String from, String to, Promise promise) {

    try {
      Junrar.extract(from, to);
      promise.resolve(to);
    } catch (Exception e) {
      promise.reject("Unrar error", e);
    }
  }
}
