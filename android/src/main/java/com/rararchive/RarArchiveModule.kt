package com.rararchive

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import android.util.Log

import net.sf.sevenzipjbinding.*
import net.sf.sevenzipjbinding.impl.RandomAccessFileInStream
import net.sf.sevenzipjbinding.simple.ISimpleInArchive
import net.sf.sevenzipjbinding.simple.ISimpleInArchiveItem
import net.sf.sevenzipjbinding.ExtractOperationResult;

import java.io.File
import java.io.FileOutputStream
import java.io.RandomAccessFile

class RarArchiveModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun unrar(from: String, to: String, promise: Promise) {
      var randomAccessFile: RandomAccessFile? = null
      var archive: IInArchive? = null

      var version = SevenZip.getSevenZipVersion()

      try {
        randomAccessFile = RandomAccessFile(from, "r")
        archive = SevenZip.openInArchive(
            null,
            RandomAccessFileInStream(randomAccessFile)
        )

        val simpleInArchive: ISimpleInArchive = archive.simpleInterface

        for (item in simpleInArchive.archiveItems) {
            if (item.isFolder) continue

            val outputFile = File(to, item.path)
            outputFile.parentFile?.mkdirs()

            FileOutputStream(outputFile).use { fos ->
                val result = item.extractSlow { data ->
                    fos.write(data)
                    data.size
                }

                if (result != ExtractOperationResult.OK) {
                    throw Exception("Error extracting item: ${item.path}")
                }
            }
        }

        promise.resolve(to)

      } catch (e: Exception) {
          promise.reject("Unrar error", e)
      } finally {
          try {
              archive?.close()
              randomAccessFile?.close()
          } catch (_: Exception) {}
      }
  }

  companion object {
    const val NAME = "RarArchive"
  }
}
