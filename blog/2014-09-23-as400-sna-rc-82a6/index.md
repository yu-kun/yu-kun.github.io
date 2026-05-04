---
title: 'IBM System i (AS400): SNA通信における戻りコード82A6 (否定応答: negative-response)'
date: 2014-09-23
authors: [yukun]
tags:
  - as400
  - ibm
  - network
  - system-i
slug: as400-sna-rc-82a6
---

[SNA](http://en.wikipedia.org/wiki/IBM_Systems_Network_Architecture)関連のノウハウは[TCP/IP](http://en.wikipedia.org/wiki/Internet_protocol_suite)が席巻している昨今Web上のドキュメントや情報も公式を含めてなかなか無い。下記のコードは最近偶々遭遇したエラーコードであり、備忘録として翻訳記録しておく。 引用元：[IBM AS/400 Advanced Series APPC Programming Version 4](http://publib.boulder.ibm.com/iseries/v5r1/ic2924/books/c4154430.pdf)のB-19 (123/301)を参照 
<!-- truncate -->


## RC(Return Code)=82A6

### 説明

> ユーザー・プログラムによって試みられたオープンあるいは獲得命令中、セッション開始の為にSNA BINDコマンドをユーザーに送信したときにセンス・データとともに否定応答(negative-response)が受信されました。セッションは開始されませんでした。

### 処置

> ファイルをクローズしてください。正常に行われなかったBINDコマンドの形式にエラーがあるかどうかを調べて下さい。パートナー・システムに連携してコマンドが失敗した理由を調べて下さい。エラー修正後、ユーザー・プログラムは再度獲得命令を出してセッションを開始することが出来ます。

### メッセージ

>  CPF4333 (Escape)  CPF5281 (Escape)  CPF5538 (Escape)
