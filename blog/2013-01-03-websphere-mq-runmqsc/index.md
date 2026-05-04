---
title: 'WebSphere MQ: runmqsc制御コマンドI/F(プロンプト・ファイル)'
date: 2013-01-03
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-runmqsc
---

runmqsc制御コマンド・インターフェイスの動作確認。[実行環境はLinux (CentOS v6.3)](/blog/websphere-mq-linux-install "WebSphere MQ: Linuxへのインストール")。この記事で使用しているキュー・マネージャーの作成、起動は[こちら](/blog/websphere-mq-crt-str-end)の記事に記載。参考サイトは記事末尾をご参照。 
<!-- truncate -->


### 対話モードでのrunmqsc制御コマンドの使用

#### プロンプト起動

```
$ runmqsc qmgr1
Starting MQSC for queue manager qmgr1.

```

引数にキュー・マネージャーを指定。

#### キュー・マネージャーの全属性の表示

```
dis qmgr
     1 : dis qmgr
AMQ8408: Display Queue Manager details.
   QMNAME(qmgr1)                           ACCTCONO(DISABLED)
   ACCTINT(1800)                           ACCTMQI(OFF)
   ACCTQ(OFF)                              ACTIVREC(MSG)
   ALTDATE(2012-12-31)                     ALTTIME(17.31.53)
   AUTHOREV(DISABLED)                      CCSID(1208)
   CHAD(DISABLED)                          CHADEV(DISABLED)
   CHADEXIT( )                             CHLEV(DISABLED)
   CLWLDATA( )                             CLWLEXIT( )
   CLWLLEN(100)                            CLWLMRUC(999999999)
   CLWLUSEQ(LOCAL)                         CMDEV(DISABLED)
   CMDLEVEL(701)                           COMMANDQ(SYSTEM.ADMIN.COMMAND.QUEUE)
   CONFIGEV(DISABLED)                      CRDATE(2012-12-31)
   CRTIME(17.31.53)                        DEADQ( )
   DEFXMITQ( )                             DESCR( )
   DISTL(YES)                              INHIBTEV(DISABLED)
   IPADDRV(IPV4)                           LOCALEV(DISABLED)
   LOGGEREV(DISABLED)                      MARKINT(5000)
   MAXHANDS(256)                           MAXMSGL(4194304)
   MAXPROPL(NOLIMIT)                       MAXPRTY(9)
   MAXUMSGS(10000)                         MONACLS(QMGR)
   MONCHL(OFF)                             MONQ(OFF)
   PARENT( )                               PERFMEV(DISABLED)
   PLATFORM(UNIX)                          PSRTYCNT(5)
   PSNPMSG(DISCARD)                        PSNPRES(NORMAL)
   PSSYNCPT(IFPER)                         QMID(qmgr1_2012-12-31_17.31.53)
   PSMODE(ENABLED)                         REMOTEEV(DISABLED)
   REPOS( )                                REPOSNL( )
   ROUTEREC(MSG)                           SCHINIT(QMGR)
   SCMDSERV(QMGR)                          SSLCRLNL( )
   SSLCRYP( )                              SSLEV(DISABLED)
   SSLFIPS(NO)
   SSLKEYR(/var/mqm/qmgrs/qmgr1/ssl/key)
   SSLRKEYC(0)                             STATACLS(QMGR)
   STATCHL(OFF)                            STATINT(1800)
   STATMQI(OFF)                            STATQ(OFF)
   STRSTPEV(ENABLED)                       SYNCPT
   TREELIFE(1800)                          TRIGINT(999999999)

```

#### systemで始まる全てのキュー名を表示

```
dis q(system*)
     2 : dis q(system*)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.ACCOUNTING.QUEUE)    TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.ACTIVITY.QUEUE)      TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.CHANNEL.EVENT)       TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.COMMAND.EVENT)       TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.COMMAND.QUEUE)       TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.CONFIG.EVENT)        TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.LOGGER.EVENT)        TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.PERFM.EVENT)         TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.QMGR.EVENT)          TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.STATISTICS.QUEUE)    TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.ADMIN.TRACE.ROUTE.QUEUE)   TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.AUTH.DATA.QUEUE)           TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.BROKER.ADMIN.STREAM)       TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.BROKER.CONTROL.QUEUE)      TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.BROKER.DEFAULT.STREAM)     TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.BROKER.INTER.BROKER.COMMUNICATIONS)
   TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.CHANNEL.INITQ)             TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.CHANNEL.SYNCQ)             TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.CICS.INITIATION.QUEUE)     TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.CLUSTER.COMMAND.QUEUE)     TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.CLUSTER.HISTORY.QUEUE)     TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.CLUSTER.REPOSITORY.QUEUE)
   TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.CLUSTER.TRANSMIT.QUEUE)    TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.DEAD.LETTER.QUEUE)         TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.DEFAULT.ALIAS.QUEUE)       TYPE(QALIAS)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.DEFAULT.INITIATION.QUEUE)
   TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.DEFAULT.LOCAL.QUEUE)       TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.DEFAULT.MODEL.QUEUE)       TYPE(QMODEL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.DEFAULT.REMOTE.QUEUE)      TYPE(QREMOTE)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.DURABLE.MODEL.QUEUE)       TYPE(QMODEL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.DURABLE.SUBSCRIBER.QUEUE)
   TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.HIERARCHY.STATE)           TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.INTER.QMGR.CONTROL)        TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.INTER.QMGR.FANREQ)         TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.INTER.QMGR.PUBS)           TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.INTERNAL.REPLY.QUEUE)      TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.MQEXPLORER.REPLY.MODEL)    TYPE(QMODEL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.MQSC.REPLY.QUEUE)          TYPE(QMODEL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.NDURABLE.MODEL.QUEUE)      TYPE(QMODEL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.PENDING.DATA.QUEUE)        TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.RETAINED.PUB.QUEUE)        TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SAMPLE.ALIAS)              TYPE(QALIAS)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SAMPLE.ECHO)               TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SAMPLE.INQ)                TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SAMPLE.LOCAL)              TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SAMPLE.REMOTE)             TYPE(QREMOTE)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SAMPLE.REPLY)              TYPE(QMODEL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SAMPLE.SET)                TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SAMPLE.TRIGGER)            TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SELECTION.EVALUATION.QUEUE)
   TYPE(QLOCAL)
AMQ8409: Display Queue details.
   QUEUE(SYSTEM.SELECTION.VALIDATION.QUEUE)
   TYPE(QLOCAL)

```

