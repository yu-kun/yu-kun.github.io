---
title: 'WebSphere MQ: トリガリング (2) amqsinq サンプル・プログラム'
date: 2013-01-09
authors: [yukun]
tags:
  - c-language
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-trigger-amqsinq
---

[前回の記事](/blog/websphere-mq-trigger "WebSphere MQ: トリガリング – TRIGGER, runmqtrm")の続編。ここでは、WebSphere MQのトリガリング機能をサンプル・プログラムであるamqsinqを用いて確認する。 
<!-- truncate -->


### amqsinqとは

ソーズコードはLinuxでは下記に保管されている。 保管先：/opt/mqm/samp/amqsinqa.c プログラムのロジックはソース中のコメントに分かりやすいものが記載されていたので、引用させて頂く。 

```c
 /*  Program logic:                                                  */
 /*     MQCONNect to message queue manager                           */
 /*     MQOPEN message queue (A) for shared input                    */
 /*     while no MQI failures,                                       */
 /*     .  MQGET next message from queue A                           */
 /*     .  if message is a request,                                  */
 /*     .  .  MQOPEN queue (B) named in request message for INQUIRE  */
 /*     .  .  Use MQINQ, find values of some of B's attributes       */
 /*     .  .  Prepare reply message if MQINQ was successful          */
 /*     .  .  MQCLOSE queue B                                        */
 /*     .  .  Prepare a report message if reply not available        */
 /*     .  .  MQPUT1, send reply or report to named reply queue      */
 /*     MQCLOSE queue A                                              */
 /*     MQDISConnect from queue manager                              */
 /*                                                                  */
 /*                                                                  */
 /********************************************************************/
 /*                                                                  */
 /*   AMQSINQA has 1 parameter - a string (MQTMC2) based on the      */
 /*       initiation trigger message; only the QName and queue       */
 /*       manager name fields are used in this example               */
 /*                                                                  */
 /********************************************************************/
```

 amqsechと同じく、amqsinqもトリガー・モニター経由で起動される。トリガー・モニターより渡された構造体内で指定されているキューからメッセージを順々にgetし、そのメッセージをキューの名前としてMQINQをcallする。その結果を構造体内で指定されているReply-toキューにputする。

### 現状の構成コンポーネント

[前回](/blog/websphere-mq-trigger "WebSphere MQ: トリガリング – TRIGGER, runmqtrm")迄に下記のキュー、プロセス・オブジェクトを作成している。

```
     1 : def ql(QL.INITQ) replace
AMQ8006: WebSphere MQ queue created.
     2 : def ql(QL.A) replace +
       : trigger trigtype(first) +
       : process(PR.ECHO) +
       : initq(QL.INITQ)
AMQ8006: WebSphere MQ queue created.
     3 : def process(PR.ECHO) replace +
       : applicid('/opt/mqm/samp/bin/amqsech')
AMQ8010: WebSphere MQ process created.
     4 : def qmodel(QM.REPLY) replace
AMQ8006: WebSphere MQ queue created.

```

上記の加えて、amqsinq用のプロセス・オブジェクトを新規に作成し、OL.Aキューが参照するプロセス・オブジェクトをamqsinq用に変更する。

```
def process(PR.INQ) replace applicid('/opt/mqm/samp/bin/amqsinq')
     2 : def process(PR.INQ) replace applicid('/opt/mqm/samp/bin/amqsinq')
AMQ8010: WebSphere MQ process created.
alter ql(QL.A) process(PR.INQ)
     3 : alter ql(QL.A) process(PR.INQ)
AMQ8008: WebSphere MQ queue changed.

```

### amqsinqを用いた検証

先ず、下記のコマンドでトリガー・モニターを起動。

```
$ runmqtrm -q QL.INITQ -m qmgr1

```

その後、別のプロンプトでamqsreqを起動する。

```
$ amqsreq QL.A qmgr1 QM.REPLY

```

#### トリガー・モニターの結果

```
$ runmqtrm -q QL.INITQ -m qmgr1
01/08/13  05:18:05 : WebSphere MQ trigger monitor started.
__________________________________________________
01/08/13  05:18:05 : Waiting for a trigger message
/opt/mqm/samp/bin/amqsinq 'TMC    2QL.A                                            PR.INQ                                                                                                              /opt/mqm/samp/bin/amqsinq                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       qmgr1                                           '
Sample AMQSINQA start
QL.A
MQGET ended with reason code 2033
Sample AMQSINQA end
01/08/13  05:19:03 : End of application trigger.
__________________________________________________
01/08/13  05:19:03 : Waiting for a trigger message
/opt/mqm/samp/bin/amqsinq 'TMC    2QL.A                                            PR.INQ                                                                                                              /opt/mqm/samp/bin/amqsinq                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       qmgr1                                           '
Sample AMQSINQA start
SYSTEM.SAMPLE.REPLY
MQGET ended with reason code 2033
Sample AMQSINQA end
01/08/13  05:19:41 : End of application trigger.
__________________________________________________
01/08/13  05:19:41 : Waiting for a trigger message
/opt/mqm/samp/bin/amqsinq 'TMC    2QL.A                                            PR.INQ                                                                                                              /opt/mqm/samp/bin/amqsinq                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       qmgr1                                           '
Sample AMQSINQA start
system.samp.ql
MQGET ended with reason code 2033
Sample AMQSINQA end
01/08/13  05:19:51 : End of application trigger.
__________________________________________________
01/08/13  05:19:51 : Waiting for a trigger message

```

#### amqsreq側のプロンプトの実行結果

```
$ amqsreq QL.A qmgr1 QM.REPLY
Sample AMQSREQ0 start
server queue is QL.A
replies to AMQ.50EC1B4320001E02
QL.A
SYSTEM.SAMPLE.REPLY
system.samp.ql
response
response
response
  report with feedback = 2085
no more replies
Sample AMQSREQ0 end
$

```

QL.AやSYSTEM.SAMPLE.REPLY等の存在するキューにつては属性値を出力している。反対に存在しないキューについてはrc=2085(MQRC\_UNKNOWN\_OBJECT\_NAME)を返している。

### 参考ドキュメント

- WebSphere MQ Application Programming Guide Version 7.0
- WebSphere MQ System Administration Guide Version 7.0
