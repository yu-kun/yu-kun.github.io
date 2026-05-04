---
title: '&quot;WebSphere MQ is waiting for a job to start.&quot;の原因と対処法'
date: 2013-06-01
authors: [yukun]
tags:
  - as400
  - system-i
  - websphere-mq
slug: websphere-mq-is-waiting-for-a-job-to-start
---

### 事象・エラーメッセージ

IBM i版のWebSphere MQでキューマネージャを作成した際に発生したエラーメッセージ。

```
> CRTMQM MQMNAME(QMA)
WebSphere MQ is waiting for a job to start.
WebSphere MQ is waiting for a job to start.
An internal WebSphere MQ error has occurred.
Error found on CRTMQM command.

```

F4のコマンド入力画面で実行した場合は下記のように画面下部に表示される。

```
                       Create Message Queue Manager (CRTMQM)
Type choices, press Enter.
ASP Number . . . . . . . . . . .   *SYSTEM       1-32, *SYSTEM, *ASPDEV
ASP device . . . . . . . . . . .                 Character value, *ASP
Journal receiver threshold . . .   *DFT          100000-1000000000, *DFT...
Journal buffer size  . . . . . .   *DFT          32000-15761440, *DFT
                                                                         Bottom
F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
F24=More keys
WebSphere MQ is waiting for a job to start.

```


<!-- truncate -->


### 原因

メッセージの詳細を確認したところ、QMQMジョブが起動していなかったのが原因だと分かる。

```
                         Additional Message Information
Message ID . . . . . . :   AMQ7164
Date sent  . . . . . . :   13-05-29      Time sent  . . . . . . :   23:02:49
Message . . . . :   WebSphere MQ is waiting for a job to start.
Cause . . . . . :   WebSphere MQ has been waiting 0 seconds to start job
   AMQZMUC0 for Queue Manager:
Recovery  . . . :   Check that the job queue that is associated with job
   description QMQM/QMQMJOBD is not held and that the appropriate maximum
   active jobs value in the job queue entry is sufficent to allow the job to
   start. Check that the subsystem that is associated with the job queue is
   active and has a sufficient value specified for the maximum number of jobs
   that can be active at the same time.
                                                                         Bottom
Press Enter to continue.
F1=Help   F3=Exit   F6=Print      F9=Display message details
F10=Display messages in job log   F12=Cancel   F21=Select assistance level

```

### 対処法

QMQMを起動した状態でCRTMQMを実行することで、正常にキュー・マネージャーを作成可能。

```
> STRSBS SBSD(QMQM/QMQM)
Subsystem QMQM in library QMQM being started.
> CRTMQM MQMNAME(QMA) TEXT('Qmanager created by Yu Sasaki')
WebSphere MQ queue manager created.
Directory '/QIBM/UserData/mqm/qmgrs/QMA' created.
Creating or replacing default objects for QMA.
Default objects statistics : 65 created. 0 replaced. 0 failed
Completing setup.
Setup completed.

```

### 参考サイト

- IBM iSeries & AS400 technical discussion
