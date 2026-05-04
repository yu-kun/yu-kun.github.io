---
title: 'WebSphere MQ: メッセージの完全性 (2) メディア・リカバリー'
date: 2013-01-11
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-recovery
---

リニア・ロギングのキュー・マネージャのメディア・リカバリー機能を確認する。前回までの記事は[こちら](/blog/websphere-mq-persistent "WebSphere MQ: メッセージの完全性 (1) Persistent/Non Persistent Message")。参考文献は末尾に記載。 
<!-- truncate -->


### リニア・ロギングとは

下記に適当な説明があるので、引用させて頂く。 引用元：WebSphere MQ System Administration Guide Version 7.0

> Linear logging: Use linear logging if you want both restart recovery and media recovery (recreating lost or damaged data by replaying the contents of the log). Linear logging keeps the log data in a continuous sequence of files. Space is not reused, so you can always retrieve any record logged in any log extent that has not been deleted As disk space is finite, you might have to think about some form of archiving. It is an administrative task to manage your disk space for the log, reusing or extending the existing space as necessary.

線形的に増加していくタイプのロギング方式。メディア・リカバリー機能を使用するにはリニア・ロギング方式にする必要がある。尚、これとは対照的に循環ロギング(Circular Logging)と言うのもある。こちらはログファイルが環内で継続的に再利用されるため、ディスク容量はある一定までしか消費しない。キュー・マネージャーの作成コマンドcrtmqmではデフォルトでこの循環ロギング方式で作成する。

### キュー・マネージャーの環境作成

リニア・ロギングのキュー・マネージャーは-llオプションで作成する。

```
$ crtmqm -ll QMLL
WebSphere MQ queue manager created.
Directory '/var/mqm/qmgrs/QMLL' created.
Creating or replacing default objects for QMLL.
Default objects statistics : 65 created. 0 replaced. 0 failed.
Completing setup.
Setup completed.
$ strmqm QMLL
WebSphere MQ queue manager 'QMLL' starting.
11 log records accessed on queue manager 'QMLL' during the log replay phase.
Log replay for queue manager 'QMLL' complete.
Transaction manager state recovered for queue manager 'QMLL'.
WebSphere MQ queue manager 'QMLL' started.

```

続けてローカル・キュー、別名キューを作成しパーシステント、ノンパーシステント・メッセージをputする。

```
$ runmqsc QMLL
Starting MQSC for queue manager QMLL.
def ql(QL.A) defpsist(yes) replace
     1 : def ql(QL.A) defpsist(yes) replace
AMQ8006: WebSphere MQ queue created.
def qa(QA.A) targq(QL.A) defpsist(no) replace
     2 : def qa(QA.A) targq(QL.A) defpsist(no) replace
AMQ8006: WebSphere MQ queue created.
end
     3 : end
2 MQSC commands read.
No commands have a syntax error.
All valid MQSC commands were processed.
$ amqsput QL.A QMLL
Sample AMQSPUT0 start
target queue is QL.A
I put in QL.A
Sample AMQSPUT0 end
$ amqsput QA.A QMLL
Sample AMQSPUT0 start
target queue is QA.A
I put in QA.A
Sample AMQSPUT0 end
$

```

### メディア・リカバリー

#### メディア・イメージの取得

キュー・マネージャーはキューのメッセージ数が0になった際に、自動的にチェックポイントを作るが、今回はrcdmqimgを使用して、ローカル・キューのメディア・イメージを取得することでチェックポイントを強制的に作る。

```
$ rcdmqimg -m QMLL -t ql QL.A
Media image for object QL.A, type qlocal recorded.

```

#### キューの実体ファイルを削除

キューの障害を再現する為、QL.Aの実体ファイルを確認し削除する。

```
$ dspmqfls -m QMLL -t queue QL.A
WebSphere MQ Display MQ Files
QLOCAL    QL.A
/var/mqm/qmgrs/QMLL/queues/QL!A
$ rm '/var/mqm/qmgrs/QMLL/queues/QL!A/q'
$

```

#### キューの損傷を確認

```
$ amqsput QL.A QMLL
Sample AMQSPUT0 start
target queue is QL.A
MQOPEN ended with reason code 2101
unable to open queue for output
Sample AMQSPUT0 end
$ mqrc 2101
      2101  0x00000835  MQRC_OBJECT_DAMAGED
$ runmqsc QMLL
Starting MQSC for queue manager QMLL.
dis ql(QL.A)
     1 : dis ql(QL.A)
AMQ8149: WebSphere MQ object damaged.
   [2016, QL.A]

```

仮に上記の結果とならず、まだキューにメッセージをputできたら、キューに対して数件のメッセージをputする事で検知させる。(キュー・マネージャーのバッファリングや検知タイミングのずれがある為)

#### オブジェクトの再作成

rcrmqimgコマンドを用いてQL.Aキューを再作成する。

```
$ rcrmqobj -m QMLL -t ql QL.A
Object QL.A, type qlocal recreated.

```

QL.Aキューが復旧したか確認する。

```
$ runmqsc QMLL
Starting MQSC for queue manager QMLL.
dis ql(QL.A)
     1 : dis ql(QL.A)
AMQ8409: Display Queue details.
   QUEUE(QL.A)                             TYPE(QLOCAL)
   ACCTQ(QMGR)                             ALTDATE(2013-01-10)
   ALTTIME(04.27.37)                       BOQNAME( )
   BOTHRESH(0)                             CLUSNL( )
   CLUSTER( )                              CLWLPRTY(0)
   CLWLRANK(0)                             CLWLUSEQ(QMGR)
   CRDATE(2013-01-10)                      CRTIME(04.26.59)
   CURDEPTH(1)                             DEFBIND(OPEN)
   DEFPRTY(0)                              DEFPSIST(YES)
   DEFPRESP(SYNC)                          DEFREADA(NO)
   DEFSOPT(SHARED)                         DEFTYPE(PREDEFINED)
   DESCR( )                                DISTL(NO)
   GET(ENABLED)                            HARDENBO
   INITQ( )                                IPPROCS(0)
   MAXDEPTH(5000)                          MAXMSGL(4194304)
   MONQ(QMGR)                              MSGDLVSQ(PRIORITY)
   NOTRIGGER                               NPMCLASS(NORMAL)
   OPPROCS(0)                              PROCESS( )
   PUT(ENABLED)                            PROPCTL(COMPAT)
   QDEPTHHI(80)                            QDEPTHLO(20)
   QDPHIEV(DISABLED)                       QDPLOEV(DISABLED)
   QDPMAXEV(ENABLED)                       QSVCIEV(NONE)
   QSVCINT(999999999)                      RETINTVL(999999999)
   SCOPE(QMGR)                             SHARE
   STATQ(QMGR)                             TRIGDATA( )
   TRIGDPTH(1)                             TRIGMPRI(0)
   TRIGTYPE(FIRST)                         USAGE(NORMAL)
end
     2 : end
One MQSC command read.
No commands have a syntax error.
All valid MQSC commands were processed.
$ amqsgbr QL.A QMLL
Sample AMQSGBR0 (browse) start
QMLL
Messages for QL.A
1 
no more messages
Sample AMQSGBR0 (browse) end
$

```

_QL.Aのパーシステント・メッセージが確かにリカバリーできていることを確認できた。（またノンパーシステント・メッセージはリカバリーされていないことを確認できた。）

### 参考文献

- WebSphere MQ System Administration Guide Version 7.0

_
