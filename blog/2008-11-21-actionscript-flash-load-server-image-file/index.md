---
title: 'ActionScript: 画像ファイルをダウンロードして表示 - Loaderクラス'
date: 2008-11-21
authors: [yukun]
tags:
  - actionscript
  - flash-actionscript
  - graphics
  - image
  - network
slug: actionscript-flash-load-server-image-file
---

サーバ上にあるイメージファイルをダウンロードして表示するサンプル。Loaderクラスで画像など(SWF, JPEG, GIF, PNG)をダウンロードし、そのプロセス中に送出するイベントはLoaderInfoクラスが管理。

## ソースコード


```actionscript
package info.yukun
{
	import flash.display.Loader;
	import flash.display.LoaderInfo;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.net.URLRequest;
	/**
	 * 外部画像のロードサンプル
	 */
	public class LoadImage extends Sprite {
		private var imageURL:String =
			"http://www.google.co.jp/intl/ja/images/about_logo.gif";
		private var imageLoader:Loader;
		public function LoadImage():void {
			init();
		}
		private function init(e:Event = null):void {
			imageLoader = new Loader();
			var imageURLreq:URLRequest = new URLRequest(imageURL);
			var imgInfo:LoaderInfo = imageLoader.contentLoaderInfo;
			imgInfo.addEventListener(Event.INIT, onInit);
			imgInfo.addEventListener(IOErrorEvent.IO_ERROR, onIOerror);
			addChild(imageLoader);
			imageLoader.load(imageURLreq);
		}
		// ダウンロード完了
		private function onInit(e:Event):void {
			trace("Can access the loaded object.");
		}
		// IOエラーによりダウンロード失敗
		private function onIOerror(e:IOErrorEvent):void {
			trace("IO Error.");
		}
	}
}
```


## リファレンス

- Loader - ActionScript 3.0 Language and Components Reference
- LoaderInfo - ActionScript 3.0 Language and Components Reference
