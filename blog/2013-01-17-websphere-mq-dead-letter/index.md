---
title: 'WebSphere MQ: Dead-letter キューへの保管 - DEADQ'
date: 2013-01-17
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-dead-letter
---

[前回までの記事](/blog/websphere-mq-channel-initiator "WebSphere MQ: 分散キューイング (3) チャネル・イニシエーター")の続き。WebSphere MQのDead-letterキューのハンドリングの機能を確認する。参考文献は記事末尾をご参照。 
<!-- truncate -->


### Dead-letterキューとは

以下に適当な記述があった為、引用させて頂く。 引用元：WebSphere MQ System Administration Guide Version 7.0

> Dead-letter queues A dead-letter (undelivered-message) queue is a queue that stores messages that cannot be routed to their correct destinations. This occurs when, for example, the destination queue is full. The supplied dead-letter queue is called SYSTEM.DEAD.LETTER.QUEUE. For distributed queuing, define a dead-letter queue on each queue manager involved.

指定の宛先にメッセージを保管できない場合に保管するキューでキュー・マネージャー上で定義される。例として宛先がキューフルの場合などにdead-letterキューに保管される。尚、仮にDead-letterキューにputできないと、チャネルは停止し、メッセージがトランスミッション・キューに残る。

### Dead-letterキューの定義

[前の記事](/blog/websphere-mq-sender-receiver "WebSphere MQ: 分散キューイング (1) Sender, Receiver")(分散キューイング)のところでDLQというDead-letterキューは既に定義している。

```
DEF QL(DLQ) REPLACE
ALTER QMGR DEADQ(DLQ)

```

### Dead-letterキューの動作確認

キュー・マネージャーQMW上のQL.AのputをDISABLEDにする事でQL.Aにputできない状態を作り、QMCよりメッセージを伝送することで、QMW上でメッセージがDead-letterキューに保管されることを確認する。 事前準備として、QMW上で下記のコマンドをmqscインターフェース上で実行。

```
CLEAR QL(QL.A)
    15 : CLEAR QL(QL.A)
AMQ8022: WebSphere MQ queue cleared.
CLEAR QL(QL.B)
    16 : CLEAR QL(QL.B)
AMQ8022: WebSphere MQ queue cleared.
CLEAR QL(DLQ)
    17 : CLEAR QL(DLQ)
AMQ8022: WebSphere MQ queue cleared.
ALTER QL(QL.A) PUT(DISABLED)
    18 : ALTER QL(QL.A) PUT(DISABLED)
AMQ8008: WebSphere MQ queue changed.

```

続いて、QMCよりリモート・キュー定義(QMWのQL.Aを参照している)に対してamqsputでメッセージをputする。

```
$ amqsput QRMT.A QMC
Sample AMQSPUT0 start
target queue is QRMT.A
I send a message from QMC.
Sample AMQSPUT0 end
$ amqsbcg QL.A QMW
AMQSBCG0 - starts here
**********************
 MQOPEN - 'QL.A'
 No more messages
 MQCLOSE
 MQDISC$
$

```

しかし、QMW上のQL.AはPUTできない為、QL.Aにはメッセージが到達せず、dead-letterキューにメッセージが格納されている。

```
DIS QL(DLQ) CURDEPTH
    19 : DIS QL(DLQ) CURDEPTH
AMQ8409: Display Queue details.
   QUEUE(DLQ)                              TYPE(QLOCAL)
   CURDEPTH(1)

```

amqsbcgを用いて、Dead-letterヘッダーを確認する。

```
$ amqsbcg DLQ QMW
AMQSBCG0 - starts here
**********************
 MQOPEN - 'DLQ'
 MQGET of message number 1
****Message descriptor****
  StrucId  : 'MD  '  Version : 2
  Report   : 0  MsgType : 8
  Expiry   : -1  Feedback : 0
  Encoding : 546  CodedCharSetId : 819
  Format : 'MQDEAD  '
  Priority : 0  Persistence : 0
  MsgId : X'414D5120514D432020202020202020209093F25002510020'
  CorrelId : X'000000000000000000000000000000000000000000000000'
  BackoutCount : 0
  ReplyToQ       : '                                                '
  ReplyToQMgr    : 'QMC                                             '
  ** Identity Context
  UserIdentifier : 'mqm         '
  AccountingToken :
   X'0334393600000000000000000000000000000000000000000000000000000006'
  ApplIdentityData : '                                '
  ** Origin Context
  PutApplType    : '6'
  PutApplName    : 'amqsput                     '
  PutDate  : '20130114'    PutTime  : '11241665'
  ApplOriginData : '    '
  GroupId : X'000000000000000000000000000000000000000000000000'
  MsgSeqNumber   : '1'
  Offset         : '0'
  MsgFlags       : '0'
  OriginalLength : '-1'
****   Message      ****
 length - 198 bytes
00000000:  444C 4820 0100 0000 0308 0000 514C 2E41 'DLH ........QL.A'
00000010:  2020 2020 2020 2020 2020 2020 2020 2020 '                '
00000020:  2020 2020 2020 2020 2020 2020 2020 2020 '                '
00000030:  2020 2020 2020 2020 2020 2020 514D 5720 '            QMW '
00000040:  2020 2020 2020 2020 2020 2020 2020 2020 '                '
00000050:  2020 2020 2020 2020 2020 2020 2020 2020 '                '
00000060:  2020 2020 2020 2020 2020 2020 2202 0000 '            "...'
00000070:  3303 0000 4D51 5354 5220 2020 0600 0000 '3...MQSTR   ....'
00000080:  616D 7172 6D70 7061 2020 2020 2020 2020 'amqrmppa        '
00000090:  2020 2020 2020 2020 2020 2020 3230 3133 '            2013'
000000A0:  3031 3134 3131 3234 3236 3737 4920 7365 '011411242677I se'
000000B0:  6E64 2061 206D 6573 7361 6765 2066 726F 'nd a message fro'
000000C0:  6D20 514D 432E                          'm QMC.          '
 No more messages
 MQCLOSE
 MQDISC$
$

```

4バイトのReasonコード(headerの9〜12バイト)を確認すると0308 0000と分かるが、検証環境はMac(Intel製CPU)の為リトルエンディアンを正しく解釈するとコードは00000803となる。

```
$ mqrc 0x00000803
      2051  0x00000803  MQRC_PUT_INHIBITED

```

### 参考文献

- WebSphere MQ System Administration Guide Version 7.0
- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)
