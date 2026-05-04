---
title: 'IBM System i (AS400): MQの通信ポート番号の設定先'
date: 2014-10-27
authors: [yukun]
tags:
  - ibm
  - mq
  - system-i
slug: as400-mq-port
---

AS400上のWebSphere MQのチャネル通信ポート番号の設定先は下記のパスとなる。

```
 /QIBM/UserData/mqm/qmgrs//qm.ini

```

内容を確認するには下記のコマンドでディレクトリをブラウズし、

```
> WRKLNK OBJ('/QIBM/UserData/mqm/qmgrs/')

```

対象ファイルを5=Displayすれば良い。

```
                             Work with Object Links
 Directory  . . . . :   /QIBM/UserData/mqm/qmgrs/QMA
 Type options, press Enter.
   2=Edit   3=Copy   4=Remove   5=Display   7=Rename   8=Display attributes
   11=Change current directory ...
 Opt   Object link            Type     Attribute    Text
       listener               DIR
       master                 STMF
       namelist               DIR
       plugcomp               DIR
       procdef                DIR
  5    qm.ini                 STMF
       qmanager               DIR
       qmstatus.ini           STMF
       queues                 DIR
                                                                        More...
 Parameters or command
 ===>
 F3=Exit   F4=Prompt   F5=Refresh   F9=Retrieve   F12=Cancel   F17=Position to
 F22=Display entire field           F23=More options

```

### 参考サイト

- [IBM Knowledge Center - IBM i での構成情報の変更](http://www-01.ibm.com/support/knowledgecenter/SSFKSJ_7.1.0/com.ibm.mq.doc/ia12270_.htm?lang=ja)
