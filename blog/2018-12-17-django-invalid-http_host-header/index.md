---
title: 'Django: 解決法 Invalid HTTP_HOST header'
date: 2018-12-17
authors: [yukun]
tags:
  - django
  - python
slug: django-invalid-http_host-header
---

Djangoでの開発時に掲題の事象が発生した為、解決法をまとめておく。

### 事象

Djangoで作成したWebサイトにブラウザ経由でアクセスした際に、下記のエラーがDEBUG出力された。

```
Exception Type:	DisallowedHost
Exception Value:	
Invalid HTTP_HOST header: '192.0.2.1:8000'. You may need to add '192.0.2.1' to ALLOWED_HOSTS.

```


<!-- truncate -->


#### 発生環境

CentOS 7.3, nginx/1.12.2, 10.2.19-MariaDB, Python 3.6, (ライブラリ：Django==2.1.3, gunicorn==19.9.0, PyMySQL==0.9.2) アプリケーションサーバはgunicorn。

### 影響

Djangoアプリで描画されたWebページにアクセスできない。

### 対応

下記のsettings.py中のALLOWED\_HOSTS変数へアクセスを許可するホスト名(完全修飾)を記載する。

_app\_root\_folder_/_app\_name_/settings.py

設定の方法は後述の公式ドキュメントをご参照。ワイルドカード指定も可能であり、その場合は以下のように記載する。

```
ALLOWED_HOSTS = ['*']

```

ワイルドカード指定は[HTTP Host header attacks](https://docs.djangoproject.com/en/2.1/topics/security/#host-headers-virtual-hosting)のリスクがあり、別途プロキシサーバー等を立てている場合は、そこでホスト名チェックを代替する方法もある。ただ、セキュリティ防御の基本方針はDefence in Depthなので、どちらも環境に合わせて明示するのがベター。(開発時は省略したくなるが)

### 原因

ALLOWED\_HOSTS配列の要素が空だった為。

### 公式ドキュメント

- [https://docs.djangoproject.com/en/2.1/ref/settings/#allowed-hosts](https://docs.djangoproject.com/en/2.1/ref/settings/#allowed-hosts)
