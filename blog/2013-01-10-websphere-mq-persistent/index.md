---
title: 'WebSphere MQ: メッセージの完全性 (1) Persistent/Non Persistent Message'
date: 2013-01-10
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-persistent
---

WebSphere MQにおけるキュー・マネージャー再起動後のローカル・キュー上のパーシステント・メッセージ、ノンパーシステント・メッセージの状態を確認する。(当ブログのWebSphere MQに関する前回の記事は[こちら](/blog/websphere-mq-trigger-amqsinq "WebSphere MQ: トリガリング (2) amqsinq サンプル・プログラム")。参考文献は記事末尾をご参照。) 
<!-- truncate -->
 結論から言うと、Persistentメッセージ(ディスク上)はキュー・マネージャーの再起動後も存続し、Non Persistentメッセージ(メモリ上)は消える。

### キュー構成の定義

MQSCコマンド・インターフェイスを用いて下記の様にローカル・キューおよび別名キューを作成する。

```
$ runmqsc qmgr1
Starting MQSC for queue manager qmgr1.
def ql(QL.A) defpsist(yes) replace
     1 : def ql(QL.A) defpsist(yes) replace
AMQ8006: WebSphere MQ queue created.
dis ql(QL.A) defpsist
     2 : dis ql(QL.A) defpsist
AMQ8409: Display Queue details.
   QUEUE(QL.A)                             TYPE(QLOCAL)
   DEFPSIST(YES)
def qa(QA.A) targq(QL.A) defpsist(no) replace
     3 : def qa(QA.A) targq(QL.A) defpsist(no) replace
AMQ8006: WebSphere MQ queue created.
dis qa(QA.A) defpsist
     4 : dis qa(QA.A) defpsist
AMQ8409: Display Queue details.
   QUEUE(QA.A)                             TYPE(QALIAS)
   DEFPSIST(NO)
end
     5 : end
4 MQSC commands read.
No commands have a syntax error.
All valid MQSC commands were processed.
$

```

Default Persistent属性がYESのローカル・キューQL.AとNOの別名キューQA.Aを作成した。

### Persistent/Non Persistent MSGのPUT

これらのキューに対してamqsputサンプル・プログラムでメッセージをputすると対象キューのdefPersistence属性の値により、キューにputされるメッセージがPersistentかNon Persistentかが決まる。

```
$ amqsput QL.A qmgr1
Sample AMQSPUT0 start
target queue is QL.A
I put in QL.A
Sample AMQSPUT0 end
$ amqsput QA.A qmgr1
Sample AMQSPUT0 start
target queue is QA.A
I put in QA.A
Sample AMQSPUT0 end

```

putされたメッセージの属性をamqsbcgサンプル・プログラムを用いて確認する。

