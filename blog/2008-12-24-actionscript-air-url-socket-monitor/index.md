---
title: 'AIR: Webサーバ、Socketの接続状況を検知 - URLMonitor、SocketMonitorクラス'
date: 2008-12-24
authors: [yukun]
tags:
  - actionscript
  - air
  - gui
  - network
  - socket
slug: actionscript-air-url-socket-monitor
---

任意のアドレスのWebサイト\[サービス\]のネットワーク状況を検知するURLMonitorと、任意のサーバ＋ポートに接続可能か否かを検知するSocketMonitorクラスの動作サンプルを下記に示します。

## ソースコード


```actionscript
<?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute"
  applicationComplete="startup()">
  <mx:Script>
    <![CDATA[
    import air.net.SocketMonitor
    import air.net.URLMonitor;
    import flash.net.URLRequest;
    import flash.events.StatusEvent;
    private var SERVER_URL:String = "http://www.yukun.info/";
    private var SOCK_ADRR:String = "yukun.info";
    private var PORT:int = 6667;
    private var INTERVAL_TIME:int = 3000; // ms
    private var serviceMonitor:URLMonitor = null;
    private var socketMonitor:SocketMonitor = null;
    private function startup():void {
      var endpoint:URLRequest = new URLRequest(SERVER_URL);
      serviceMonitor = new URLMonitor(endpoint);
      serviceMonitor.addEventListener(StatusEvent.STATUS, onStatusEvent);
      serviceMonitor.pollInterval = INTERVAL_TIME;
      serviceMonitor.start();
      socketMonitor = new SocketMonitor(SOCK_ADRR, PORT);
      socketMonitor.addEventListener(StatusEvent.STATUS, onSocketStatusChange);
      socketMonitor.pollInterval = INTERVAL_TIME;
      socketMonitor.start();
    }
    // ネットワークサービスの状態の検知
    private function onStatusEvent(e:StatusEvent):void {
      var date:Date = new Date();
      trace(date.toLocaleTimeString());
      trace(SERVER_URL + "に" + (serviceMonitor.available ? "接続可" : "切断中"));
    }
    private function onSocketStatusChange(e:StatusEvent):void {
      trace(SOCK_ADRR + "のポート" + PORT + "は" +
        (socketMonitor.available ? "接続可" : "切断中"));
    }
    ]]]]><![CDATA[>
  </mx:Script>
</mx:WindowedApplication>
```


## 実行結果

```
http://www.yukun.info/に接続可
yukun.infoのポート6667は切断中

```

URLMonitorはネットワーク状況を検知する為にサーバへGETリクエストを送出して、レスポンスのステイタスコードを確認して判断しているようです↓。

### リファレンス

- URLMonitor - ActionScript 3.0 言語およびコンポーネントリファレンス
- Adobe AIR 1.1 \* ネットワーク接続の監視
