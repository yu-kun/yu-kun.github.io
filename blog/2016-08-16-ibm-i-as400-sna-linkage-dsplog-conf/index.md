---
title: 'IBM System i (AS400): SNA linkageのactive確認をJOBLOGで代替する方法'
date: 2016-08-16
authors: [yukun]
tags:
  - as400
  - ibm
  - sna
slug: ibm-i-as400-sna-linkage-dsplog-conf
---

IBM System i (AS400)でSNAのlinkageレベルの疎通確認をWRKCFGSTSコマンドのLine resourceステータス(=Active)以外に、ジョブログ(DSPJOBLOG)かヒストリーログ(DSPLOG)から確認する場合は、メッセージID：CPF1273が出力されていることを確認する。 
<!-- truncate -->
 Message ID: CPF1273 Message: Communications device &2 was allocated to subsystem &1. ※当該Message IDの全文(cause欄含む)を確認したい場合は、DSPMSGD CPF1273コマンドを打鍵する。

### 参考サイト

上記の説明と全く同じ公式ドキュメントは無いが、公式のtroubleshooting集において、SNA接続復旧後の確認手法として上記のMessage IDの確認記述がある。 [IBM SNADS Distribution Queue Goes to Retry-Fail, SNADS Receiver Job Fails with CPF4059 RC08640000 - Japan](http://www-01.ibm.com/support/docview.wss?uid=nas8N1018167) Resolving the problem ＞ Action Taken: ＞ No.10をご参照。
