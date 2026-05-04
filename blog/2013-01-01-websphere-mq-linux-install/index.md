---
title: 'WebSphere MQ: Linuxへのインストール'
date: 2013-01-01
authors: [yukun]
tags:
  - ibm
  - linux
  - setting
  - websphere-mq
slug: websphere-mq-linux-install
---

RedHat系CentOS(x86\_64)へのWebSphere MQの評価版のインストール方法とエラーの対処法をtrial and errorで記載。参考サイトは記事の末尾をご参照。尚、当該OSはMacのVMware fusion上のゲストOSとして稼働。 
<!-- truncate -->


### MQのISOイメージをマウント


```bash
# mkdir /mnt/iso
# mount -t iso9660 -o loop mq.iso /mnt/iso
# cd /mnt/iso
# ls
copyright                       mqseriesman-701-3x86_64.rpm     mqseriesmsg_zh_cn-701-3x86.rpm
gsk7bas-70-427i386.rpm          mqseriesmsg_cs-701-3x86_64.rpm  mqseriesmsg_zh_tw-701-3x86.rpm
gsk7bas64-70-427x86_64.rpm      mqseriesmsg_de-701-3x86_64.rpm  mqseriesruntime-701-3x86_6.rpm
lap                             mqseriesmsg_es-701-3x86_64.rpm  mqseriessamples-701-3x86_6.rpm
licenses                        mqseriesmsg_fr-701-3x86_64.rpm  mqseriessdk-701-3x86_64.rpm
mqlicense.sh                    mqseriesmsg_hu-701-3x86_64.rpm  mqseriesserver-701-3x86_64.rpm
mqseriesclient-701-3x86_64.rpm  mqseriesmsg_it-701-3x86_64.rpm  mqseriestxclient-701-3x86_.rpm
mqseriesconfig-701-3x86_64.rpm  mqseriesmsg_ja-701-3x86_64.rpm  prereqs
mqserieseclipsesdk33-701-3.rpm  mqseriesmsg_ko-701-3x86_64.rpm  readadd.txt
mqseriesjava-701-3x86_64.rpm    mqseriesmsg_pl-701-3x86_64.rpm  readmes
mqseriesjre-701-3x86_64.rpm     mqseriesmsg_pt-701-3x86_64.rpm
mqserieskeyman-701-3x86_64.rpm  mqseriesmsg_ru-701-3x86_64.rpm
```


### MQのライセンス受諾

/mnt/isoディレクトリへ移動し下記のコマンドを実行。

```
# ./mqlicense.sh -accept

```

