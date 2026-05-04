---
title: 'WebSphere MQ: Dead-letter キューのハンドリング - runmqdlq'
date: 2013-01-18
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-dead-letter-runmqdlq
---

[前回までの記事](/blog/websphere-mq-dead-letter "WebSphere MQ: Dead-letter キューへの保管 - DEADQ")の続き。WebSphere MQのDead-letterキューのハンドリング機能を確認する。参考文献は記事末尾をご参照。 
<!-- truncate -->
 前回はMQRC\_PUT\_INHIBITEDによってQL.Aへのputが失敗した為、当該Reasonの場合にQL.BにメッセージをフォワードするDLQ handler rulesを作成する。 ※参考：DLQ handler rules table (引用元：WebSphere MQ System Administration Guide Version 7.0)

> The DLQ handler rules table The DLQ handler rules table defines how the DLQ handler is to process messages that arrive on the DLQ. There are two types of entry in a rules table: ・The first entry in the table, which is optional, contains control data. ・All other entries in the table are rules for the DLQ handler to follow. Each rule consists of a pattern (a set of message characteristics) that a message is matched against, and an action to be taken when a message on the DLQ matches the specified pattern. There must be at least one rule in a rules table. Each entry in the rules table comprises one or more keywords.

### DLQハンドラーの起動

ルールを下記ファイルに記述する。

```
$ vi rules_dlq.txt
REASON (MQRC_PUT_INHIBITED) ACTION(FWD) +
FWDQ(QL.B) FWDQM(QMW) HEADER(NO)

```

最後に空行を入れておく。 作成したルールを元にrunmqdlqコマンドを用いてハンドラーを起動する。

```
$ runmqdlq DLQ QMW < rules_dlq.txt &
[1] 7834
$ 01/14/13  04:06:10  AMQ8708: Dead-letter queue handler started to process INPUTQ(DLQ).

```

QMCよりリモート・キュー定義経由でQL.Aへのputを試みる。[前回](/blog/websphere-mq-dead-letter "WebSphere MQ: Dead-letter キューへの保管 - DEADQ")はDLQへ転送されたが、今回はハンドラーが起動している為、ルールに従ってQL.Bへ転送される。

```
$ amqsput QRMT.A QMC
Sample AMQSPUT0 start
target queue is QRMT.A
I send a message from QMC to QL.B
Sample AMQSPUT0 end
$ amqsget QL.B QMW
Sample AMQSGET0 start
message 
message 
no more messages
Sample AMQSGET0 end
$

```

__確かにQL.Bにメッセージが転送されている。尚、メッセージが2件の内、1件目のものは前回の記事でDLQに滞留していたものがハンドラーの起動と同時に転送されたもの。 最後に後始末。

```
ALTER QL(QL.A) PUT(ENABLED)
    21 : ALTER QL(QL.A) PUT(ENABLED)
AMQ8008: WebSphere MQ queue changed.
CLEAR QL(QL.B)
    22 : CLEAR QL(QL.B)
AMQ8022: WebSphere MQ queue cleared.
CLEAR QL(QL.A)
    23 : CLEAR QL(QL.A)
AMQ8022: WebSphere MQ queue cleared.

```

### 参考文献

- WebSphere MQ System Administration Guide Version 7.0
- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)

__
