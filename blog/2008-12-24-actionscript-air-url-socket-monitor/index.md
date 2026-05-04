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
