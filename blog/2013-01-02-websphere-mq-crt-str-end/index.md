---
title: 'WebSphere MQ: キュー・マネージャーの作成・起動・終了'
date: 2013-01-02
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-crt-str-end
---

キュー・マネージャーを作成・起動・終了の動作を確認。[実行環境はLinux (CentOS v6.3)](/blog/websphere-mq-linux-install "WebSphere MQ: Linuxへのインストール")。参考サイトは記事の最後に記載。 
<!-- truncate -->


### キュー・マネージャーの作成 - crtmqm

```
$ crtmqm qmgr1
WebSphere MQ キュー・マネージャーが作成されました。
ディレクトリー '/var/mqm/qmgrs/qmgr1' が作成されました。
qmgr1 のデフォルト・オブジェクトを作成または置換しています。
デフォルト・オブジェクトの統計 : 作成 65、置換 0、失敗 0
設定を完了中です。
設定が完了しました。

```

### キュー・マネージャーの起動 - strmqm

```
$ strmqm qmgr1
WebSphere MQ キュー・マネージャー qmgr1' を開始しています。
ログのやり直しフェーズ中に、キュー・マネージャー 'qmgr1' で 5 ログ・レコード がアクセスされました。
キュー・マネージャー 'qmgr1' のログのやり直しが完了しました。
キュー・マネージャー 'qmgr1' のトランザクション・マネージャーの状態が 回復されました。
WebSphere MQ キュー・マネージャー 'qmgr1' が始動しました。

```

MQプロセスの起動確認。

```
$ ps -ef | grep amq
mqm       3484     1  0 17:43 ?        00:00:00 amqzxma0 -m qmgr1
mqm       3489  3484  0 17:43 ?        00:00:00 /opt/mqm/bin/amqzfuma -m qmgr1
mqm       3490  3484  0 17:43 ?        00:00:00 amqzmuc0 -m qmgr1
mqm       3500  3484  0 17:43 ?        00:00:00 amqzmur0 -m qmgr1
mqm       3502  3484  0 17:43 ?        00:00:00 amqzmuf0 -m qmgr1
mqm       3511  3484  0 17:43 ?        00:00:00 /opt/mqm/bin/amqrrmfa -m qmgr1 -t2332800 -s2592000 -p2592000 -g5184000 -c3600
mqm       3514  3484  0 17:43 ?        00:00:00 /opt/mqm/bin/amqzdmaa -m qmgr1
mqm       3529  3484  0 17:43 ?        00:00:00 /opt/mqm/bin/amqzmgr0 -m qmgr1
mqm       3543  3484  0 17:43 ?        00:00:00 amqzlaa0 -mqmgr1 -fip0
mqm       3545  3529  0 17:43 ?        00:00:00 /opt/mqm/bin/amqpcsea qmgr1
mqm       3565  3502  0 17:43 ?        00:00:00 amqfqpub -mqmgr1
mqm       3573  3565  0 17:43 ?        00:00:00 amqfcxba -m qmgr1

```

### システム・サンプル・キューの作成 - amqscos0.tst

