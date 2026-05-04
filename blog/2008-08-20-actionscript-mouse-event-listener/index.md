---
title: 'ActionScript: マウスをイベントリスナーに登録'
date: 2008-08-20
authors: [yukun]
tags:
  - actionscript
  - flash-actionscript
  - mouse
slug: actionscript-mouse-event-listener
---

先ずは下のFlashの円にマウスポインタを合わせたり、クリック・ダブルクリックなどするとそれに伴ったアクションがあります。

2019-01-14追記：Flashのサポート終了に伴い、本ページからFlashへのリンクを削除しました。

このFlashの仕様をコードに書きおこす際、1つのクラスに全ての機能を書き込む方法もありますが(この場合はその方がコード量が少なくなる)、折角なのでOOに基づいたコードを書いてみました。が、OOのパターンを適応途中に飽きたので少し崩しています（ぇー）。

## ソースコード

上のFlashは以下の三つのクラスで描かれています。

1. Main.as
2. Ball.as
3. EventMonitor.as

### Main.as

MainクラスではマウスイベントをキャッチするBallクラス（後述）とその結果を観測し画面左上に出力するEventMonitorクラス（後述）のインスタンスを生成し画面への出力登録を行っています。ball変数をEventMonitorのコンストラクタに渡しているのはEventMonitorからマウス座標等を取得する為のballインスタンスのメソッドを呼び出すからです。

今回はイベントを発生させるオブジェクトがball一つですので後述のコードにしましたが、複数あるときはパターンに合わせた方が良いと考えます。


```actionscript
 package info.yukun { import flash.display.Sprite; // タイムラインを使わない場合、MovieClip より軽い public class Main extends Sprite { private var ball:Ball; // Ballクラス型の変数 private var monitor:EventMonitor; // イベントのモニタリング用のクラス // コンストラクタ： ここからプログラムコードを読んでいく public function Main():void { init(); } private function init():void { ball = new Ball(); // Ballインスタンスを作成 ball.x = stage.stageWidth / 2; // オブジェクトの表示位置(中央) ball.y = stage.stageHeight / 2; ball.regEvent(); // マウスイベントリスナーの登録 addChild(ball); // 最上位のSpriteにballオブジェクトを表示 monitor = new EventMonitor(ball); monitor.x = 0; // 左上に設置 monitor.y = 0; addChild(monitor); } } } 
```


### Ball.as

次に、冒頭のFlashに描かれている青い円を描画するBallオブジェクトを読んでみましょう。先ず、コンストラクタのBallとinit()メソッドで青い円を描画しています。

次にregEvent()メソッドでイベントリスナーの登録手続きを書いています。大抵この規模のコードですとMain.asでball.addEventListener(ホニャララ)とリスナー登録しているコードを散見しますが、オブジェクトの振る舞いはオブジェクト毎に持たせた方がOOぽいし、何だか再利用できそうな希望の片鱗を与えてくれるのでBallクラスにregEvent()メソッドを付けてみました。これはMainクラスから呼び出されることで、ballのマウスのイベントリスナーの一括登録が行われます。

後の二つのメソッド、mousePosition()とgetState()はEventMonitorクラスから呼び出されるものです。このメソッドを通して、画面左上にマウス座標等を表示します。ここでも機能の分離を行っています。すなわち、情報を投げる側(Ball)と観測し表示する側(EventMonitor)です。


```actionscript
 package info.yukun { import flash.display.Sprite; import flash.events.MouseEvent; // マウスイベント用 public class Ball extends Sprite { private var radius:Number; // 円の半径 private var color:uint; // 色 private var event_state:String; // イベントの状態 public function Ball(radius:Number = 50, color:uint = 0xA3D5FF) { this.radius = radius; this.color = color; this.event_state = ""; init(); } public function init():void { graphics.beginFill(color); graphics.drawCircle(0, 0, radius); // 円の描画 graphics.endFill(); } // イベントリスナーの登録 public function regEvent():void { // このオブジェクトにクリックが発生したら登録したメソッド(onMouseEvent)を実行、と読む addEventListener(MouseEvent.CLICK, onMouseEvent); doubleClickEnabled = true; // ダブルクリックの検出を可能にする addEventListener(MouseEvent.DOUBLE_CLICK, onMouseEvent); addEventListener(MouseEvent.MOUSE_DOWN, onMouseEvent); addEventListener(MouseEvent.MOUSE_MOVE, onMouseEvent); addEventListener(MouseEvent.MOUSE_OUT, onMouseEvent); addEventListener(MouseEvent.MOUSE_OVER, onMouseEvent); addEventListener(MouseEvent.MOUSE_UP, onMouseEvent); addEventListener(MouseEvent.MOUSE_WHEEL, onMouseEvent); } public function onMouseEvent(event:MouseEvent):void { event_state = event.type; trace(event_state); switch(event_state) { case MouseEvent.ROLL_OVER: this.color = 0x0006FA; init(); break; case MouseEvent.ROLL_OUT: this.color = 0xA3D5FF; init(); break; } } public function mousePosition():String { // この場合、軸の原点は円の中心(オブジェクトのSpriteを基準) return "("+ Math.floor(mouseX) + ", " + Math.floor(mouseY) + ")"; } public function getState():String { return event_state; } } } 
```


### EventMonitor.as

最後になりましたが、マウスイベントの内容やマウス座標の表示を行うEventMonitorクラスです。 ここでのイベントリスナーの登録は、

`addEventListener(Event.ENTER_FRAME, onEnterFrame);`

ですね。 フレームが更新される毎に、第二引数に登録したonEnterFrame()メソッドを実行します。Event.ENTER\_FRAMEはアニメーションさせる時に良く使うプロパティですが、ここではマウス座標やマウスクリックイベント情報を取得し出力する為に使われています。


```actionscript
 package info.yukun { import flash.display.Sprite; import flash.events.Event; import flash.text.*; public class EventMonitor extends Sprite { private var ball:Ball; // 観測オブジェクト private var monitor_label:TextField; // 表示ラベル private var TITLE:String; public function EventMonitor(ball:Ball) { this.ball = ball; init(); } public function init():void { TITLE = "イベントモニター"; monitor_label = new TextField(); monitor_label.text = TITLE; monitor_label.autoSize = TextFieldAutoSize.LEFT; monitor_label.selectable = false; addEventListener(Event.ENTER_FRAME, onEnterFrame); addChild(monitor_label); } private function onEnterFrame(event:Event):void { var text:String = TITLE + "\n"; text += "マウス座標(原点はボールの中心): " + ball.mousePosition() + "\n"; text += "発生イベント: " + ball.getState() + "\n"; monitor_label.text = text; } } } 
```


AS3になりJavaやC#に似て格段に扱いやすくなったように感じます。OOはGUIにマッチする設計手法ですしね。 話し変わりますが、以前windows.hを用いたGUIのコードではイベントループで悪戦苦闘してたっけ。今なら多少は上手く書けるかな。どうだろ。
