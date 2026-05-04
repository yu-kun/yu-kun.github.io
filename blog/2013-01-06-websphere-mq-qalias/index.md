---
title: 'WebSphere MQ: 別名キューの操作 - QALIAS(QA)'
date: 2013-01-06
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-qalias
---

WebSphere MQの別名キューの動作を確認する。前回までの記事は[こちらのページ](/blog/websphere-mq-local-queue "WebSphere MQ: ローカル・キュー操作 – amqsput, amqsget, amqsbcg")をご参照。参考サイトは記事の末尾に記載。 
<!-- truncate -->


### 別名キューとは

下記のドキュメントより引用。

> 別名キューとは、キュー・マネージャーが管理するローカル・キューやリモート・キュー定義に対しての「あだ名」になります。(別の言い方をすると、あるキューの「間接的な参照」ということになります)この別名キューを使った場合、物理的な実体は1つしか存在しませんが、アプリケーション・プログラムからはあたかも独立した複数のキューが存在しているかのように扱うことができます。 参考：[WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)

対象キューを扱うプログラムにとっては別名キューさえ見えていれば良いので、コンポーネント間を疎結合に保てる。本題とはずれるが、こう言った概念は（少々強引な解釈だが）SQLのviewやOOPの抽象クラスなど他のアーキテクチャにも良くある。

### 別名キューの作成

runmqscコマンドインターフェイスを用いて既に作成しているローカル・キューQL.Aに対する別名キューQA.Aを作成する。

```
def qa(QA.A) targq(QL.A)
     1 : def qa(QA.A) targq(QL.A)
AMQ8006: WebSphere MQ queue created.

```

TARGQパラメータに参照先(target)となるローカル・キューを指定する。

### 別名キューQA.Aへのputを禁止 - PUT(DISABLED)

```
alter qa(QA.A) put(disabled)
     2 : alter qa(QA.A) put(disabled)
AMQ8008: WebSphere MQ queue changed.

```

また、ローカル・キューQL.Bに対しても下記の設定、参照先別名キューを定義する。

```
alter ql(QL.B) put(disabled)
     3 : alter ql(QL.B) put(disabled)
AMQ8008: WebSphere MQ queue changed.
def qa(QA.B) targq(QL.B)
     4 : def qa(QA.B) targq(QL.B)
AMQ8006: WebSphere MQ queue created.
end
dis qa(QA.B) put
     5 : dis qa(QA.B) put
AMQ8409: Display Queue details.
   QUEUE(QA.B)                             TYPE(QALIAS)
   PUT(ENABLED)
     6 : end

```

### 別名キューの動作確認

サンプルプログラム(amqsput)を使用して、別名キューとローカル・キューにメッセージをputした際の結果を確認する。尚、amqsputの使い方は[こちらをご参照](/blog/websphere-mq-local-queue "WebSphere MQ: ローカル・キュー操作 – amqsput, amqsget, amqsbcg")。

```
$ amqsput QL.A qmgr1
Sample AMQSPUT0 start
target queue is QL.A
I put in QL.A
Sample AMQSPUT0 end
$ amqsput QA.A qmgr1
Sample AMQSPUT0 start
target queue is QA.A
I put in QA.A
MQPUT ended with reason code 2051
Sample AMQSPUT0 end
$ amqsput QL.B qmgr1
Sample AMQSPUT0 start
target queue is QL.B
I put in QL.B
MQPUT ended with reason code 2051
Sample AMQSPUT0 end
$ amqsput QA.B qmgr1
Sample AMQSPUT0 start
target queue is QA.B
I put in QA.B
MQPUT ended with reason code 2051
Sample AMQSPUT0 end

```

想定通りQL.A以外はputでMQRC\_PUT\_INHIBITEDエラーとなる。QA.Bがエラーとなったのも、参照先のQL.Bのputパラメータがdisabledである為。

```
$ mqrc 2051
      2051  0x00000803  MQRC_PUT_INHIBITED

```

### 参考サイト

- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)