#### ローカルキューの作成

```
def ql(ql.a) descr('ql.a for qmgr1 in 2013-01-01')
     3 : def ql(ql.a) descr('ql.a for qmgr1 in 2013-01-01')
AMQ8006: WebSphere MQ queue created.

```

DESCRパラメータにキュー定義に対する説明を付与可能。

#### キューの全属性を表示

```
dis ql(ql.a)
     4 : dis ql(ql.a)
AMQ8409: Display Queue details.
   QUEUE(QL.A)                             TYPE(QLOCAL)
   ACCTQ(QMGR)                             ALTDATE(2012-12-31)
   ALTTIME(20.31.53)                       BOQNAME( )
   BOTHRESH(0)                             CLUSNL( )
   CLUSTER( )                              CLWLPRTY(0)
   CLWLRANK(0)                             CLWLUSEQ(QMGR)
   CRDATE(2012-12-31)                      CRTIME(20.31.53)
   CURDEPTH(0)                             DEFBIND(OPEN)
   DEFPRTY(0)                              DEFPSIST(NO)
   DEFPRESP(SYNC)                          DEFREADA(NO)
   DEFSOPT(SHARED)                         DEFTYPE(PREDEFINED)
   DESCR(ql.a for qmgr1 in 2013-01-01)     DISTL(NO)
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

```

ローカル・キューを作成する際に、指定しなかった属性はSYSTEM.DEFAULT.LOCAL.QUEUEの値に設定される。

#### キューの構成変更

MAXDEPTHを2000に変更、その結果を確認する(設定したDESCRパラメータも合わせて確認している)。

```
alter ql(ql.a) maxdepth(2000)
     5 : alter ql(ql.a) maxdepth(2000)
AMQ8008: WebSphere MQ queue changed.
dis ql(ql.a) maxdepth descr
     6 : dis ql(ql.a) maxdepth descr
AMQ8409: Display Queue details.
   QUEUE(QL.A)                             TYPE(QLOCAL)
   DESCR(ql.a for qmgr1 in 2013-01-01)     MAXDEPTH(2000)

```

#### 2つめのキューの作成

併せてREPLACEキーワードによる動作の確認をする。

```
def ql(ql.b) descr('ql.b for qmgr1 in 2013-01-01')
     7 : def ql(ql.b) descr('ql.b for qmgr1 in 2013-01-01')
AMQ8006: WebSphere MQ queue created.
dis ql(ql.b) maxdepth descr
     8 : dis ql(ql.b) maxdepth descr
AMQ8409: Display Queue details.
   QUEUE(QL.B)                             TYPE(QLOCAL)
   DESCR(ql.b for qmgr1 in 2013-01-01)     MAXDEPTH(5000)
def ql(ql.b) replace maxdepth(2000)
     9 : def ql(ql.b) replace maxdepth(2000)
AMQ8006: WebSphere MQ queue created.
dis ql(ql.b) maxdepth descr
    10 : dis ql(ql.b) maxdepth descr
AMQ8409: Display Queue details.
   QUEUE(QL.B)                             TYPE(QLOCAL)
   DESCR( )                                MAXDEPTH(2000)

```

REPLACEで再定義されているので、以前に設定したDESCRパラメータはデフォルト状態(空)になっている。

#### runmqscの終了

```
end
    11 : end
10 MQSC commands read.
No commands have a syntax error.
All valid MQSC commands were processed.
$

```

### コマンド・ファイルでのrunmqsc制御コマンドの使用

エディタで下記のテキストファイルを作成。

#### exe1.txt

```
dis qmgr
dis q(system*)
def ql(ql.a) replace
dis ql(ql.a)
alter ql(ql.a) maxdepth(2000)
dis ql(ql.a) maxdepth
def ql(ql.b) replace maxdepth(2000)
dis ql(ql.b)

```

当該コマンドファイルをリダイレクトで入力、結果をファイルに保存・確認する。

```
$ runmqsc qmgr1  report1.txt
$ cat report1.txt | less
＜後略＞

```

### 参考サイト

- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)
