---
title: 'Windows: FTP時の&quot;Replace Existing File with Temp File : I/O エラー&quot;の解決策'
date: 2013-08-06
authors: [yukun]
tags:
  - as400
  - ftp
  - system-i
  - windows
slug: replace-existing-file-with-temp-file-io-error
---

先日、Windows7からFTPでIBM System i上のバイナリファイルをダウンロードしようとしたところ、上記のエラーが出力され、ファイルのダウンロードが失敗したので、その原因と対応策を備忘録として本記事で紹介。 
<!-- truncate -->


### 事象

当該エラーメッセージ(Replace Existing File with Temp File : I/O エラー)が下記の通りgetコマンド直後に出力された。

```
C:\>ftp 192.0.2.10
192.0.2.10 に接続しました。
220-QTCP at ZZZZZZ.
220 Connection will close if idle more than 5 minutes.
ユーザー (192.0.2.30:(none)): YYYYYY
331 Enter password.
パスワード:
230 YYYYYY logged on.
ftp> bin
200 Representation type is binary IMAGE.
ftp> cd /home/ssk
250-NAMEFMT set to 1.
250 "/home/ssk" is current directory.
ftp> get mq.iso
200 PORT subcommand request successful.
150 Retrieving file /home/ssk/mq.iso
> Replace Existing File with Temp File : I/O エラー
250 File transfer completed successfully.
ftp: BBBBB バイトが受信されました CCC秒 DDD KB/秒。
ftp>

```

transfer completed のメッセージ自体は出力されてるが、当該ファイルは作成されない。

### 原因

結論から言うと、ローカルディレクトリ(WindowsのCドライブ直下)に書き込み時にユーザー・アカウント制御（UAC）制御が働いた為、ファイル書き込み・作成ができなかった。

### 対策

ローカルディレクトリを書き込み権限のあるフォルダに変更するか、UAC (User Account Control)を切れば良い。

### 雑感

今後はCドラ直下にgetしたファイルを保管しないよう気をつける。因みに原因切り分けの際にIBM System i 側の設定も疑ったが、ポート制御設定も問題なかったので早々にクライアント側の問題だと分かった。仮にポート制御設定の不備がある場合はサーバ側からデータ伝送用のコネクションが張れず、250メッセージは出力されない為。
