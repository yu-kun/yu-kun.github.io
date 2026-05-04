---
title: 'WebSphere MQ: ローカル・キュー操作 - amqsput, amqsget, amqsbcg'
date: 2013-01-04
authors: [yukun]
tags:
  - c-language
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-local-queue
---

サンプルプログラムを使用して作成したキューへのget, put, ブラウズ操作を確認する。[実行環境はLinux (CentOS v6.3)](/blog/websphere-mq-linux-install "WebSphere MQ: Linuxへのインストール")。この記事で使用しているキュー・マネージャーの作成、起動は[こちら](/blog/websphere-mq-crt-str-end)、またキューの作成は[こちら](/blog/websphere-mq-runmqsc "WebSphere MQ: runmqsc制御コマンド(プロンプト・ファイル)")の記事に記載。参考サイトは記事末尾をご参照。 
<!-- truncate -->


### 検察パスの追加

提供されいているサンプルプログラム・ユーティリティー(amqsput, amqsget, amqsbcg)への検索パスの追加と追加確認。

```
$ export PATH=$PATH:/opt/mqm/samp/bin
$ echo $PATH
/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/opt/mqm/samp/bin

```

ただ、これだと再ログインするとパス設定がリセットされてしまうので、mqmユーザー固有の設定として.bash\_profileファイルへ設定する。(インストール時にmqmユーザーを作成していなかった場合、デフォルトでは.bash\_profileファイルは作成されていない為、新規作成となる。)

```
$ vi .bash_profile
export PATH=$PATH:/opt/mqm/samp/bin　←一行追加して保存する
$ exit　←一旦ログオフ
logout
Connection to 172.16.56.131 closed.
$ ssh mqm@172.16.56.131　←再度ログイン
mqm@172.16.56.131's password:
Last login: Wed Jan  2 16:48:48 2013 from 172.16.56.1
$ echo $PATH
/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/opt/mqm/samp/bin　←確かにパスが追加されている

```

※「←」以降の文字列はコメント

### ローカル・キューにメッセージをput

amqsputを用いてローカル・キューql.aメッセージをputする。amqsputの書式は下記の通り。

```
amqsput キュー名　キュー・マネージャー名

```

```
$ amqsput ql.a qmgr1
Sample AMQSPUT0 start
target queue is ql.a
MQOPEN ended with reason code 2085
unable to open queue for output
Sample AMQSPUT0 end
$ mqrc 2085
      2085  0x00000825  MQRC_UNKNOWN_OBJECT_NAME

```

実行したがエラーコード2085が発生し終了。mqrcコマンドで確認すると当該のキューが見つかりませんのとのこと。原因はキューの作成時にキュー名をシングルクォーテーションで囲まずに定義すると大文字に変換されて定義されてしまうとのこと。