今後サンプルプログラムを使用する為、ここで定義する。スクリプトはamqscos0.tstを使用。(Windowsだとインストールフォルダのtools/mqsc/samples以下に保管されている。

```
$ runmqsc qmgr1 < /opt/mqm/samp/amqscos0.tst
キュー・マネージャー qmgr1 に対して MQSC を始動中です。
       : ********************************************************************/
       : *                                                                  */
       : * Program name: AMQSCOS0                                           */
       : *                                                                  */
       : * Description: Sample MQSC source defining MQM sample queues       */
       : *              Can be processed, with changes as needed, after     */
       : *              starting the MQM                                    */
       : *                                                 */
       : * Licensed Materials - Property of IBM                             */
       : *                                                                  */
       : * 47P8479, 5639-B43                                                */
       : *                                                                  */
       : * (C) Copyright IBM Corporation 1994, 2001 All Rights Reserved     */
       : * US Government Users Restricted Rights - Use, duplication or      */
       : * disclosure restricted by GSA ADP Schedule Contract with IBM Corp. */
       : *                                                                  */
       : *                                                   */
       : *                                                                  */
       : ********************************************************************/
       : *                                                                  */
       : * Function:                                                        */
       : *                                                                  */
       : *                                                                  */
       : *   AMQSCOS0 is a sample MQSC file to create or reset sample       */
       : *   MQI resources of the Message Queue Manager (MQM).              */
       : *   It includes the following.                                     */
       : *                                                                  */
       : *      -- definition of objects used by the sample programs        */
       : *                                                                  */
       : *   This file, or a similar one, can be processed when the MQM     */
       : *   is started - it creates the objects if missing, or resets      */
       : *   their attributes to the prescribed values.                     */
       : *                                                                  */
       : ********************************************************************/
       : *                                                                  */
       : *   AMQSCOS0 is sample data for the MQSC utility                   */
       : *                                                                  */
       : ********************************************************************/
       :
       :
       : ********************************************************************/
       : *       EXAMPLES OF DIFFERENT QUEUE TYPES                          */
       : *                                                                  */
       : *   Create local, alias and remote queues                          */
       : *                                                                  */
       : *   Uses system defaults for most attributes                       */
       : *                                                                  */
       : ********************************************************************/
       : **   Create a local queue
     1 :     DEFINE QLOCAL('SYSTEM.SAMPLE.LOCAL') REPLACE +
       :
       :            DESCR('Sample local queue') +
       : *   Persistent messages OK
       :            DEFPSIST(YES)  +
       : *   Shareable
       :            SHARE
AMQ8006: WebSphere MQ キューが作成されました。
       :
       : **   Create an alias queue
     2 :     DEFINE QALIAS('SYSTEM.SAMPLE.ALIAS') REPLACE  +
       :
       :            DESCR('Sample alias queue') +
       : *   Persistent messages OK
       :            DEFPSIST(YES)               +
       :            TARGQ('SYSTEM.SAMPLE.LOCAL')
AMQ8006: WebSphere MQ キューが作成されました。
       :
       : **   Create a remote queue - in this case, an indirect reference
       : **      is made to the sample local queue on OTHER queue manager
     3 :     DEFINE QREMOTE('SYSTEM.SAMPLE.REMOTE') REPLACE  +
       :
       :            DESCR('Sample remote queue') +
       : *   Persistent messages OK
       :            DEFPSIST(YES)                +
       :            RNAME('SYSTEM.SAMPLE.LOCAL') +
       : *   Queue is on queue manager called OTHER
       :            RQMNAME('OTHER')
AMQ8006: WebSphere MQ キューが作成されました。
       :
       : **   Create a transmission queue for messages to queues at OTHER
       : **   By default, use remote node name
     4 :     DEFINE QLOCAL('OTHER') REPLACE +
       :
       :            DESCR('transmision queue to OTHER')  +
       :            USAGE(XMITQ)
AMQ8006: WebSphere MQ キューが作成されました。
       :
       : ********************************************************************/
       : *       SAMPLE MODEL QUEUE USED BY SAMPLE PROGRAMS                 */
       : *                                                                  */
       : *   Create model queue opened by sample programs to create         */
       : *   a dynamic queue for replies                                    */
       : *                                                                  */
       : ********************************************************************/
       : *   General reply queue                                            */
     5 :     DEFINE QMODEL('SYSTEM.SAMPLE.REPLY') REPLACE +
       :            DESCR('General reply queue')
AMQ8006: WebSphere MQ キューが作成されました。
       :
       : ********************************************************************/
       : *       SPECIFIC QUEUES AND PROCESS USED BY SAMPLE PROGRAMS        */
       : *                                                                  */
       : *   Create local queues used by sample programs                    */
       : *   Create MQI process associated with sample initiation queue     */
       : *                                                                  */
       : ********************************************************************/
       :
       : *   Queue used by AMQSECHA
     6 :     DEFINE QLOCAL('SYSTEM.SAMPLE.ECHO') REPLACE +
       :            DESCR('queue for AMQSECHA')         +
       : *   Shareable
       :            SHARE                  +
       : *   Trigger control on
       :            TRIGGER                +
       : *   Trigger on first message
       :            TRIGTYPE (FIRST)       +
       :            PROCESS('SYSTEM.SAMPLE.ECHOPROCESS') +
       :            INITQ('SYSTEM.SAMPLE.TRIGGER')
AMQ8006: WebSphere MQ キューが作成されました。
       :
       :
       : *   Queue used by AMQSINQA
     7 :     DEFINE QLOCAL('SYSTEM.SAMPLE.INQ') REPLACE +
       :            DESCR('queue for AMQSINQA')         +
       : *   Shareable
       :            SHARE                  +
       : *   Trigger control on
       :            TRIGGER                +
       : *   Trigger on first message
       :            TRIGTYPE (FIRST)       +
       :            PROCESS('SYSTEM.SAMPLE.INQPROCESS') +
       :            INITQ('SYSTEM.SAMPLE.TRIGGER')
AMQ8006: WebSphere MQ キューが作成されました。
       :
       :
       : *   Queue used by AMQSSETA
     8 :     DEFINE QLOCAL('SYSTEM.SAMPLE.SET') REPLACE +
       :            DESCR('queue for AMQSSETA')         +
       : *   Shareable
       :            SHARE                  +
       : *   Trigger control on
       :            TRIGGER                +
       : *   Trigger on first message
       :            TRIGTYPE (FIRST)       +
       :            PROCESS('SYSTEM.SAMPLE.SETPROCESS')  +
       :            INITQ('SYSTEM.SAMPLE.TRIGGER')
AMQ8006: WebSphere MQ キューが作成されました。
       :
       : **   Initiation Queue used by AMQSTRGx, sample trigger process
     9 :     DEFINE QLOCAL('SYSTEM.SAMPLE.TRIGGER') REPLACE +
       :            DESCR('trigger queue for sample programs')
AMQ8006: WebSphere MQ キューが作成されました。
       :
       : **   MQI Processes associated with triggered sample programs
       :
    10 :     DEFINE PROCESS('SYSTEM.SAMPLE.ECHOPROCESS')  REPLACE +
       :            DESCR('trigger process for AMQSECHA')        +
       : ** Note -
       : **    select name of application to trigger, this could be the C or
       : **    COBOL sample application name. The default is the C name.
       :            APPLICID('amqsech')
AMQ8010: WebSphere MQ プロセスが作成されました。
       :
    11 :     DEFINE PROCESS('SYSTEM.SAMPLE.INQPROCESS')  REPLACE +
       :            DESCR('trigger process for AMQSINQA')        +
       : ** Note -
       : **    select name of application to trigger, this could be the C or
       : **    COBOL sample application name. The default is the C name.
       :            APPLICID('amqsinq')
AMQ8010: WebSphere MQ プロセスが作成されました。
       :
    12 :     DEFINE PROCESS('SYSTEM.SAMPLE.SETPROCESS')  REPLACE +
       :            DESCR('trigger process for AMQSSETA')        +
       : ** Note -
       : **    select name of application to trigger, this could be the C or
       : **    COBOL sample application name. The default is the C name.
       :            APPLICID('amqsset')
AMQ8010: WebSphere MQ プロセスが作成されました。
       :
       : ********************************************************************/
       : *                                                                  */
       : * END OF AMQSCOS0                                                  */
       : *                                                                  */
       : ********************************************************************/
       :
12 MQSC コマンドが読み取られました。
構文エラーがあるコマンドはありません。
有効な MQSC コマンドはすべて処理されました。

```

### キュー・マネージャーの終了

```
$ endmqm -w qmgr1
キュー・マネージャー 'qmgr1' の終了を待機中です。
キュー・マネージャー 'qmgr1' の終了を待機中です。
WebSphere MQ キュー・マネージャー 'qmgr1' が終了しました。

```

### メッセージの英語化

日本語のメッセージより英語の方が良い場合はOSの言語設定を変える。また恒久的に設定したい場合は下記のファイルを編集する。 /etc/sysconfig/i18n ←これは次回ログインから有効

```
$ export LANG=C
$ echo $LANG
C
$ strmqm qmgr1
WebSphere MQ queue manager 'qmgr1' starting.
5 log records accessed on queue manager 'qmgr1' during the log replay phase.
Log replay for queue manager 'qmgr1' complete.
Transaction manager state recovered for queue manager 'qmgr1'.
WebSphere MQ queue manager 'qmgr1' started.
$ endmqm -w qmgr1
Waiting for queue manager 'qmgr1' to end.
Waiting for queue manager 'qmgr1' to end.
WebSphere MQ queue manager 'qmgr1' ended.

```

日本語に戻したいとき、かつその設定を失念してしまった場合は下記のように確認する。

```
$ locale -a | grep ja
ja_JP
ja_JP.eucjp
ja_JP.ujis
ja_JP.utf8
japanese
japanese.euc

```

### まとめと補足

#### crtmqmコマンドオプション

- \-q　：デフォルトのキュー・マネージャーとして指定
- \-lc　：循環ロギング(デフォルト)
- \-ll　：リニアロギング
- \-lf ログファイルサイズ　：4KB倍数で指定。
- \-ld ログパス　：ログファイルの保管先を指定。

#### endmqmコマンドオプション

- \-c　：(control)全てのアプリケーションが切断されてから停止。コマンド後の新規接続は不可(デフォルト)
- \-w　：(wait)上記と同じ終了方法だが、キュー・マネージャーが終了するまでプロンプトは戻らない
- \-i　：(immideately)即時シャットダウン。実行中のMQIコール完了後に停止。コマンド後のMQIは不可
- \-p　：(preemptive)MQIコールの完了を待たずに停止

ちなみにキュー・マネージャーの削除はdltmqmコマンドを使用する。

### 参考サイト

- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)
- [ヘルプ - IBM WebSphere MQ](http://publib.boulder.ibm.com/infocenter/wmqv7/v7r0/index.jsp)
