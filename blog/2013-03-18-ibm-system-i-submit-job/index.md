---
title: 'IBM System i (AS400): ジョブの操作 - SBMJOB, WRKJOB, WRKUSRJOB, WRKSBS'
date: 2013-03-18
authors: [yukun]
tags:
  - as400
  - ibm
  - system-i
  - system-i-access
slug: ibm-system-i-submit-job
---

下記の順序でsubmitting jobとそのjobの操作の動作確認をする。

1. job queueに2つのjobをsubmitする
2. システム上の全てのjob queueを表示する
3. job queueのjobを表示する
4. jobをholdする
5. jobを別のjob queueに移動させる
6. jobを終了する
7. 指定ユーザー名のjobを検索する
8. jobをリリースし完了したかどうかを確認する


<!-- truncate -->


### Job queueに2つのjobをsubmitする

1．Submit Job (SBMJOB)画面を開く。

```
 > Type SBMJOB and press F4.
```

2．今回は自身(ここではユーザー：SASAKIとする)にメッセージを送信すjobをsubmitする。 a) Command to run パラメーターでSNDMSGを打鍵しF4を押下する。 b) SNDMSGのパラメーター入力画面が表示されるの適当に入力しEnterを押下。 c) Job nameパラメーターに適当な名前を入力。 d) Job queueパラメーターには[前回の記事](/blog/ibm-i-wrkobj "IBM System i: オブジェクトの作成、一覧表示、権限表示")で作成したjob queue nameを入力。 最終的な入力内容は以下のようになる。

```
                               Submit Job (SBMJOB)
 Type choices, press Enter.
 Command to run . . . . . . . . . > SNDMSG MSG('I hope to learn more about IBM S
ystem i operations') TOUSR(SASAKI)
                                                                     ...
 Job name . . . . . . . . . . . .   SSKJOB1       Name, *JOBD
 Job description  . . . . . . . .   *USRPRF       Name, *USRPRF
   Library  . . . . . . . . . . .                 Name, *LIBL, *CURLIB
 Job queue  . . . . . . . . . . .   SSKJOBQ       Name, *JOBD
   Library  . . . . . . . . . . .     SASAKI      Name, *LIBL, *CURLIB
 Job priority (on JOBQ) . . . . .   *JOBD         1-9, *JOBD
 Output priority (on OUTQ)  . . .   *JOBD         1-9, *JOBD
 Print device . . . . . . . . . .   *CURRENT      Name, *CURRENT, *USRPRF...
                                                                        More...
 F3=Exit   F4=Prompt   F5=Refresh   F10=Additional parameters   F12=Cancel
 F13=How to use this display        F24=More keys

```

e) 上記の画面でEnterを押下するとCommand Entry画面上以下のようになる。

```
> SBMJOB CMD(SNDMSG MSG('I hope to learn more about IBM System i operations
  ') TOUSR(SASAKI)) JOB(SSKJOB1) JOBQ(SASAKI/SSKJOBQ)
  Job 002361/SASAKI/SSKJOB1 submitted to job queue SSKJOBQ in library
    SASAKI.

```

これより、job number=002361、user ID=SASAKI、job name=SSKJOB1であると分かる。 3．2つめのjobをsubmitする（job内容は同じ） a) Command Entry画面で先のSBMJOBを再利用する。

```
 > Press F9 and then F4.
```

b) 下記のように入力しEnterを押下する。

