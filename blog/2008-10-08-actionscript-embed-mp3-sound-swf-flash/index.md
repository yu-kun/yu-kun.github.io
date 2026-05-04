---
title: 'ActionScript: Flash(*.swf)にmp3ファイルを埋め込む - Embedタグ'
date: 2008-10-08
authors: [yukun]
tags:
  - actionscript
  - flash-actionscript
  - sound
slug: actionscript-embed-mp3-sound-swf-flash
---

外部ファイルをURLやパスを指定してロードする以外に、ファイルをFlashに埋め込むこむことも出来ます。下記の例で扱うファイルはmp3サウンドですが、これはテキストや画像ファイルに代えても処理の手順はさして変わりません（インスタンスを格納するデータ型が変化するだけです）。

### ソースコード

次のコードはEmbedタグで指定したサウンドを再生する処理を表しています。 _PlaySound.as_ 

```actionscript
 package info.yukun { import flash.display.Sprite; import flash.media.Sound; public class PlaySound extends Sprite { [Embed(source='sample.mp3')] // mp3ファイルのパスを指定（ここではカレントディレクトリのsample.mp3ファイル） private static const SampleSound:Class; private var sampleMp3:Sound = new SampleSound(); public function PlaySound():void { sampleMp3.play(); // サウンドの再生 } } } 
```


### コードの説明

`[Embed(source='sample.mp3')]` で指定されたmp3ファイルは、 `private static const SomeSound:Class;` で静的なプロパティにClass型として格納します。次に、 `private var sampleMp3:Sound = new SampleSound();` でSoundクラス型変数にSampleSoundインスタンスを代入し、 これによって、play()メソッドを用いてサウンドを再生しています。 Embedにはsource属性の他にもsymbolというのがあるみたいです。後でさらっておこうかな。

### 参考にしたサイト

- Embedding Resources with AS3 | BIT-101 Blog
- Sound - ActionScript 3.0 コンポーネントリファレンスガイド
