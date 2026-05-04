---
title: 'WebSphere MQ: トレースの開始・停止 - strmqtrc, endmqtrc'
date: 2013-02-23
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-trace
---

WebSphere MQ のstrmqtrc、endmqtrcコマンドを用いてトレースファイルの取得動作を確認する。尚、前回までの記事は[こちら](/blog/websphere-mq-dead-letter-runmqdlq "WebSphere MQ: Dead-letter キューのハンドリング – runmqdlq")。参考文献は記事末尾に記載。 
<!-- truncate -->


### MQトレースの開始

strmqtrcコマンドで開始する。（オプション-mで対象のキュー・マネージャーを指定する）

```
$ strmqtrc -m QML

```

当該キュー・マネージャーのキューに対してput, get動作を行う。サンプルプログラムにパスを通していない場合は下記の記事を参考にPATH設定を行う。[](/blog/websphere-mq-local-queue "WebSphere MQ: ローカル・キュー操作 – amqsput, amqsget, amqsbcg")

```
$ amqsput QL.A QML
Sample AMQSPUT0 start
target queue is QL.A
I confirm strmqtrc command operation.
Sample AMQSPUT0 end
$ amqsget QL.A QML
Sample AMQSGET0 start
message 
no more messages
Sample AMQSGET0 end

```

_

### MQトレースの終了

```
$ endmqtrc -m QML

```

### MQトレースファイルの確認

トレース関連のファイルはUNIX系の場合/var/mqm/traceにバイナリー形式で保存される。dspmqtrcコマンドを用いて当該ファイルをテキスト形式に変換する。

```
$ cd /var/mqm/trace
$ ls
AMQ21469.0.TRC  AMQ3015.0.TRC  AMQ3036.0.TRC  AMQ3060.0.TRC  AMQ3072.0.TRC
AMQ21477.0.TRC  AMQ3016.0.TRC  AMQ3038.0.TRC  AMQ3070.0.TRC  AMQ3094.0.TRC
AMQ3010.0.TRC   AMQ3035.0.TRC  AMQ3039.0.TRC  AMQ3071.0.TRC  AMQ3100.0.TRC
$ dspmqtrc *.TRC
$ ls
AMQ21469.0.FMT  AMQ3015.0.FMT  AMQ3036.0.FMT  AMQ3060.0.FMT  AMQ3072.0.FMT
AMQ21469.0.TRC  AMQ3015.0.TRC  AMQ3036.0.TRC  AMQ3060.0.TRC  AMQ3072.0.TRC
AMQ21477.0.FMT  AMQ3016.0.FMT  AMQ3038.0.FMT  AMQ3070.0.FMT  AMQ3094.0.FMT
AMQ21477.0.TRC  AMQ3016.0.TRC  AMQ3038.0.TRC  AMQ3070.0.TRC  AMQ3094.0.TRC
AMQ3010.0.FMT   AMQ3035.0.FMT  AMQ3039.0.FMT  AMQ3071.0.FMT  AMQ3100.0.FMT
AMQ3010.0.TRC   AMQ3035.0.TRC  AMQ3039.0.TRC  AMQ3071.0.TRC  AMQ3100.0.TRC
$ grep amqsput *.FMT
AMQ21469.0.FMT: 01:46:04.841170    21469.1           :           PID : 21469 Process : amqsput (64-bit)
AMQ21469.0.FMT: 01:46:29.220659    21469.1           :             0x0110:  06000000 616d7173 70757420 20202020  |....amqsput     |
AMQ21477.0.FMT: 01:46:44.099147    21477.1           :             0x0110:  06000000 616d7173 70757420 20202020  |....amqsput     |
AMQ21477.0.FMT: 01:46:44.099220    21477.1           :             0x0110:  06000000 616d7173 70757420 20202020  |....amqsput     |
AMQ21477.0.FMT: 01:46:59.102071    21477.1           :             0x0110:  06000000 616d7173 70757420 20202020  |....amqsput     |
$

```

### 参考文献

- WebSphere MQ System Administration Guide Version 7.0
- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)

_