```
                               Submit Job (SBMJOB)
 Type choices, press Enter.
 Command to run . . . . . . . . . > SNDMSG MSG('This is good.') TOUSR(SASAKI)
                                                                     ...
 Job name . . . . . . . . . . . . > SSKJOB2       Name, *JOBD
 Job description  . . . . . . . .   *USRPRF       Name, *USRPRF
   Library  . . . . . . . . . . .                 Name, *LIBL, *CURLIB
 Job queue  . . . . . . . . . . . > SSKJOBQ       Name, *JOBD
   Library  . . . . . . . . . . . >   SASAKI      Name, *LIBL, *CURLIB
 Job priority (on JOBQ) . . . . .   *JOBD         1-9, *JOBD
 Output priority (on OUTQ)  . . .   *JOBD         1-9, *JOBD
 Print device . . . . . . . . . .   *CURRENT      Name, *CURRENT, *USRPRF...
                                                                        More...
 F3=Exit   F4=Prompt   F5=Refresh   F10=Additional parameters   F12=Cancel
 F13=How to use this display        F24=More keys

```

c) Command Entry上は以下のメッセージが主力される。

```
> SBMJOB CMD(SNDMSG MSG('This is good.') TOUSR(SASAKI)) JOB(SSKJOB2) JOBQ(S
  ASAKI/SSKJOBQ)
  Job 002362/SASAKI/SSKJOB2 submitted to job queue SSKJOBQ in library
    SASAKI.

```

これより、job number=002362、user ID=SASAKI、job name=SSKJOB2であると分かる。

### システム上の全てのjob queueを表示する

Command Entry画面で以下を打鍵する。

```
 > Enter WRKJOBQ. 
```

全てのjob queueが表示されるのでpage downして今回submitしたjob queueを探す。

```
                            Work with All Job Queues
 Type options, press Enter.
   3=Hold   4=Delete   5=Work with    6=Release
   8=Work with job schedule entries   14=Clear
 Opt     Queue          Library          Jobs     Subsystem      Status
         Q1PSCHQ2       QSYS                0     QSYSWRK         RLS
         Q1PSCHQ3       QSYS                0     QSYSWRK         RLS
         QESAUTON       QSYS2924            0                     RLS
         QPDAUTOPAR     QSYS2924            0                     RLS
         QSJINV         QSYS2924            0                     RLS
         Q1PSCHQ        QSYS2924            0                     RLS
         Q1PSCHQ2       QSYS2924            0                     RLS
         Q1PSCHQ3       QSYS2924            0                     RLS
         QTCP           QTCP                0                     RLS
         SSKJOBQ        SASAKI              2                     RLS
                                                                         Bottom
 Command
 ===>
 F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F24=More keys

```

### job queueのjobを表示する

SSKJOBQのOptに5(=Work ¥with)を入力しEnterを押下すると、下記のように先ほどsubmitした2つのjobを確認できる。

```
                              Work with Job Queue
 Queue:   SSKJOBQ        Library:   SASAKI         Status:   RLS
 Type options, press Enter.
   2=Change   3=Hold   4=End   5=Work with   6=Release
 Opt     Job            User           Number     Priority     Status
         SSKJOB1        SASAKI         002361        5          RLS
         SSKJOB2        SASAKI         002362        5          RLS
                                                                         Bottom
 Parameters for options 2, 3 or command
 ===>
 F3=Exit   F4=Prompt   F6=Submit job   F12=Cancel
 F22=Work with job schedule entries    F24=More keys

```

### jobをholdする

SSKJOB1のOptに3(=Hold)を入力しEnterを押下後、F5(=Refresh)を打鍵すると。

```
                              Work with Job Queue
 Queue:   SSKJOBQ        Library:   SASAKI         Status:   RLS
 Type options, press Enter.
   2=Change   3=Hold   4=End   5=Work with   6=Release
 Opt     Job            User           Number     Priority     Status
         SSKJOB2        SASAKI         002362        5          RLS
         SSKJOB1        SASAKI         002361        5          HLD
                                                                         Bottom
 Parameters for options 2, 3 or command
 ===>
 F3=Exit   F4=Prompt   F6=Submit job   F12=Cancel
 F22=Work with job schedule entries    F24=More keys

```

### jobを別のjob queueに移動させる

