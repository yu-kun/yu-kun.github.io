---
title: 'WebSphere MQ: キューの削除 - DELETE purge'
date: 2013-01-07
authors: [yukun]
tags:
  - ibm
  - linux
  - websphere-mq
slug: websphere-mq-delete-queue
---

WebSphere MQにおけるキューの削除操作を確認する。前回までの記事は[こちらのページをご参照](/blog/websphere-mq-qalias "WebSphere MQ: 別名キューの操作 – QALIAS(QA)")。参考サイトは記事末尾に記載。 
<!-- truncate -->


### ローカル・キューの削除 - DELETEコマンド

runmqscコマンドインターフェース上でローカル・キューQL.Aを削除する(エラーケース)。

```
delete ql(QL.A)
     1 : delete ql(QL.A)
AMQ8143: WebSphere MQ queue not empty.

```

QL.Aにメッセージが残っている為、削除できないとのメッセージ。CLEARコマンドを用いてQL.A内のメッセージを空にした上で再度deleteする。

```
clear ql(QL.A)
     2 : clear ql(QL.A)
AMQ8022: WebSphere MQ queue cleared.
delete ql(QL.A)
     3 : delete ql(QL.A)
AMQ8007: WebSphere MQ queue deleted.

```

尚、deleteコマンドのpurgeオプションをつけることで、キューにメッセージが入っていても、そのまま削除することができる。

```
dis ql(QL.B) curdepth
     1 : dis ql(QL.B) curdepth
AMQ8409: Display Queue details.
   QUEUE(QL.B)                             TYPE(QLOCAL)
   CURDEPTH(1)
delete ql(QL.B) purge
     2 : delete ql(QL.B) purge
AMQ8007: WebSphere MQ queue deleted.

```

### 参考サイト

- [WebSphere MQ 入門書](https://www.ibm.com/developerworks/jp/websphere/library/wmq/mq_intro/)
