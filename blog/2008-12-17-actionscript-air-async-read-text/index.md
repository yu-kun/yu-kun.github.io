---
title: 'AIR: テキストファイルを非同期に読み込む - openAsync()、readMultiByte()'
date: 2008-12-17
authors: [yukun]
tags:
  - actionscript
  - air
  - file
  - flash-actionscript
  - flex
  - gui
  - read
slug: actionscript-air-async-read-text
---

[![AIR: テキストファイル読み込みの実行結果](./ReadTxtFile01_result-e1273382664744.png "ReadTxtFile01_result")](./ReadTxtFile01_result-e1273382664744.png) AIRコンポーネントではローカルのファイルにアクセスすることができます。下記のコードは日本語を含むマルチバイトのテキストファイルを読み込み、画面い表示する処理を行う。 
<!-- truncate -->


## 大まかな手順

1. FileStreamのコンストラクタの引数に対象のファイルへのパスが設定されたFileインスタンスを渡す。
2. FileStream#openAsyncで実ファイルへのパイプ接続。
3. この時、非同期の読み込み完了／エラーを取得するためにイベントを登録しておく。
4. 実際の文字の読み取り（どれだけ読むか、文字コードの変換など）はFileStream#readMultiByteで行う。
5. ストリームのインスタンスには接続時にpositionプロパティ（何処読んでいるかのポインタみたいなもの）からファイル末尾までのサイズ（bytesAvailable）を取得してるので、読み込みサイズにそれを指定。
6. FileStream#close()でストリームを閉じる

### ソースコード


```actionscript
<?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute"
  title="テキストビュワー">
  <mx:Script>
    <![CDATA[
    import flash.filesystem.*;
    import mx.events.*;
    import mx.controls.Alert;
    private var choDir:File = File.documentsDirectory; // 開くディレクトリを指す
    private var curFile:File; // 選択されたファイル
    private var stream:FileStream;
    private function onOpenFileBut():void {
      choDir.addEventListener(Event.SELECT, onSelectFile);
      choDir.browseForOpen("開く"); // ファイル選択ダイアログの表示
    }
    // ファイルが選択されたイベント
    private function onSelectFile(e:Event):void {
      txtArea_.text = "";
      stream = new FileStream();
      curFile = e.target as File;
      stream.addEventListener(Event.COMPLETE, onCompleteReadFile);
      stream.addEventListener(IOErrorEvent.IO_ERROR, onIOErrorReadFile);
      stream.addEventListener(ProgressEvent.PROGRESS, onProgReadFile);
      stream.openAsync(curFile, FileMode.READ); // 非同期読み込み
      curFile.removeEventListener(Event.SELECT, onSelectFile);
    }
    private function onCompleteReadFile(e:Event):void {
      try {
        // OS標準の文字コードで読み込み
        var str:String = stream.readMultiByte(stream.bytesAvailable, File.systemCharset);
        // OS標準の改行文字への変換
        var pat:RegExp = new RegExp(File.lineEnding, "g");
        str = str.replace(pat, "n");
        txtArea_.text = str; // テキストエリアに表示
        stream.removeEventListener(Event.COMPLETE, onCompleteReadFile);
        stream.removeEventListener(IOErrorEvent.IO_ERROR, onIOErrorReadFile);
        stream.removeEventListener(ProgressEvent.PROGRESS, onProgReadFile);
      } catch (err:Error) {
        progLab_.text = "IOError: " + err;
      }
      finally {
        // パイプのクローズ
        if (stream != null) {
          stream.close();
        }
      }
    }
    private function onIOErrorReadFile(e:IOErrorEvent):void {
      Alert.show("ファイルを読み込み不可", "Error", Alert.OK, this); // 第4引数には親オブジェトを渡す
      if (stream != null) {
        stream.close();
      }
    }
    private function onProgReadFile(e:ProgressEvent):void {
      progLab_.text = "Progress: " +  e.bytesLoaded + " / " + e.bytesTotal + " bytes";
    }
    ]]]]><![CDATA[>
  </mx:Script>
  <mx:VBox x="0" y="0" height="100%" width="100%">
    <mx:HBox width="100%">
      <mx:Button label="ファイルを開く" id="openBut_" click="onOpenFileBut();"/>
      <mx:Label id="progLab_"/>
    </mx:HBox>
    <mx:TextArea width="100%" height="100%" id="txtArea_"/>
  </mx:VBox>
</mx:WindowedApplication>
```


### リファレンス

- Adobe AIR 1.5 \* ファイルの読み取りと書き込みのワークフロー
- Adobe AIR 1.5 \* 読み取りバッファと FileStream オブジェクトの bytesAvailable プロパティ
