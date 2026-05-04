---
title: 'AIR: テキストファイルに書き込み - openAsync()、writeMultiByte()'
date: 2008-12-18
authors: [yukun]
tags:
  - actionscript
  - air
  - file
  - flex
  - gui
  - write
slug: actionscript-air-async-write-text
---

[![AIR: テキストファイルに書き込み](./WriteTxtFile01_result-e1273382752288.png "WriteTxtFile01_result")](./WriteTxtFile01_result-e1273382752288.png) AIRコンポーネントではローカルのファイルにアクセスすることができます。下記のコードは日本語を含むマルチバイトの文字列をテキストファイルに書き込む処理をする。 
<!-- truncate -->


## 処理の手順

1. FileStream#openAsync()かopen()メソッドの引数にFileインスタンスとFileModeのプロパティを設定して実ファイルのパイプに接続
2. FileStream#writeMultiByte()でファイルに書き込み
3. FileStream#close()でストリームを閉じる

### ソースコード


```actionscript
<?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" title="シンプルテキストメイカー">
<mx:Script>
  <![CDATA[
  import mx.controls.Alert;
  private var choDir:File = File.documentsDirectory; // ダイアログの初期ディレクトリ
  private var saveFile:File;
  private var stream:FileStream;
  private function onSaveFileBut():void {
    choDir.addEventListener(Event.SELECT, onSelectSaveFile);
    choDir.browseForSave("テキストファイルに保存");
  }
  private function onSelectSaveFile(e:Event):void {
    saveFile = e.target as File; // 選択されたファイル
    choDir.removeEventListener(Event.SELECT, onSelectSaveFile);
    try {
      stream = new FileStream();
      stream.addEventListener(IOErrorEvent.IO_ERROR, onIOErrorWriteFile);
      stream.openAsync(saveFile, FileMode.WRITE); // 書き込みmodeで開く(フツーのopen()でもOK)
      var str:String = txtArea_.text;
      // 改行文字と文字コードをOS標準のものに置き換えて書き込み
      str = str.replace(/\n/g, File.lineEnding);
      stream.writeMultiByte(str, File.systemCharset); // 実際に書き込み
    } catch (err:IOError) {
      progLab_.text = "IOError : " + err;
    } finally {
      if (stream != null) {
        stream.close();
      }
    }
  }
  // ファイル書き込みに失敗した場合
  private function onIOErrorWriteFile(e:IOErrorEvent):void {
    Alert.show("ファイルの書き込みに失敗", "エラー", Alert.OK, this);
    if (stream != null) {
      stream.close();
    }
  }
  ]]]]><![CDATA[>
</mx:Script>
  <mx:VBox x="0" y="0" height="100%" width="100%">
    <mx:HBox width="100%">
      <mx:Button label="ファイルに保存" id="saveBut_" click="onSaveFileBut();"/>
      <mx:Label id="progLab_"/>
    </mx:HBox>
    <mx:TextArea width="100%" height="100%" id="txtArea_"/>
  </mx:VBox>
</mx:WindowedApplication>
```


### リファレンス

- Adobe AIR 1.5 \* ファイルシステムの操作
- Adobe AIR 1.5 \* ファイルの読み取りと書き込み
