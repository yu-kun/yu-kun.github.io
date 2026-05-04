---
title: 'IBM System i (AS400): メッセージ待ち行列でのメッセージの扱い方'
date: 2014-05-02
authors: [yukun]
tags:
  - as400
  - system-i
slug: ibm-system-i-as400-crtmsgq-sndmsg
---

IBM i OS上でやり取りされるメッセージの扱い方を確認する為、以下の操作を行う。

1. メッセージキューを作成
2. メッセージキューにメッセージを送信
3. メッセージを表示

尚、本記事内容に関わる公式のドキュメントは以下の通り。 [メッセージ - IBM i information center](http://pic.dhe.ibm.com/infocenter/iseries/v7r1m0/index.jsp?topic=%2Frbam6%2Fwmsgs.htm) 
<!-- truncate -->


### メッセージキューを作成

以下のコマンドを用いてメッセージキューを2つ作る。

```
> CRTMSGQ MSGQ(QTEMP/IOSMSGQ)
  Object IOSMSGQ type *MSGQ created in library QTEMP.
> CRTMSGQ MSGQ(QTEMP/IOSMSGQ1)
  Object IOSMSGQ1 type *MSGQ created in library QTEMP.

```

### メッセージキューにメッセージを送信

上記の2つのキューにメッセージを送信する。 コマンド行で、SNDMSG＋F4を打鍵。その後F10でadditional parameterを表示すると以下の画面となる。

```
                              Send Message (SNDMSG)
 Type choices, press Enter.
 Message text . . . . . . . . . .   'HELLO WORLD!'
 To user profile  . . . . . . . .                 Name, *SYSOPR, *ALLACT...
                            Additional Parameters
 To message queue . . . . . . . .                 Name, *SYSOPR, *HSTLOG
   Library  . . . . . . . . . . .     *LIBL       Name, *LIBL, *CURLIB
                + for more values
                                      *LIBL
 Message type . . . . . . . . . .   *INFO         *INFO, *INQ
                                                                        More...
 F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
 F24=More keys

```

今回送信するテキストはHELLO WORLD。これを2つのキューに送信する場合は、「+ for more values」に+を入力してEnterを押下。以下の画面が表示されるので、対象のメッセージキューを入力する。

```
                    Specify More Values for Parameter TOMSGQ
 Type choices, press Enter.
                            Additional Parameters
 To message queue . . . . . . . .   IOSMSGQ       Name, *SYSOPR, *HSTLOG
   Library  . . . . . . . . . . .     QTEMP       Name, *LIBL, *CURLIB
                                    IOSMSGQ1
                                      QTEMP
                                      *LIBL
                                      *LIBL
                                      *LIBL
                                      *LIBL
                                                                        More...
 F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
 F24=More keys

```

Enterを2度押下してコマンドを実行する。仮にプロンプトを用いないでコマンドを実行する場合は以下の通り。

```
> SNDMSG MSG('HELLO WORLD!') TOMSGQ(QTEMP/IOSMSGQ QTEMP/IOSMSGQ1)

```

### メッセージを表示

DSPMSGコマンドを用いて対象のキューのメッセージを確認する。

```
                            Display Messages (DSPMSG)
 Type choices, press Enter.
 Message queue  . . . . . . . . .   IOSMSGQ       Name, *WRKUSR, *SYSOPR...
   Library  . . . . . . . . . . .     QTEMP       Name, *LIBL, *CURLIB
 Output . . . . . . . . . . . . .   *             *, *PRINT, *PRTWRAP
                                                                         Bottom
 F3=Exit   F4=Prompt   F5=Refresh   F10=Additional parameters   F12=Cancel
 F13=How to use this display        F24=More keys

```

対象のMSGQが入力されていることを確認の上、Enterを押下。

```
                               Work with Messages
                                                             System:   SASAKI
 Messages in:   IOSMSGQ
 Type options below, then press Enter.
   4=Remove   5=Display details and reply
 Opt   Message
                            Messages needing a reply
       (No messages available)
                          Messages not needing a reply
       HELLO WORLD!
         From  . . :   SASAKI         14-05-01   23:39:15
                                                                         Bottom
 F1=Help   F3=Exit      F5=Refresh   F16=Remove messages not needing a reply
 F17=Top   F18=Bottom   F24=More keys

```

対象のメッセージ行に5=Display details and replyを入力+Enterを押下すると、メッセージ内容を確認できる。

```
                         Additional Message Information
 From . . . . . . . . . :   SASAKI
 Date sent  . . . . . . :   14-05-01      Time sent  . . . . . . :   23:39:15
 Message . . . . :   HELLO WORLD!
                                                                         Bottom
 Press Enter to continue.
 F1=Help   F3=Exit   F6=Print   F9=Display message details   F12=Cancel
 F21=Select assistance level

```

ここでは割愛しているが、IOSMSGQ1にも同様のメッセージが格納されていることを以下のコマンドより確認可能。

```
> DSPMSG MSGQ(QTEMP/IOSMSGQ1)

```
