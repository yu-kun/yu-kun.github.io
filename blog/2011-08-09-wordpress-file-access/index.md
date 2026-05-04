---
title: 'WordPress: 解決策→「要求されたアクションを実行するには、WordPress が Web サーバーにアクセスする必要があります。」'
date: 2011-08-09
authors: [yukun]
tags:
  - apache
  - linux
  - wordpress
slug: wordpress-file-access
---

#### 事象

WordPressのプラグイン、テーマの自動更新をWebから実施する際に以下のメッセージが発生し、自動更新が中断。 
<!-- truncate -->


#### メッセージ

> 要求されたアクションを実行するには、WordPress が Web サーバーにアクセスする必要があります。 次に進むには FTP の接続情報を入力してください。 接続情報が思い出せない場合は、ホスティング担当者に問い合わせてください。

#### 原因・対処法

apacheユーザーにpluginディレクトリへの追加や更新権限が無い為。解決策としてはchown -R apache.apache _＜フォルダパス＞_を実行し所有者・グループをapacheに変更することで解決できる。
