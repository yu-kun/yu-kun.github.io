---
title: 'NetBeans から Subversion でコミットをする際のエラーの解決法の一例'
date: 2009-02-12
authors: [yukun]
tags:
  - java
  - netbeans
  - setting
  - subversion
slug: netbeans-subversion-import-error
---

Windows版NetBeans6.5でソースをインポートまたはコミットする際に以下のようなエラーが発生する場合がある。

> '.' is not a working copy Can't open file '.svn/entries': No such file or directory

これはNetBeansが使用するsvnクライアントがcygwinのものだった場合に生じるエラーのようだ。 未だcygwin環境のsvn以外のsvnをインストールしていない場合は下のアドレスからダウンロードする。 subversion: Subversion Packages その後、メニューバーの「ツール」→「オプション」から設定画面を開いて、「その他」タブ→「バージョン管理」画面のSubversion画面を開く。左にあるリストメニューからSubversionを選択し、最初の設定項目である_「SVN実行可能ファイルパス」_を設定すれば正常にインポート、コミットできるようになる。 ちなみに、cygwinのでなければ↑のsvnパッケージでなくともOK。

### 参考サイト

- Nabble - Netbeans IDE Users - Problems with SVN, svn/entities file doesn't exists