> MQのオブジェクト（キュー、キューマネージャー、チャネル等）は大文字、小文字を識別します。 プログラムなどで、キュー名、キューマネージャー名を指定する場合は、大文字、小文字に注意してください。 特に、MQSCコマンドのDEFINEでキュー名を指定する場合、明示的に小文字で作成する場合には、' '（シングルクォーテーション）で囲む必要があります。 シングルクォテーションを使用せずに、小文字で指定すると、自動的に大文字に変換されて定義されます。 MQでは、便宜上、オブジェクト名を、大文字に統一することをお勧めします。 参考：[MQ設計虎の巻: 第8回「トラブル・シューティング」](http://www.ibm.com/developerworks/jp/websphere/library/wmq/toranomaki/8.html)

その為、正しくは下記のように引数を与えて、実行する。

```
$ amqsput QL.A qmgr1
Sample AMQSPUT0 start
target queue is QL.A
Hello MQ world!
Sample AMQSPUT0 end
$

```

amqsputが実行されると、最初の二行を出力した後、標準入力からテキスト行を読み込み、それを引数で与えたキューへputする。標準入力から空行もしくはnull(EOF)を読み取ると、キューをクローズして、キュー・マネージャーとの接続を切断、プログラムを終了する。そこら辺の仕様は実際にsampleプログラム(C言語)を確認すると明確である。

#### amqsputのソース - /opt/mqm/samp/amqsput0.c


```c
＜前略＞
   while (CompCode != MQCC_FAILED)
   {
     if (fgets(buffer, sizeof(buffer), fp) != NULL)
     {
       messlen = (MQLONG)strlen(buffer); /* length without null      */
       if (buffer[messlen-1] == '\n')  /* last char is a new-line    */
       {
         buffer[messlen-1]  = '';    /* replace new-line with null */
         --messlen;                    /* reduce buffer length       */
       }
     }
     else messlen = 0;        /* treat EOF same as null line         */
     /****************************************************************/
     /*                                                              */
     /*   Put each buffer to the message queue                       */
     /*                                                              */
     /****************************************************************/
     if (messlen &gt; 0)
     {
       /**************************************************************/
       /* The following two statements are not required if the       */
       /* MQPMO_NEW_MSG_ID and MQPMO_NEW _CORREL_ID options are used */
       /**************************************************************/
       memcpy(md.MsgId,           /* reset MsgId to get a new one    */
              MQMI_NONE, sizeof(md.MsgId) );
       memcpy(md.CorrelId,        /* reset CorrelId to get a new one */
              MQCI_NONE, sizeof(md.CorrelId) );
       MQPUT(Hcon,                /* connection handle               */
             Hobj,                /* object handle                   */
             &amp;md,                 /* message descriptor              */
             &amp;pmo,                /* default options (datagram)      */
             messlen,             /* message length                  */
             buffer,              /* message buffer                  */
             &amp;CompCode,           /* completion code                 */
             &amp;Reason);            /* reason code                     */
       /* report reason, if any */
       if (Reason != MQRC_NONE)
       {
         printf("MQPUT ended with reason code %d\n", Reason);
       }
     }
     else   /* satisfy end condition when empty line is read */
       CompCode = MQCC_FAILED;
   }
＜後略＞
```

 空行'\\n'か'null'の際にwhileループの条件判定CompCodeにMQCC\_FAILEDを代入してループを抜けるように組んである。残り2つのサンプル・プログラムについても、同フォルダにソースが保管されているので、時間があれば確認してみると良いと思う。プログラムの冒頭にその論理構造がコメントブロックに記載されているので、初見でも読みやすい。

### キューのメッセージを表示

サンプル・プログラムamqsbcgを用いてQL.Aキューに保管されている1件のメッセージ内容を確認する。

```
$ amqsbcg QL.A qmgr1 > msg1.txt
$ cat msg1.txt
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
  Priority : 0  Persistence : 0
  MsgId : X'414D5120716D67723120202020202020ECD0E4500A1F0020'
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
  PutDate  : '20130103'    PutTime  : '01235075'
  ApplOriginData : '    '
  GroupId : X'000000000000000000000000000000000000000000000000'
  MsgSeqNumber   : '1'
  Offset         : '0'
  MsgFlags       : '0'
  OriginalLength : '-1'
****   Message      ****
 length - 15 bytes
00000000:  4865 6C6C 6F20 4D51 2077 6F72 6C64 21   'Hello MQ world! '
 No more messages
 MQCLOSE
 MQDISC

```

メッセージ内容を16進数と文字列の両方で出力していることが確認できた。

### キューからメッセージをget

amqsgetを使用してQL.Aキューからメッセージをgetしキューを空にする。

```
$ amqsget QL.A qmgr1
Sample AMQSGET0 start
message
no more messages
Sample AMQSGET0 end
$

```

先ほどputしたメッセージをget後に15秒キューへのputを待ち、何もputされなければ終了する。

#### amqsgetのソース - /opt/mqm/samp/amqsget0.c


```c
＜前略＞
   /******************************************************************/
   /* Use these options when connecting to Queue Managers that also  */
   /* support them, see the Application Programming Reference for    */
   /* details.                                                       */
   /* These options cause the MsgId and CorrelId to be replaced, so  */
   /* that there is no need to reset them before each MQGET          */
   /******************************************************************/
   /*gmo.Version = MQGMO_VERSION_2;*/ /* Avoid need to reset Message */
   /*gmo.MatchOptions = MQMO_NONE; */ /* ID and Correlation ID after */
                                      /* every MQGET                 */
   gmo.Options = MQGMO_WAIT           /* wait for new messages       */
               | MQGMO_NO_SYNCPOINT   /* no transaction              */
               | MQGMO_CONVERT;       /* convert if necessary        */
   gmo.WaitInterval = 15000;          /* 15 second limit for waiting */
   while (CompCode != MQCC_FAILED)
   {
     buflen = sizeof(buffer) - 1; /* buffer size available for GET   */
＜中略＞
     MQGET(Hcon,                /* connection handle                 */
           Hobj,                /* object handle                     */
           &amp;md,                 /* message descriptor                */
           &amp;gmo,                /* get message options               */
           buflen,              /* buffer length                     */
           buffer,              /* message buffer                    */
           &amp;messlen,            /* message length                    */
           &amp;CompCode,           /* completion code                   */
           &amp;Reason);            /* reason code                       */
＜後略＞
```

 (MQGMO) gmo.WaitIntervalに対して15000ms=15secを設定していることが分かる。 また、現在のキューの中身が空であることを念のため下記のコマンドで確認する。

```
$ runmqsc qmgr1
Starting MQSC for queue manager qmgr1.
dis ql(QL.A) curdepth
     1 : dis ql(QL.A) curdepth
AMQ8409: Display Queue details.
   QUEUE(QL.A)                             TYPE(QLOCAL)
   CURDEPTH(0)

```

CURDEPTH(0)であることから、QL.Aは空と分かる。

### 参考サイト

- [MQ設計虎の巻: 第8回「トラブル・シューティング」](http://www.ibm.com/developerworks/jp/websphere/library/wmq/toranomaki/8.html)
- [MQ設計虎の巻: 第4回「アプリケーション設計」](http://www.ibm.com/developerworks/jp/websphere/library/wmq/toranomaki/4.html)