```
$ amqsbcg QL.A qmgr1
AMQSBCG0 - starts here
**********************
 MQOPEN - 'QL.A'
 MQGET of message number 1
****Message descriptor****
  StrucId  : 'MD  '  Version : 2
  Report   : 0  MsgType : 8
  Expiry   : -1  Feedback : 0
  Encoding : 546  CodedCharSetId : 1208
  Format : 'MQSTR   '
  Priority : 0  Persistence : 1
  MsgId : X'414D5120716D677231202020202020205F73ED50021D0020'
  CorrelId : X'000000000000000000000000000000000000000000000000'
  BackoutCount : 0
  ReplyToQ       : '                                                '
  ReplyToQMgr    : 'qmgr1                                           '
  ** Identity Context
  UserIdentifier : 'mqm         '
  AccountingToken :
   X'0334393600000000000000000000000000000000000000000000000000000006'
  ApplIdentityData : '                                '
  ** Origin Context
  PutApplType    : '6'
  PutApplName    : 'amqsput                     '
  PutDate  : '20130109'    PutTime  : '14022748'
  ApplOriginData : '    '
  GroupId : X'000000000000000000000000000000000000000000000000'
  MsgSeqNumber   : '1'
  Offset         : '0'
  MsgFlags       : '0'
  OriginalLength : '-1'
****   Message      ****
 length - 13 bytes
00000000:  4920 7075 7420 696E 2051 4C2E 41        'I put in QL.A   '
 MQGET of message number 2
****Message descriptor****
  StrucId  : 'MD  '  Version : 2
  Report   : 0  MsgType : 8
  Expiry   : -1  Feedback : 0
  Encoding : 546  CodedCharSetId : 1208
  Format : 'MQSTR   '
  Priority : 0  Persistence : 0
  MsgId : X'414D5120716D677231202020202020205F73ED50041D0020'
  CorrelId : X'000000000000000000000000000000000000000000000000'
  BackoutCount : 0
  ReplyToQ       : '                                                '
  ReplyToQMgr    : 'qmgr1                                           '
  ** Identity Context
  UserIdentifier : 'mqm         '
  AccountingToken :
   X'0334393600000000000000000000000000000000000000000000000000000006'
  ApplIdentityData : '                                '
  ** Origin Context
  PutApplType    : '6'
  PutApplName    : 'amqsput                     '
  PutDate  : '20130109'    PutTime  : '14024684'
  ApplOriginData : '    '
  GroupId : X'000000000000000000000000000000000000000000000000'
  MsgSeqNumber   : '1'
  Offset         : '0'
  MsgFlags       : '0'
  OriginalLength : '-1'
****   Message      ****
 length - 13 bytes
00000000:  4920 7075 7420 696E 2051 412E 41        'I put in QA.A   '
 No more messages
 MQCLOSE
 MQDISC

```

確かにQL.AにputしたメッセージはPersistence : 1で、QA.AにputしたメッセージはPersistence : 0となり、それぞれ、キューのdefPersistence属性に沿ったメッセージがputされていることが分かる。

### キュー・マネージャーの停止→再起動

障害の発生を想定してendmqm -i オプションで即時終了(実行中のMQIコール終了後に終了)させた後、再度起動し、各メッセージの存続を確認する。

```
$ endmqm -i qmgr1
WebSphere MQ queue manager 'qmgr1' ending.
WebSphere MQ queue manager 'qmgr1' ended.
$ strmqm qmgr1
WebSphere MQ queue manager 'qmgr1' starting.
5 log records accessed on queue manager 'qmgr1' during the log replay phase.
Log replay for queue manager 'qmgr1' complete.
Transaction manager state recovered for queue manager 'qmgr1'.
WebSphere MQ queue manager 'qmgr1' started.
$ amqsbcg QL.A qmgr1
AMQSBCG0 - starts here
**********************
 MQOPEN - 'QL.A'
 MQGET of message number 1
****Message descriptor****
  StrucId  : 'MD  '  Version : 2
  Report   : 0  MsgType : 8
  Expiry   : -1  Feedback : 0
  Encoding : 546  CodedCharSetId : 1208
  Format : 'MQSTR   '
  Priority : 0  Persistence : 1
  MsgId : X'414D5120716D677231202020202020205F73ED50021D0020'
  CorrelId : X'000000000000000000000000000000000000000000000000'
  BackoutCount : 0
  ReplyToQ       : '                                                '
  ReplyToQMgr    : 'qmgr1                                           '
  ** Identity Context
  UserIdentifier : 'mqm         '
  AccountingToken :
   X'0334393600000000000000000000000000000000000000000000000000000006'
  ApplIdentityData : '                                '
  ** Origin Context
  PutApplType    : '6'
  PutApplName    : 'amqsput                     '
  PutDate  : '20130109'    PutTime  : '14022748'
  ApplOriginData : '    '
  GroupId : X'000000000000000000000000000000000000000000000000'
  MsgSeqNumber   : '1'
  Offset         : '0'
  MsgFlags       : '0'
  OriginalLength : '-1'
****   Message      ****
 length - 13 bytes
00000000:  4920 7075 7420 696E 2051 4C2E 41        'I put in QL.A   '
 No more messages
 MQCLOSE
 MQDISC

```

確かに、Non Persistent メッセージが消えていることを確認できた。

### 参考ドキュメント

- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)
- WebSphere MQ System Administration Guide Version 7.0