1．SSKJOB1のOptに2(=Change)を入力しEnterを押下。 2．Change Job (CHGJOB)画面 a) F10を押下して、追加パラメーターを表示 b) job queueにQGPLライブラリーのQBATCHを指定しEnterを押下

```
                               Change Job (CHGJOB)
 Type choices, press Enter.
 Job name . . . . . . . . . . . . > SSKJOB1       Name, *
   User . . . . . . . . . . . . . >   SASAKI      Name
   Number . . . . . . . . . . . . >   002361      000000-999999
 Job priority (on JOBQ) . . . . .   5             0-9, *SAME
 Output priority (on OUTQ)  . . .   5             1-9, *SAME
 Print device . . . . . . . . . .   PRT01         Name, *SAME, *USRPRF...
 Output queue . . . . . . . . . .   *DEV          Name, *SAME, *USRPRF, *DEV...
   Library  . . . . . . . . . . .                 Name, *LIBL, *CURLIB
 Run priority . . . . . . . . . .   *SAME         1-99, *SAME
                            Additional Parameters
 Job queue  . . . . . . . . . . .   QBATCH        Name, *SAME
   Library  . . . . . . . . . . .     QGPL        Name, *LIBL, *CURLIB
 Print text . . . . . . . . . . .   *BLANK
                                                                        More...
 F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
 F24=More keys

```

3．Work with Job Queue画面上からSSKJOB1が消えていることを確認。

```
                              Work with Job Queue
 Queue:   SSKJOBQ        Library:   SASAKI         Status:   RLS
 Type options, press Enter.
   2=Change   3=Hold   4=End   5=Work with   6=Release
 Opt     Job            User           Number     Priority     Status
         SSKJOB2        SASAKI         002362        5          RLS
                                                                         Bottom
 Parameters for options 2, 3 or command
 ===>
 F3=Exit   F4=Prompt   F6=Submit job   F12=Cancel
 F22=Work with job schedule entries    F24=More keys

```

### jobを終了する

1．SSKJOB2のOptに4(=End)を入力し、Enterを打鍵。

```
                               Confirm End of Job
 Queue:   SSKJOBQ        Library:   SASAKI
 Press Enter to confirm your choices for 4=End.
 Press F12 to return to change your choices.
 Opt     Job            User           Number     Priority     Status
  4      SSKJOB2        SASAKI         002362        5          RLS
                                                                         Bottom
 F12=Cancel

```

上の確認画面でEnterを押下してWork with Job Queue画面上でF5でリフレッシュすると以下のようになる。

```
                              Work with Job Queue
 Queue:   SSKJOBQ        Library:   SASAKI         Status:   RLS
 Type options, press Enter.
   2=Change   3=Hold   4=End   5=Work with   6=Release
 Opt     Job            User           Number     Priority     Status
   (No jobs in job queue)
                                                                         Bottom
 Parameters for options 2, 3 or command
 ===>
 F3=Exit   F4=Prompt   F6=Submit job   F12=Cancel
 F22=Work with job schedule entries    F24=More keys

```

F3を押下してCommand Entry画面に戻る。

### 指定ユーザー名のjobを検索する

Command Entry画面で下記コマンドを打鍵する。

```
 > Enter WRKUSRJOB 
```

デフォルトでは自身のuser profileが表示される。

```
                              Work with User Jobs                      SASAKI
                                                             17.03.13  14:00:29
 Type options, press Enter.
   2=Change   3=Hold   4=End   5=Work with   6=Release   7=Display message
   8=Work with spooled files   13=Disconnect
 Opt  Job         User        Type     -----Status----- Function
      QPADEV0001  SASAKI      INTER    OUTQ
      QPADEV0006  SASAKI      INTER    OUTQ
      QPADEV0006  SASAKI      INTER    ACTIVE            CMD-WRKUSRJOB
      SSKJOB1     SASAKI      BATCH    JOBQ     HELD
      SSKJOB2     SASAKI      BATCH    OUTQ
                                                                         Bottom
 Parameters or command
 ===>
 F3=Exit      F4=Prompt   F5=Refresh   F9=Retrieve   F11=Display schedule data
 F12=Cancel   F17=Top     F18=Bottom   F21=Select assistance level
 Intermediate assistance level used.

```

