---
title: 'Postfix, Dovecot用の複数ドメイン[マルチドメイン]TLS証明書の取得(同一IPアドレス)'
date: 2019-12-17
authors: [yukun]
tags:
  - centos
  - certification
  - dovecot
  - email
  - linux
  - postfix
  - tls
slug: multi-domain-tls-certbot
---

1つの仮想OS上で複数ドメインに対応した送受信メールサーバの構築の為、PostfixとDovecotのTLS設定周りを確認したのだが、設定できる証明書は1ファイルのみで複数の指定は現時点不可。今回は複数ドメイン(e.g. example.com, fxample.net等)を1ファイルまとめた証明書を作成することで対応する為(※)、Open CAであるLet's Encryptのクライアントソフトウェア(certbot)を用いて証明書を取得する手順を紹介する。 ※証明書に別ドメインが内包される点を許容できない場合は記事末尾の参考サイトをご参照。


<!-- truncate -->


### 実行環境

CentOS 7, certbot 0.39.0, Postfix 3.4.7, Dovecot 2.2.36

### マルチドメイン内包のTLS証明書の取得コマンド


```bash
 # certbot certonly --webroot -w /srv/wordpress -d mail.example.com -w /srv/html -d mail.fxample.net -w /srv/shop -d mail.gxample.info Saving debug log to /var/log/letsencrypt/letsencrypt.log Plugins selected: Authenticator webroot, Installer None Starting new HTTPS connection (1): acme-v02.api.letsencrypt.org Obtaining a new certificate

IMPORTANT NOTES: - Congratulations! Your certificate and chain have been saved at: /etc/letsencrypt/live/mail.example.com/fullchain.pem Your key file has been saved at: /etc/letsencrypt/live/mail.example.com/privkey.pem Your cert will expire on 2020-03-14. To obtain a new or tweaked version of this certificate in the future, simply run certbot again. To non-interactively renew *all* of your certificates, run "certbot renew" - If you like Certbot, please consider supporting our work by:

Donating to ISRG / Let's Encrypt: https://letsencrypt.org/donate Donating to EFF: https://eff.org/donate-le 
```


(ご参考) 認証に用いるWebサーバ(Nginx)側の設定については下記リンクに記載している。 [Nginx: Let’s EncryptのTLS/SSL証明書の更新方法(手動)](/blog/nginx-lets-encrypt-certificate-update)

証明書の保管先フォルダドメイン名は最初に指定したドメイン名となる。後は当該ファイルはPostfix、Dovecotのconfファイルへ指定し関連設定を行う。

### Postfix - /etc/postfix/main.cf


```bash
 smtpd_tls_cert_file = /etc/letsencrypt/live/mail.example.com/fullchain.pem smtpd_tls_key_file = /etc/letsencrypt/live/mail.example.com/privkey.pem 
```


### Dovecot - /etc/dovecot/conf.d/10-ssl.conf


```bash
 ssl_cert = </etc/letsencrypt/live/mail.example.com/fullchain.pem ssl_key = </etc/letsencrypt/live/mail.example.com/privkey.pem 
```


Postfix, Dovecot全般の設定については今後別途記事でまとめる予定。

**追記(2020-04-19)：** 上記の設定だと、Mac Mailクライアントを用いた場合は下記のエラーメッセージがdovecotログに出力され、クライアント側でメール受信ができない事象が発生。


```bash
 Mar 14 18:53:58 tk2-123-45678 dovecot: imap-login: Aborted login (no auth attempts in 0 secs): user=<>, rip=192.168.2.1, lip=192.168.2.2, TLS, session=<DJ+hkfsagVK7SirDy> Mar 14 18:53:59 tk2-123-45678 dovecot: imap-login: Disconnected (no auth attempts in 1 secs): user=<>, rip=192.168.2.1, lip=192.168.2.2, TLS, session=<G/OkkM2gsaSirDy> Mar 14 18:54:00 tk2-123-45678 dovecot: imap-login: Login: user=<email@example.com>, method=CRAM-MD5, rip=192.168.2.1, lip=192.168.2.2, mpid=30131, TLS, session=<Grq5kMgafeeSirDy> Mar 14 18:54:22 tk2-123-45678 dovecot: imap-login: Disconnected (no auth attempts in 0 secs): user=<>, rip=192.168.2.1, lip=192.168.2.2, TLS handshaking: SSL_accept() failed: error:14094416:SSL routines:ssl3_read_bytes:sslv3 alert certificate unknown: SSL alert number 46, session=<F2sfasg6vjSirDy> ・・・以下同メッセージが出力され続ける。 
```


解決法は各ドメイン用のSSL証明書を個別に取得の上、10-ssl.confファイルの設定を以下の通り修正する。local\_nameディレクティブでドメイン毎に使用する証明書の設定が可能。


```bash
 ssl_cert = </etc/letsencrypt/live/mail.example.com/fullchain.pem ssl_key = </etc/letsencrypt/live/mail.example.com/privkey.pem

local_name example.com { ssl_cert = </etc/letsencrypt/live/example.com/fullchain.pem ssl_key = </etc/letsencrypt/live/example.com/privkey.pem } local_name fxample.net { ssl_cert = </etc/letsencrypt/live/fxample.net/fullchain.pem ssl_key = <//etc/letsencrypt/live/fxample.net/privkey.pem } 
```


### 参考サイト

- [Postfix and multiple SSL certificates - lxadm | Linux administration tips, tutorials, HOWTOs and articles](https://lxadm.com/Postfix_and_multiple_SSL_certificates) master.cf側でinterface IP毎にTLS証明書を指定する方法。この方法を採るのであれば複数ドメインを1ファイルにまとめる必要もないが、グローバルIPが潤沢にない場合、かつ2019.12時点のversionでは上記の方法にならざる負えない。数年前と異なり、TLS証明書の取得についてはLet's Encryptで無料で手に入る環境が出来たことは良い点。

- [Let's Encrypt の使い方 - Let's Encrypt 総合ポータル](https://free-ssl.jp/usage/#ExecClientSoftware)

- [SSLサーバ証明書 : dovecotサーバ証明書のインストール方法 | DigiCert](https://rms.ne.jp/sslserver/install/install_dovecot-html/)
