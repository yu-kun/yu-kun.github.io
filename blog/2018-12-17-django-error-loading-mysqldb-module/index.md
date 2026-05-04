---
title: 'Django: 解決法 Error loading MySQLdb module.'
date: 2018-12-17
authors: [yukun]
tags:
  - django
  - python
slug: django-error-loading-mysqldb-module
---

掲題のエラー対応したので、備忘として記載。

### 事象

Djangoを稼働させるアプリケーションサーバのサービス起動後に下記のエラーメッセージが出力。

```
  File "/usr/lib64/python3.6/importlib/__init__.py", line 126, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
  File "/srv/sskcoin/venv/lib64/python3.6/site-packages/django/db/backends/mysql/base.py", line 20, in 
    ) from err
django.core.exceptions.ImproperlyConfigured: Error loading MySQLdb module.
Did you install mysqlclient?
[2018-12-14 16:11:40 +0000] [7538] [INFO] Worker exiting (pid: 7538)
[2018-12-15 01:11:40 +0900] [7535] [INFO] Shutting down: Master
[2018-12-15 01:11:40 +0900] [7535] [INFO] Reason: Worker failed to boot.

```


<!-- truncate -->


#### 発生環境

CentOS 7.3, nginx/1.12.2, 10.2.19-MariaDB, Python 3.6, (ライブラリ：Django==2.1.3, gunicorn==19.9.0, PyMySQL==0.9.2) アプリケーションサーバはgunicorn。

### 影響

DjangoアプリケーションにWebブラウザ経由でアクセスできない。

### 対応

\_\_init\_\_.pyファイルにインポート文を追記し改めてサービスを再起動することで事象は解消する。

#### 追記先ファイル

_app\_root\_folder_/_app\_name_/\_\_init\_\_.py

#### 追記内容


```python
import pymysql
pymysql.install_as_MySQLdb()
```


### 原因

MariaDBへのアクセスを行うた為のライブラリ(PyMySQL)のインポート宣言が漏れていた為。開発環境ではmanage.pyでアプリケーションサーバを立てており、manage.pyには記載はあったものの、gunicorn用の宣言が漏れていた為。

開発時から本番想定の稼働環境をDocker等で用意しておくと良さそうな気がしてきた。
