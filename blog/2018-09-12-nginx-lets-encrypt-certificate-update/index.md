---
title: 'Nginx: Let''s EncryptのTLS/SSL証明書の更新方法(手動)'
date: 2018-09-12
authors: [yukun]
tags:
  - certification
  - nginx
  - security
  - tls
  - wordpress
slug: nginx-lets-encrypt-certificate-update
---

3ヶ月ほど前に本ブログのサーバを更改の上、https化対応を実施。TLS証明書についてはフリーの[Let's Encrypt](https://letsencrypt.org/how-it-works/)より発行したが、当該証明書の[有効期間は90日](https://letsencrypt.org/2015/11/09/why-90-days.html)である為、先日初回の更新を行った。本記事はその際の作業手順を記載したもの。


<!-- truncate -->


### 前提環境

CentOS 7系、Nginx、Let's Encryptのクライアントツールはcertbot。既にTLS証明書は導入済み。

### Nginxの設定

certbotの--webrootオプション(※)を用いてcertbotクライアント(webサーバ側)と認証局側の認証を行う際、認証局側はhttp://www.example.com/.well-known/acme-challenge/以下のファイルにhttpでアクセス(GETメソッド)を行う。

※webサーバ側のドキュメントルート下に出力される認証用のファイルで認証を行う。 [User Guide — Certbot documentation](https://certbot.eff.org/docs/using.html)

httpsではなくhttpであり、仮に全てのhttpアクセスを301リダイレクトしている場合は認証が失敗する為、下記の通りNginxの設定を変更する。

```
server {
  listen  80;

  location ^~ /.well-known/acme-challenge/ {
    default_type "text/plain";
    root /xxx/yyy;
  }

  location / {
    return 301 https://$host$request_uri;
  }
}

```

変更対象ファイルは下記の何れか。私はconf.d/以下にserverディレクティブの設定を記載しているのでNo.2のファイル。

1. /etc/nginx/nginx.conf
2. /etc/nginx/conf.d/{{filename}}.conf

設定ファイルの修正後、下記コマンドで設定のテスト及び反映。

```
# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
# systemctl reload nginx

```

念の為、httpで下記のパスへアクセスした際にリダイレクトされない事確認。

また、.well-known/acme-challenge以外のパスへのhttpアクセス時にhttpsアドレスへ301リダイレクトされることを確認する。

### TLS証明書の更新

下記コマンドを用いて証明書を更新。

```
# certbot certonly --webroot -w /xxx/yyy -d example.com -d www.example.com -d mail.example.com --agree-tos --force-renewal -n
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator webroot, Installer None
Starting new HTTPS connection (1): acme-v02.api.letsencrypt.org
Renewing an existing certificate
Performing the following challenges:
http-01 challenge for example.com
http-01 challenge for mail.example.com
http-01 challenge for www.example.com
Using the webroot path /xxx/yyy for all unmatched domains.
Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/example.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/example.com/privkey.pem
   Your cert will expire on 2018-12-07. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le

```

その後、改めてNginx設定の更新。

```
# systemctl reload nginx

```

最後にブラウザより証明書のnot valid after要素が更新されている事を確認。

因みに、httpアクセスが出来なかった場合はcertbotコマンドで下記のエラーが出力される。

```
Failed authorization procedure. www.example.com (http-01): urn:ietf:params:acme:error:unauthorized :: 
The client lacks sufficient authorization :: 
Invalid response from : 
"
404 Not Found

404 Not Found
", www.example.com (http-01): urn:ietf:params:acme:error:unauthorized :: 
The client lacks sufficient authorization :: 
Invalid response from : "

```

また、次回以降の更新については、下記のcertbot renewコマンドで更新可能。まだ期限まで期間のあるドメインについては、skipされる。(下記の実行例ではexample2.comドメインがスキップされている。)

```
# certbot renew
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/example.com.conf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Cert is due for renewal, auto-renewing...
Plugins selected: Authenticator webroot, Installer None
Starting new HTTPS connection (1): acme-v02.api.letsencrypt.org
Renewing an existing certificate
Performing the following challenges:
http-01 challenge for mail.example.com
http-01 challenge for www.example.com
http-01 challenge for example.com
Waiting for verification...
Cleaning up challenges

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
new certificate deployed without reload, fullchain is
/etc/letsencrypt/live/example.com/fullchain.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/example.com-0001.conf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Cert is due for renewal, auto-renewing...
Plugins selected: Authenticator webroot, Installer None
Starting new HTTPS connection (1): acme-v02.api.letsencrypt.org
Renewing an existing certificate
Performing the following challenges:
http-01 challenge for example.com
Waiting for verification...
Cleaning up challenges

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
new certificate deployed without reload, fullchain is
/etc/letsencrypt/live/example.com-0001/fullchain.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/www.lundi.jp.conf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Cert not yet due for renewal

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

The following certs are not due for renewal yet:
  /etc/letsencrypt/live/www.example2.com/fullchain.pem expires on 2019-02-06 (skipped)
Congratulations, all renewals succeeded. The following certs have been renewed:
  /etc/letsencrypt/live/example.com/fullchain.pem (success)
  /etc/letsencrypt/live/example.com-0001/fullchain.pem (success)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

```

この証明書をcronで自動更新する設定については下記の記事をご参照。 [Nginx: Let’s Encrypt (certbot)のTLS/SSL証明書をcronで定期自動更新する設定](/blog/cron-certbot-renew)

### 参考サイト

- [Let's Encrypt - Free SSL/TLS Certificates](https://letsencrypt.org/)
- [Let's Encrypt 総合ポータル](https://free-ssl.jp/)