以下のエラーが発生した場合はそれに対応する手順を実施し、再度上記のコマンドを実行。 追記(2013-01-07)：予め下記のサイトで必要な共有ライブラリ等を確認しインストールしておけば特にエラー無くインストール可能。 ・[IBM System Requirements for WebSphere MQ - United States](https://www-01.ibm.com/support/docview.wss?uid=swg27047751)

#### エラーケース1 - ld-linux.so.2

```
./mqlicense.sh: ./lap/jre/jre/bin/java: /lib/ld-linux.so.2: bad ELF interpreter: そのようなファイルやディレクトリはありません
ERROR:  Installation will not succeed unless the license
        agreement can be accepted.

```

#### 対応方法

下記コマンドでライブラリをインストール。

```
# yum install ld-linux.so.2
Loaded plugins: fastestmirror, refresh-packagekit, security
Loading mirror speeds from cached hostfile
 * base: ftp.iij.ad.jp
 * extras: ftp.iij.ad.jp
 * updates: ftp.iij.ad.jp
Setting up Install Process
Resolving Dependencies
--> Running transaction check
---> Package glibc.i686 0:2.12-1.80.el6_3.6 will be installed
--> Processing Dependency: libfreebl3.so(NSSRAWHASH_3.12.3) for package: glibc-2.12-1.80.el6_3.6.i686
--> Processing Dependency: libfreebl3.so for package: glibc-2.12-1.80.el6_3.6.i686
--> Running transaction check
---> Package nss-softokn-freebl.i686 0:3.12.9-11.el6 will be installed
--> Finished Dependency Resolution
Dependencies Resolved
========================================================================================================================
 Package                           Arch                Version                             Repository              Size
========================================================================================================================
Installing:
 glibc                             i686                2.12-1.80.el6_3.6                   updates                4.3 M
Installing for dependencies:
 nss-softokn-freebl                i686                3.12.9-11.el6                       base                   116 k
Transaction Summary
========================================================================================================================
Install       2 Package(s)
Total download size: 4.4 M
Installed size: 13 M
Is this ok [y/N]: y
Downloading Packages:
(1/2): glibc-2.12-1.80.el6_3.6.i686.rpm                                                          | 4.3 MB     00:00
(2/2): nss-softokn-freebl-3.12.9-11.el6.i686.rpm                                                 | 116 kB     00:00
------------------------------------------------------------------------------------------------------------------------
Total                                                                                   7.4 MB/s | 4.4 MB     00:00
Running rpm_check_debug
Running Transaction Test
Transaction Test Succeeded
Running Transaction
Warning: RPMDB altered outside of yum.
  Installing : nss-softokn-freebl-3.12.9-11.el6.i686                                                                1/2
  Installing : glibc-2.12-1.80.el6_3.6.i686                                                                         2/2
  Verifying  : glibc-2.12-1.80.el6_3.6.i686                                                                         1/2
  Verifying  : nss-softokn-freebl-3.12.9-11.el6.i686                                                                2/2
Installed:
  glibc.i686 0:2.12-1.80.el6_3.6
Dependency Installed:
  nss-softokn-freebl.i686 0:3.12.9-11.el6
Complete!

```

#### エラーケース2 - libgcc\_s.so.1

```
Java クラスが見つかりません:  com.ibm.lex.lapapp.LAP
libgcc_s.so.1 must be installed for pthread_cancel to work
JVMDUMP006I Processing dump event "abort", detail "" - please wait.
JVMDUMP032I JVM requested System dump using '/mnt/iso/core.20121229.053217.7255.0001.dmp' in response to an event
libgcc_s.so.1 must be installed for pthread_cancel to work
./mqlicense.sh: line 172:  7255 アボートしました(コアダンプ) ${JRE?} -cp ${LAPCLASSPATH?} com.ibm.lex.lapapp.LAP -l ${PROGPATH?}/lap/licenses -s /tmp/mq_license ${STATUSARG} ${DISPLAYARG}
ERROR:  Installation will not succeed unless the license
        agreement can be accepted.

```

#### 対応方法

下記コマンドでライブラリをインストール。

```
# yum install libgcc_s.so.1
Loaded plugins: fastestmirror, refresh-packagekit, security
Loading mirror speeds from cached hostfile
 * base: ftp.iij.ad.jp
 * extras: ftp.iij.ad.jp
 * updates: ftp.iij.ad.jp
Setting up Install Process
Resolving Dependencies
--> Running transaction check
---> Package libgcc.i686 0:4.4.6-4.el6 will be installed
--> Finished Dependency Resolution
Dependencies Resolved
========================================================================================================================
 Package                     Arch                      Version                          Repository                 Size
========================================================================================================================
Installing:
 libgcc                      i686                      4.4.6-4.el6                      base                      111 k
Transaction Summary
========================================================================================================================
Install       1 Package(s)
Total download size: 111 k
Installed size: 144 k
Is this ok [y/N]: y
Downloading Packages:
libgcc-4.4.6-4.el6.i686.rpm                                                                      | 111 kB     00:00
Running rpm_check_debug
Running Transaction Test
Transaction Test Succeeded
Running Transaction
  Installing : libgcc-4.4.6-4.el6.i686                                                                              1/1
  Verifying  : libgcc-4.4.6-4.el6.i686                                                                              1/1
Installed:
  libgcc.i686 0:4.4.6-4.el6
Complete!

```

#### エラーケース3 - com.ibm.lex.lapapp.LAP not found

```
エラー: メイン・クラスcom.ibm.lex.lapapp.LAPが見つからなかったかロードできませんでした
ERROR:  Installation will not succeed unless the license
        agreement can be accepted.

```

#### 対応方法

一度、/mnt/isoの中身を全て任意のディスクディレクトリへコピーし、当該ディレクトリのmqlicense.shの書き込み権限を付与。エディタで以下のように修正。

```
# Launch LAP tool
# コメントアウト
#${JRE?} -cp ${LAPCLASSPATH?} com.ibm.lex.lapapp.LAP -l ${PROGPATH?}/lap/licenses -s /tmp/mq_license ${STATUSARG} ${DISPLAYARG}
#RC=$?
# リターンコードを直書き
RC=9
# Display appropriate completion message depending on LAP return code
case ${RC?} in
    "3")
        declinemsg                                                     ;;
    "9")
        echo ""
        echo "Agreement accepted:  Proceed with install."
        echo ""                                                        ;;
    *)
        errormsg; exit ${RC}                                           ;;
esac

```

その後、再度スクリプトを実行。

```
# ./mqlicense.sh -accept -jre /usr/bin/java
＜中略＞
Agreement accepted:  Proceed with install.

```

### rpmパッケージのインストール

以下はエラー発生ケース。

```
# rpm -ivh mqseriesruntime-701-3x86_6.rpm mqseriesserver-701-3x86_64.rpm  mqseriessdk-701-3x86_64.rpm
準備中...                ########################################### [100%]
ERROR:  Product cannot be installed until the license
        agreement has been accepted.
        Run the 'mqlicense' script, which is in the root
        directory of the install media, or see the
        Quick Beginnings book for more information.
エラー: %pre(MQSeriesRuntime-7.0.1-3.x86_64) scriptlet failed, exit status 1
エラー:   install: スクリプト %pre の実行に失敗しました (2)。MQSeriesRuntime-7.0.1-3 をスキップします。
ERROR:  Product cannot be installed until the license
        agreement has been accepted.
        Run the 'mqlicense' script, which is in the root
        directory of the install media, or see the
        Quick Beginnings book for more information.
エラー: %pre(MQSeriesServer-7.0.1-3.x86_64) scriptlet failed, exit status 1
エラー:   install: スクリプト %pre の実行に失敗しました (2)。MQSeriesServer-7.0.1-3 をスキップします。
ERROR:  Product cannot be installed until the license
        agreement has been accepted.
        Run the 'mqlicense' script, which is in the root
        directory of the install media, or see the
        Quick Beginnings book for more information.
エラー: %pre(MQSeriesSDK-7.0.1-3.x86_64) scriptlet failed, exit status 1
エラー:   install: スクリプト %pre の実行に失敗しました (2)。MQSeriesSDK-7.0.1-3 をスキップします。

```

ライセンスがacceptされていないとのこと。先ほどのスクリプトでコメントアウトした行で作成されるべきファイルが作成されないので下記のように手動で作成。

```
# mkdir -p /tmp/mq_license/license
# touch /tmp/mq_license/license/status.dat

```

認証されると下記のメッセージが表示される。

```
License has already been accepted:  Proceed with install.

```

再度rpmコマンドを再実行する。

```
# rpm -ivh mqseriesruntime-701-3x86_6.rpm mqseriesserver-701-3x86_64.rpm  mqseriessdk-701-3x86_64.rpm
準備中...                ########################################### [100%]
   1:MQSeriesRuntime        ########################################### [ 33%]
   2:MQSeriesServer         ########################################### [ 67%]
   3:MQSeriesSDK            ########################################### [100%]

```

なんだかなぁ。。 追記(2013-01-07)：下記のサイトにインストールパッケージの説明が載っていたので引用させて頂く。 引用元：[キュー・マネージャーの独り言: 第4回　WebSphere MQ V7をLinux上で使う上で、気づいた点](http://www.ibm.com/developerworks/jp/websphere/library/wmq/hintstips/4.html)

> パッケージに依存関係がありますので、 - MQSeriesRuntime-7.0.0-0.i386.rpm - MQSeriesSDK-7.0.0-0.i386.rpm - MQSeriesServer-7.0.0-0.i386.rpm - MQSeriesJRE-7.0.0-0.i386.rpm の順番で導入してください。さらにWebSphere MQ V7がサポートしているJDKをまだ導入していない場合には、ibm-java2-i386-sdk-5.0.5.0.i386.rpmを導入してください。 WebSphere MQ V7 Explorerを利用する場合には、 - MQSeriesConfig-7.0.0-0.i386.rpm - MQSeriesEclipseSDK33-7.0.0-0.i386.rpm の2つも導入してください。他には、MQSeriesSamples-7.0.0-0.i386.rpm、MQSeriesJava-7.0.0-0.i386.rpm、MQSeriesMan-7.0.0-0.i386.rpm、MQSeriesMsg\_ja-7.0.0-0.i386.rpmは、導入することをお勧めします。

尚、MQSeriesEclipseSDKのインストール中に下記のエラーが発生した場合は、必要な後述のパッケージをyumインストールする。

```
＜前略＞
(eclipse:22879): Gtk-WARNING **: Unable to locate theme engine in module_path: "clearlooks",
Gtk-Message: Failed to load module "pk-gtk-module": libpk-gtk-module.so: cannot open shared object file: No such file or directory
Gtk-Message: Failed to load module "canberra-gtk-module": libcanberra-gtk-module.so: cannot open shared object file: No such file or directory
＜後略＞

```

```
# yum install libpk-gtk-module.so
# yum install libcanberra-gtk-module.so
# yum install gtk2-engines.i686

```

### インストール済みパッケージの検索方法

```
$ rpm -qa | grep MQSeries
MQSeriesSDK-7.0.1-3.x86_64
MQSeriesJava-7.0.1-3.x86_64
MQSeriesSamples-7.0.1-3.x86_64
MQSeriesJRE-7.0.1-3.x86_64
MQSeriesServer-7.0.1-3.x86_64
MQSeriesMsg_ja-7.0.1-3.x86_64
MQSeriesConfig-7.0.1-3.x86_64
MQSeriesRuntime-7.0.1-3.x86_64
MQSeriesMan-7.0.1-3.x86_64
MQSeriesEclipseSDK33-7.0.1-3.x86_64

```

### MQ動作確認

Queue Managerの作成。

```
# crtmqm qmc00
AMQ7077: You are not authorized to perform the requested operation.

```

権限のあるmqmユーザー（Install時にはまだ作っていなかったので）のパスワードを設定。

```
# cat /etc/passwd | grep mqm
mqm:x:496:501::/var/mqm:/bin/bash
# passwd mqm
Changing password for user mqm.
New password:
Retype new password:
passwd: all authentication tokens updated successfully.

```

mqmユーザーでログインし直し、Queue Managerの作成テスト、MQSCの起動確認。

```
$ crtmqm qmc00
WebSphere MQ queue manager created.
Directory '/var/mqm/qmgrs/qmc00' created.
Creating or replacing default objects for qmc00.
Default objects statistics : 65 created. 0 replaced. 0 failed.
Completing setup.
Setup completed.
$ strmqm qmc00
WebSphere MQ queue manager 'qmc00' starting.
5 log records accessed on queue manager 'qmc00' during the log replay phase.
Log replay for queue manager 'qmc00' complete.
Transaction manager state recovered for queue manager 'qmc00'.
WebSphere MQ queue manager 'qmc00' started.
$ runmqsc qmc00
Starting MQSC for queue manager qmc00.
display qmgr
     1 : display qmgr
AMQ8408: Display Queue Manager details.
   QMNAME(qmc00)                           ACCTCONO(DISABLED)
   ACCTINT(1800)                           ACCTMQI(OFF)
   ACCTQ(OFF)                              ACTIVREC(MSG)
   ALTDATE(2012-12-30)                     ALTTIME(10.16.26)
   AUTHOREV(DISABLED)                      CCSID(1208)
   CHAD(DISABLED)                          CHADEV(DISABLED)
   CHADEXIT( )                             CHLEV(DISABLED)
   CLWLDATA( )                             CLWLEXIT( )
   CLWLLEN(100)                            CLWLMRUC(999999999)
   CLWLUSEQ(LOCAL)                         CMDEV(DISABLED)
   CMDLEVEL(701)                           COMMANDQ(SYSTEM.ADMIN.COMMAND.QUEUE)
   CONFIGEV(DISABLED)                      CRDATE(2012-12-30)
   CRTIME(10.16.26)                        DEADQ( )
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
   PSSYNCPT(IFPER)                         QMID(qmc00_2012-12-30_10.16.26)
   PSMODE(ENABLED)                         REMOTEEV(DISABLED)
   REPOS( )                                REPOSNL( )
   ROUTEREC(MSG)                           SCHINIT(QMGR)
   SCMDSERV(QMGR)                          SSLCRLNL( )
   SSLCRYP( )                              SSLEV(DISABLED)
   SSLFIPS(NO)
   SSLKEYR(/var/mqm/qmgrs/qmc00/ssl/key)
   SSLRKEYC(0)                             STATACLS(QMGR)
   STATCHL(OFF)                            STATINT(1800)
   STATMQI(OFF)                            STATQ(OFF)
   STRSTPEV(ENABLED)                       SYNCPT
   TREELIFE(1800)                          TRIGINT(999999999)
end
     2 : end
One MQSC command read.
No commands have a syntax error.
All valid MQSC commands were processed.

```

尚、MQの出力メッセージの言語（英語・日本語）を切り替えたい場合は[OSの言語設定](/blog/websphere-mq-crt-str-end "WebSphere MQ: キュー・マネージャーの作成・起動・終了")を変更する。

### 参考サイト

- [WebSphere MQ V7.0導入ガイド](http://www.ibm.com/developerworks/jp/websphere/library/wmq/mq7_install/)
- [ヘルプ - WebSphere MQ for Linux にようこそ](http://publib.boulder.ibm.com/infocenter/wmqv7/v7r0/index.jsp?topic=%2Fcom.ibm.mq.amq1ac.doc%2Flq10120_.htm)
- [Install MQ Server Linux](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.0.0/com.ibm.mq.ins.doc/q008640_.html)
- [キュー・マネージャーの独り言: 第4回　WebSphere MQ V7をLinux上で使う上で、気づいた点](http://www.ibm.com/developerworks/jp/websphere/library/wmq/hintstips/4.html)
- notes >>> miscellaneous
- [MQSeries.net :: View topic - AMQ7077: You are not authorized to perform the requested ope](http://www.mqseries.net/phpBB/viewtopic.php?t=57961&sid=1a5a60ab9f0b10d80600e4929962f430)
- [MQSeries.net :: View topic - AMQ7077 : Causes ?](http://www.mqseries.net/phpBB/viewtopic.php?t=55603&sid=b1b608c7e2601339d5505739ff0b11d9)
- [キュー・マネージャーの独り言: 第4回　WebSphere MQ V7をLinux上で使う上で、気づいた点](http://www.ibm.com/developerworks/jp/websphere/library/wmq/hintstips/4.html)
- [Acrobat Reader under Fedora 11 64 bit? - FedoraForum.org](http://forums.fedoraforum.org/showthread.php?p=1267180)

追記(2013-01-01)：よくよく読むとIBM JREのインストールなど幾つか手順を端折ってしまったかも。。
