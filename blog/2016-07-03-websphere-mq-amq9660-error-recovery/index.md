---
title: 'WebSphere MQ: (AMQ9660) SSL鍵エラーの対処例'
date: 2016-07-03
authors: [yukun]
tags:
  - ibm
  - websphere-mq
slug: websphere-mq-amq9660-error-recovery
---

首題のエラーに遭遇したので備忘録として纏めておく。

### 事象

対向へのMQ channel 接続、もしくはMQPING送出時にSSLコネクションが張れず、接続に失敗(MQPINGであればエラー)し、当該Qmanagerのエラーログには以下のメッセージが出力される。

```
AMQ9660: SSL key repository: password stash file absent or unusable.
```


<!-- truncate -->


### 発生環境

IBM i OS上のWebSphere MQ v7.0

### 原因

原因やリカバリーの為の確認ポイントについては公式ページに記載がある。

- [In WebSphere MQ, why am I getting AMQ9660: SSL key repository: password stash file absent or unusable. error when setting up SSL?](https://developer.ibm.com/answers/questions/206629/why-am-i-getting-amq9660-ssl-key-repository-passwo.html?lnk=hm)
- [In WebSphere MQ, why am I getting AMQ9660: SSL key repository: password stash file absent or unusable. error when setting up SSL? - dWAnswers](https://developer.ibm.com/answers/questions/206629/why-am-i-getting-amq9660-ssl-key-repository-passwo.html)

今回のケースでは、CHGMQMコマンドのSSLKEYRPWDパラメータにSSL Key repositoryのパスワードを設定する際に単一引用符「'」が残ってしまった為。本来、当該パラメータは当該記号が不要だが、他のパラメータと同様と思い込み引用符込みでコマンド文字列を準備した上でF4で各パラメータを確認・実行してしまうと上記のエラーに繋がる。 ※SSLKEYRPWDパラメーターはパスワード文字列を隠蔽するので、F4画面では確認が不可能。

### 再発防止

SSLKEYRPWDパラメータへのパスワードの入力はCommand entry画面からではなく、F4画面からコピペ入力することで、当該ミスの防止が可能。コピペであれば、大文字小文字の入力誤り等も防止できる。 ※偶にキーボードのShiftキーがバカになっていて、押しているつもりが有効化されていない場合も考慮。
