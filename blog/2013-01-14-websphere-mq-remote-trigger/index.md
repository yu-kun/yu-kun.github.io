---
title: 'WebSphere MQ: 分散キューイング (2) リモート・トリガリング'
date: 2013-01-14
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-remote-trigger
---

[前回の記事](/blog/websphere-mq-sender-receiver "WebSphere MQ: 分散キューイング (1) Sender, Receiver")の続き。WebSphere MQの分散キューイングにおいて、リモート・キューに対してトリガリング設定し、その動作を確認する。トリガリングの構成方法は[こちらの記事](/blog/websphere-mq-trigger "WebSphere MQ: トリガリング (1) TRIGGER属性, runmqtrmコマンド")をご参照。参考文献は記事末尾をご参照。 
<!-- truncate -->


### リモート・トリガリングの構成

QMC, QMW上のローカル・キューのトリガー機能をアクティブにする。続いて、amqsreqを用いてローカル・キューにリモートからメッセージがputする。putをトリガーにamqsechを起動させ、Replyメッセージを生成する。最終的にそのメッセージをamqsreqがgetし出力する。 下記のスクリプトを用いてトリガー機能の有効化、及びイニシエーション・キュー、プロセス・オブジェクトの定義を行う。その後、それぞれのキュー・マネージャー上でトリガー・モニターを起動する。

#### exe2.txt

```
def ql(QL.INITQ) replace
def ql(QL.A) replace +
trigger trigtype(first) +
process(PR.ECHO) +
initq(QL.INITQ)
def process(PR.ECHO) replace +
applicid('/opt/mqm/samp/bin/amqsech')
def qmodel(QM.REPLY) replace

```

#### QMC側の構成

```
$ runmqsc QMC < exe2.txt
$ runmqtrm -q QL.INITQ -m QMC
01/13/13  07:17:46 : WebSphere MQ trigger monitor started.
__________________________________________________
01/13/13  07:17:46 : Waiting for a trigger message

```

#### QMW側の構成

```
$ runmqsc QMW < exe2.txt
$ runmqtrm -q QL.INITQ -m QMW
01/13/13  07:17:24 : WebSphere MQ trigger monitor started.
__________________________________________________
01/13/13  07:17:24 : Waiting for a trigger message

```

### メッセージの送信

QMC→QMWへのamqsreqによる検証を行う。

#### QMC側のコマンドプロンプト

```
$ amqsreq QRMT.A QMC QM.REPLY
Sample AMQSREQ0 start
server queue is QRMT.A
replies to AMQ.50F2939020003F02
I send a message from QMC
response 
no more replies
Sample AMQSREQ0 end
$

```

_

#### QMW側のトリガー・モニター

```
__________________________________________________
01/13/13  07:23:01 : Waiting for a trigger message
/opt/mqm/samp/bin/amqsech 'TMC    2QL.A                                            PR.ECHO                                                                                                             /opt/mqm/samp/bin/amqsech                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       QMW                                             '
Sample AMQSECHA start
I send a message from QMC
MQGET ended with reason code 2033
Sample AMQSECHA end
01/13/13  07:23:53 : End of application trigger.
__________________________________________________
01/13/13  07:23:53 : Waiting for a trigger message

```

続いてQMW→QMCの検証を行う。

#### QMW側のコマンドプロンプト

```
$ amqsreq QRMT.A QMW QM.REPLY
Sample AMQSREQ0 start
server queue is QRMT.A
replies to AMQ.50F2979C20002C02
Hello World from QMW.
response
no more replies
Sample AMQSREQ0 end
$

```

#### QMW側のトリガー・モニター

```
01/13/13  07:17:46 : Waiting for a trigger message
/opt/mqm/samp/bin/amqsech 'TMC    2QL.A                                            PR.ECHO                                                                                                             /opt/mqm/samp/bin/amqsech                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       QMC                                             '
Sample AMQSECHA start
Hello World from QMW.
MQGET ended with reason code 2033
Sample AMQSECHA end
01/13/13  07:31:25 : End of application trigger.
__________________________________________________
01/13/13  07:31:25 : Waiting for a trigger message

```

確かに、メッセージがリモートのキューマネージャにputしたメッセージがトリガリングによって、Reply-toキューに返信され、出力できていることを確認できた。

### 参考文献

- WebSphere MQ System Administration Guide Version 7.0
- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)
- [MQ設計虎の巻: 第2回「WebSphere MQの特長と主な機能（後編）」](http://www.ibm.com/developerworks/jp/websphere/library/wmq/toranomaki/2.html)

_