### jobをリリースし完了したかどうかを確認する

1．HoldしているSSKJOB1を6(=Release)でリリースするとStatusがHld→Rlsに変化する。その状態でF5を押下するとリストからは消える。

```
                              Work with User Jobs                      SASAKI
                                                             17.03.13  14:03:34
 Type options, press Enter.
   2=Change   3=Hold   4=End   5=Work with   6=Release   7=Display message
   8=Work with spooled files   13=Disconnect
 Opt  Job         User        Type     -----Status----- Function
      QPADEV0001  SASAKI      INTER    OUTQ
      QPADEV0006  SASAKI      INTER    OUTQ
      QPADEV0006  SASAKI      INTER    ACTIVE            CMD-WRKUSRJOB
      SSKJOB2     SASAKI      BATCH    OUTQ
                                                                         Bottom
 Parameters or command
 ===>
 F3=Exit      F4=Prompt   F5=Refresh   F9=Retrieve   F11=Display schedule data
 F12=Cancel   F17=Top     F18=Bottom   F21=Select assistance level

```

2．WRKSBSコマンドでQBATCH中のjobを確認する。

```
                              Work with Subsystems
                                                             System:   SASAKI
 Type options, press Enter.
   4=End subsystem   5=Display subsystem description
   8=Work with subsystem jobs
                       Total     -----------Subsystem Pools------------
 Opt  Subsystem     Storage (M)   1   2   3   4   5   6   7   8   9  10
      #SYSLOAD             0,00       2
      QBATCH               0,00   2
      QCMN                 0,00   2
      QCTL                 0,00   2
      QINTER               0,00   2   3
      QSERVER              0,00   2
      QSPL                 0,00   2   4
      QSYSWRK              0,00   2
      QUSRWRK              0,00   2
                                                                         Bottom
 Parameters or command
 ===>
 F3=Exit   F5=Refresh   F11=Display system data   F12=Cancel
 F14=Work with system status

```

8(=Work with subsystem jobs)を入力する。

```
                            Work with Subsystem Jobs                   SASAKI
                                                             17.03.13  14:07:18
 Subsystem  . . . . . . . . . . :   QBATCH
 Type options, press Enter.
   2=Change   3=Hold   4=End   5=Work with   6=Release   7=Display message
   8=Work with spooled files   13=Disconnect
 Opt  Job         User        Type     -----Status----- Function
   (No jobs to display)
                                                                         Bottom
 Parameters or command
 ===>
 F3=Exit      F4=Prompt   F5=Refresh   F9=Retrieve   F11=Display schedule data
 F12=Cancel   F17=Top     F18=Bottom

```

SSKJOB1が表示されていない＝そのjobが完了していることが確認できた。 3．DSPMSGコマンドでリリースしたjobのの結果（SNDMSGの結果）を確認する。

```
                               Work with Messages
                                                             System:   SASAKI
 Messages for:   SASAKI
 Type options below, then press Enter.
   4=Remove   5=Display details and reply
 Opt   Message
                            Messages needing a reply
       (No messages available)
                          Messages not needing a reply
       Job 002361/SASAKI/SSKJOB1 completed normally on 17.03.13 at 14:02:39.
       I hope to learn more about IBM System i operations
         From  . . :   SASAKI         17.03.13   14:02:39
       Job 002362/SASAKI/SSKJOB2 ended abnormally.
                                                                         Bottom
 F1=Help   F3=Exit   F5=Refresh   F6=Display system operator messages
 F16=Remove messages not needing a reply   F17=Top   F24=More keys

```

確かにメッセージが送信されている。
