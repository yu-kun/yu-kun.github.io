---
title: 'IBM System i (AS400): SSHポートフォワーディングFTPとSFTPの違い'
date: 2016-09-20
authors: [yukun]
tags:
  - ftp
  - ibm
  - network
  - security
  - ssh
  - system-i
slug: ibm-i-as400-ssh-port-forwarding-ssh-sftp-difference
---

SSHポートフォワーディングFTP (FTP over SSHとも言う)とSFTPの主な違いについてIBM i OSユニークな点も含めて下表に纏める。 
<!-- truncate -->


| # | 比較項目 | FTP over SSH | SFTP |
| --- | --- | --- | --- |
| 1 |  暗号通信プロトコル |  SSH | SSH |
| 2 | 認証 |  パスワード | パスワード 公開鍵認証 |
| 3 | 伝送モード |  Binary, ASCII | Binary |
| 4 | FTPコマンド |  全て使用可能 | 一部可能 |
| 5 | 伝送可能オブジェクト |  全て | IFS上：全て ライブラリ上：PFのみ |
| 6 | 必要接続セッション数 |  2つ (SSH + FTP) | 1つ |

暗号通信プロトコルは両者ともSSHで共通。 FTP over SSHはsshトンネリングを使用したFTPにすぎず、主な違い目の観点としてはFTPとSFTP間の違いとなる。

### 参考サイト

- [IBM Configuring the IBM i SSH, SFTP, and SCP Clients to Use Public-Key Authentication - Japan](http://www-01.ibm.com/support/docview.wss?uid=nas8N1012710)
