---
title: 'Linux: CentOSへのPostfix, Dovecotのインストール・設定'
date: 2014-01-25
authors: [yukun]
tags:
  - centos
  - dovecot
  - linux
  - postfix
slug: linux-centos5-postfix-dovecot-install-setting
---

先日、CentOS v5.X系にメールサーバを構築・動作確認した際の作業ログを以下に掲載。送信(SMTP, SMTPS)サーバには[Postfix](http://www.postfix.org/ "Postfix公式サイト")、受信(POP3, IMAP, POP3S, IMAPS)サーバには[Dovecot](http://www.dovecot.org/ "Dovecot公式サイト")を使用。構築手順は基本的に記事末尾の参考サイトにならっている。尚、nmap, telnet等での動作確認やログからのトラブルシューティング等は別記事にて掲載予定。

### 構築の背景

独自ドメインのメールはGmailやWindows Live、Yahoo等のフリーメールと異なり、一部のネットバンク等でもプロバイダメールと同等のアドレスとして評価され特定のサービスを使用する際に使えること、また、任意のメアド名を選択でき、送信先に対して自ドメインの宣伝にも使えるので、中々活用度が高い為。 
<!-- truncate -->


### サーバ証明書作成

メールサーバ-クライアント間の通信を暗号化する為、予めサーバ証明書(自己署名)を作成。

```
# cd /etc/pki/tls/certs/
# make mail.pem
umask 77 ; \
	PEM1=`/bin/mktemp /tmp/openssl.XXXXXX` ; \
	PEM2=`/bin/mktemp /tmp/openssl.XXXXXX` ; \
	/usr/bin/openssl req -utf8 -newkey rsa:2048 -keyout $PEM1 -nodes -x509 -days 365 -out $PEM2 -set_serial 0 ; \
	cat $PEM1 >  mail.pem ; \
	echo ""    >> mail.pem ; \
	cat $PEM2 >> mail.pem ; \
	rm -f $PEM1 $PEM2
Generating a 2048 bit RSA private key
....................+++
......................................+++
writing new private key to '/tmp/openssl.N32026'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [GB]:JP
State or Province Name (full name) [Berkshire]:Tokyo
Locality Name (eg, city) [Newbury]:Roppongi
Organization Name (eg, company) [My Company Ltd]:example.com
Organizational Unit Name (eg, section) []:
Common Name (eg, your name or your server's hostname) []:mail.example.com
Email Address []:sample@example.com
# cd
#

```

### Postfixのインストール

```
# yum install postfix

```

### Postfixの設定(main.cf)

```
# vim /etc/postfix/main.cf

```

↓設定例。

```
＜前略＞
# The myhostname parameter specifies the internet hostname of this
# mail system. The default is to use the fully-qualified domain name
# from gethostname(). $myhostname is used as a default value for many
# other configuration parameters.
#
#myhostname = host.domain.tld
#myhostname = virtual.domain.tld
myhostname = mail.example.com
# The mydomain parameter specifies the local internet domain name.
# The default is to use $myhostname minus the first component.
# $mydomain is used as a default value for many other configuration
# parameters.
#
#mydomain = domain.tld
mydomain = example.com
＜中略＞
# For the sake of consistency between sender and recipient addresses,
# myorigin also specifies the default domain name that is appended
# to recipient addresses that have no @domain part.
#
#myorigin = $myhostname
#myorigin = $mydomain
myorigin = $mydomain
＜中略＞
# See also the proxy_interfaces parameter, for network addresses that
# are forwarded to us via a proxy or network address translator.
#
# Note: you need to stop/start Postfix when this parameter changes.
#
#inet_interfaces = all
#inet_interfaces = $myhostname
#inet_interfaces = $myhostname, localhost
inet_interfaces = all
＜中略＞
#
# See also below, section "REJECTING MAIL FOR UNKNOWN LOCAL USERS".
#
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
#mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
#mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain,
＜中略＞
# The home_mailbox parameter specifies the optional pathname of a
# mailbox file relative to a user's home directory. The default
# mailbox file is /var/spool/mail/user or /var/mail/user.  Specify
# "Maildir/" for qmail-style delivery (the / is required).
#
#home_mailbox = Mailbox
#home_mailbox = Maildir/
home_mailbox = Maildir/
＜中略＞
# You MUST specify $myhostname at the start of the text. That is an
# RFC requirement. Postfix itself does not care.
#
#smtpd_banner = $myhostname ESMTP $mail_name
#smtpd_banner = $myhostname ESMTP $mail_name ($mail_version)
smtpd_banner = $myhostname ESMTP unknown
＜中略＞
# SASL認証設定等々
disable_vrfy_command = yes
smtpd_sasl_auth_enable = yes
broken_sasl_auth_clients = yes
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_security_options = noanonymous
smtpd_sasl_local_domain = $myhostname
smtpd_sender_restrictions = reject_unknown_sender_domain
smtpd_client_restrictions = permit_mynetworks,reject_unknown_client,permit
smtpd_recipient_restrictions = permit_mynetworks,permit_sasl_authenticated,reject_unauth_destination
message_size_limit = 10485760
# クライアントーサーバ間暗号化設定
smtpd_use_tls = yes
smtpd_tls_cert_file = /etc/pki/tls/certs/mail.pem
smtpd_tls_key_file = /etc/pki/tls/certs/mail.pem
smtpd_tls_session_cache_database = btree:/var/lib/postfix/smtpd_scache
smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache
smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache
smtpd_tls_auth_only = yes

```

### Postfixの設定(master.cf)

```
# vi /etc/postfix/master.cf

```

下記の行のコメントを解除する。

```
smtps     inet  n       - n       - - smtpd
  -o smtpd_tls_wrappermode=yes
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_client_restrictions=permit_sasl_authenticated,reject
tlsmgr    unix  - - n       1000?   1       tlsmgr

```

### saslauthd、Postfixサービスの起動

SMTP-Authを使用する為、saslauthdを起動し自動起動設定。（因みにservice saslauthd startでもよい）

```
# /etc/rc.d/init.d/saslauthd start
saslauthd を起動中:                                        [  OK  ]
# chkconfig saslauthd on

```

既にsendmail使用している場合、停止してMTAをPostfixに切替える。

```
# /etc/rc.d/init.d/sendmail stop
sendmailを停止中:                                          [  OK  ]
# chkconfig sendmail off
# alternatives --config mta
2 プログラムがあり 'mta'を提供します。
  選択       コマンド
-----------------------------------------------
*+ 1           /usr/sbin/sendmail.sendmail
   2           /usr/sbin/sendmail.postfix
Enterを押して現在の選択[+]を保持するか、選択番号を入力します:2

```

Postfixを起動する。

```
# /etc/rc.d/init.d/postfix start
postfix を起動中:                                          [  OK  ]
# chkconfig postfix on

```

### Dovecotのインストール

```
# yum install dovecot

```

### Dovecotの設定

```
# vim /etc/dovecot.conf

```

↓設定例。

```
＜前略＞
# Protocols we want to be serving: imap imaps pop3 pop3s
# If you only want to use dovecot-auth, you can set this to "none".
#protocols = imap imaps pop3 pop3s
protocols = imap imaps pop3 pop3s
＜中略＞
# PEM encoded X.509 SSL/TLS certificate and private key. They're opened before
# dropping root privileges, so keep the key file unreadable by anyone but
# root. Included doc/mkcert.sh can be used to easily generate self-signed
# certificate, just make sure to update the domains in dovecot-openssl.cnf
ssl_cert_file = /etc/pki/tls/certs/mail.pem
ssl_key_file = /etc/pki/tls/certs/mail.pem
＜中略＞
# SSL ciphers to use
ssl_cipher_list = ALL:!LOW:!SSLv2
＜中略＞
# Greeting message for clients.
#login_greeting = Dovecot ready.
login_greeting = POP3 ready.
＜中略＞
#mail_location =
mail_location = maildir:~/Maildir
＜中略＞
auth default {
    mechanisms = plain login
    passdb pam {
    }
    userdb passwd {
    }
    user = root
    socket listen {
      client {
        path = /var/spool/postfix/private/auth
        mode = 0660
        user = postfix
        group = postfix
      }
    }
}

```

### Dovecotの起動

```
# /etc/rc.d/init.d/dovecot start
Dovecot Imapを起動中:                                      [  OK  ]
# chkconfig dovecot on

```

### メールユーザの追加

当該ユーザをリモート接続をさせない場合は下記のコマンドパラメーターを用いる。

```
# useradd -s /sbin/nologin sample
# passwd sample
New UNIX password:
Retype new UNIX password:
passwd: all authentication tokens updated successfully.

```

インストールと設定はこれで完了。[動作確認の記事に続く予定。(←書きました。)](/blog/linux-telnet-smtp-pop3-mail "telnetコマンドでのメールサーバ(SMTP, SMTP-AUTH, POP3)の動作確認")

### 参考サイト

- [メールサーバー構築(Postfix+Dovecot) - CentOSで自宅サーバー構築](http://centossrv.com/postfix.shtml)
- [メールサーバー間通信内容暗号化(OpenSSL+Postfix+Dovecot) - CentOSで自宅サーバー構築](http://centossrv.com/postfix-tls.shtml)
- [HowTos/postfix sasl - CentOS Wiki](http://wiki.centos.org/HowTos/postfix_sasl)
