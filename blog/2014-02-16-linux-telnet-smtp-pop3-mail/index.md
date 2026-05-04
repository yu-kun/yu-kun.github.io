---
title: 'telnetコマンドでのメールサーバ(SMTP, SMTP-AUTH, POP3)の動作確認'
date: 2014-02-16
authors: [yukun]
tags:
  - dovecot
  - linux
  - network
  - postfix
slug: linux-telnet-smtp-pop3-mail
---

[前回の記事にてメールサーバを構築](/blog/linux-centos5-postfix-dovecot-install-setting "Linux: CentOSへのPostfix, Dovecotのインストール・設定")。本記事は当該サーバに対する動作確認の手法や良くあるエラーの対処例を記載する。

### nmapコマンドによるポート開放確認

Postfix, Dovecotの動作確認の前に、そもそもサービスのポートが開放されているかをサーバの外部ネットワークからnmapコマンドを用いて確認する。（nmap自体は[公式サイト](http://nmap.org/)より適切なモジュールをダウンロード・インストールすればWindows, Mac, LinuxのいずれのOSでも使用可能。） その実行結果例は下記の通り。nmapコマンドはデフォルトでwell knownポートに対してスキャンをかける。smtp, pop3, imap, imaps, pop3s等が、openであればOK。勿論、dovecot.confのprotocolsディレクティブ設定において、pop3, imapを指定してなければ当該ポートはopenとはならない。

```
$ nmap mail.example.com
Starting Nmap 6.40-2 ( http://nmap.org ) at 2014-02-16 16:47 JST
Nmap scan report for mail.example.com (example.com 192.0.2.10)
Host is up (0.034s latency).
Not shown: 991 filtered ports
PORT    STATE  SERVICE
22/tcp  open   ssh
80/tcp  open   http
110/tcp open   pop3
113/tcp closed ident
143/tcp open   imap
443/tcp closed https
465/tcp open   smtps
993/tcp open   imaps
995/tcp open   pop3s
Nmap done: 1 IP address (1 host up) scanned in 81.68 seconds

```

仮にこの段階で期待するポートがopenで無かった場合、iptable設定やネットワークファイアウォールの設定を確認すると良い。ネットワーク型とホスト型(iptable)の切り分けは単純にメールサーバ上でlocalhostに対するnmapを実施すればよい。 
<!-- truncate -->


### telnetコマンドによるメールの送信確認

Postfixの動作確認として、ローカルからtelnetコマンドを用いてSMTPのプロトコルに沿ってメールを送信する。尚、下記のコマンド・ログ上の「←」以降の文字列は補足書きの為、実際のコマンド打鍵時には入力はしない。 尚、SMTPのプロトコルについて詳細を確認したい場合は下記のリンクを当たると良い。 [Simple Mail Transfer Protocol - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) ページの末尾にRFCへのリンクも記載されている。こちらも体力があるなら読んでみると良いかも。

```
# telnet localhost 25
Trying 127.0.0.1...
Connected to localhost.localdomain (127.0.0.1).
Escape character is '^]'.
220 mail.example.com ESMTP unknown ← メールサーバソフト名の隠蔽確認。
EHLO mail.example.com ← サポートしている拡張機能一覧の確認。
250-mail.example.com
250-PIPELINING
250-SIZE 10485760
250-ETRN
250-AUTH DIGEST-MD5 PLAIN LOGIN CRAM-MD5
250-AUTH=DIGEST-MD5 PLAIN LOGIN CRAM-MD5
250-ENHANCEDSTATUSCODES
250-8BITMIME
250 DSN
AUTH PLAIN AHNhbXBsZQBwYXNzd29yZA== ← Base64エンコードされたユーザー名、パスワードで認証。
235 2.0.0 Authentication successful ← 認証成功(SMTP-Authの動作確認)
MAIL FROM:sample@example.com ← 送信元アドレスを指定。（偽装可能）
250 2.1.0 Ok
RCPT TO:sample@gmail.com ← 宛先アドレスを指定。
250 2.1.5 Ok
DATA ← メールデータの転送開始。
354 End data with .
SUBJECT this is test ← 件名を指定。
test mail ← 本文を入力。
. ← 本文の入力の最後は「.」のみを入力しEnter
250 2.0.0 Ok: queued as 526562BE062 ← キューへの格納確認。
QUIT ← 接続切断。
221 2.0.0 Bye
Connection closed by foreign host.
#

```

EHLO、DATA等のコマンドは英子文字でも可。上記のコマンドの中で、認証情報(ユーザー名、パスワード)をBase64エンコードしたものをパラメーターとして入力している。ちまたのメールクライアントであれば自動で変換・送出してくれるが、ここでは予めPerlのモジュール・関数を用いてBase64エンコードした文字列を用意しておく。

```
$ perl -MMIME::Base64 -e 'print encode_base64("\000sample\000password");'
AHNhbXBsZQBwYXNzd29yZA==

```

実際に使用する際は、sampleをユーザー名に、passowordをパスワード文字列に置き換えて実行する。 逆にBase64エンコードされた文字列をデコードしたい場合は、下記のコマンドを用いる。

```
$ perl -MMIME::Base64 -e 'print decode_base64("AHNhbXBsZQBwYXNzd29yZA==");'
samplepassword

```

### telnetコマンドによるメールの受信確認

Dovecotの動作確認として、ローカルからtelnetコマンドを用いてPOP3のプロトコルに沿ってメールを受信する。状況としては、とあるGmailアドレスからsample@example.comへ下記のメールが既に送信されているものとする。

```
Test mail
--
Ex sample
2014/1/19  :
> test mail

```

なお、POPのプロトコルについては例によって下記のサイトか、RFCを参照することをオススメする。 [Post Office Protocol - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Post_Office_Protocol)

```
# telnet localhost 110
Trying 127.0.0.1...
Connected to localhost.localdomain (127.0.0.1).
Escape character is '^]'.
+OK POP3 ready.
USER sample ← ユーザー名「sample」を指定
+OK
PASS password ← パスワード「password」を指定
+OK Logged in.
STAT
+OK 1 1795
LIST
+OK 1 messages:
1 1795 ← 1メール受信
.
RETR 1 ← No.1のメールの内容を表示
+OK 1795 octets
Return-Path: 
X-Original-To: sample@example.com
Delivered-To: sample@example.com
Received: from mail-lb0-f173.google.com (mail-lb0-f173.google.com [209.85.217.173])
     by mail.example.com (Postfix) with ESMTP id 87BA52BDFB1
     for ; Sun, 19 Jan 2014 00:38:18 +0900 (JST)
Received: by mail-lb0-f173.google.com with SMTP id y6so3804165lbh.18
        for ; Sat, 18 Jan 2014 07:38:15 -0800 (PST)
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=gmail.com; s=20120113;
        h=mime-version:in-reply-to:references:from:date:message-id:subject:to
         :content-type;
        ＜中略＞
X-Received: by 10.112.158.231 with SMTP id wx7mr4548632lbb.27.1390059494844;
 Sat, 18 Jan 2014 07:38:14 -0800 (PST)
MIME-Version: 1.0
Received: by 10.112.141.195 with HTTP; Sat, 18 Jan 2014 07:37:34 -0800 (PST)
In-Reply-To: <20140118153212.663612BDFB1@mail.example.com>
References: <20140118153212.663612BDFB1@mail.example.com>
From: Ex sample 
Date: Sun, 19 Jan 2014 00:37:34 +0900
Message-ID: 
Subject: Re: this is test
To: Ex sample 
Content-Type: text/plain; charset=ISO-8859-1
Test mail
--
Ex sample
2014/1/19  :
> test mail
.
QUIT
+OK Logging out.
Connection closed by foreign host.
#

```

### エラー発生時の参照先ログ

よく使うのは/var/log/maillog。モニタリング時は下記のコマンドで読み込むとファイルにログの書き込みがある際に自動表示をしてくれる。

```
tail -f /var/log/maillog

```

因みに良くある間違いがユーザー名にメールアドレスを指定してしまった場合（プロバイダやフリーメールでは良くあるが。。）。下記の例では、サーバに登録されているユーザー名はsampleであるが、実際に指定しているユーザー名はsample@example.comである為、authentication failure、error retrieving information about userが出力されている。

```
Jan 18 22:26:33 example dovecot-auth: pam_succeed_if(dovecot:auth): error retrieving information about user sample@example.com
Jan 18 22:26:38 example dovecot-auth: pam_unix(dovecot:auth): check pass; user unknown
Jan 18 22:26:38 example dovecot-auth: pam_unix(dovecot:auth): authentication failure; logname= uid=0 euid=0 tty=dovecot ruser= rhost=::ffff:192.0.2.20
Jan 18 22:26:38 example dovecot-auth: pam_succeed_if(dovecot:auth): error retrieving information about user sample@example.com

```

次に良くある?かどうかは知らないが、下記のエラー。

```
Jan 18 20:26:20 example postfix/postfix-script: stopping the Postfix mail system
Jan 18 20:26:20 example postfix/master[469]: terminating on signal 15
Jan 18 20:26:55 example postfix/postfix-script: starting the Postfix mail system
Jan 18 20:26:56 example postfix/master[1226]: daemon started -- version 2.3.3, configuration /etc/postfix
Jan 18 20:28:39 example postfix/tlsmgr[1248]: fatal: open database /var/lib/postfix/smtpd_scache.db: No such file or directory
Jan 18 20:28:40 example postfix/master[1226]: warning: process /usr/libexec/postfix/tlsmgr pid 1248 exit status 1
Jan 18 20:28:40 example postfix/master[1226]: warning: /usr/libexec/postfix/tlsmgr: bad command startup -- throttling

```

対処法は下記のサイトをご参考。 [Postfix Plesk on Ubuntu Error fatal: open database /var/lib/postfix/smtpd\_scache.db: Invalid argument | StuffThatSpins.com](http://stuffthatspins.com/2012/11/26/postfix-plesk-on-ubuntu-error-fatal-open-database-varlibpostfixsmtpd_scache-db-invalid-argument/) 次は各サーバのセキュリティ設定や暗号化されているimapsをWireSharkでスニッフィングする記事を書く予定。
