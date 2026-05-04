---
title: 'Django: エラー解決法 "raise ImproperlyConfigured(''mysqlclient 1.3.13 or newer is required; 〜) django.core.exceptions.ImproperlyConfigured: 〜"'
date: 2019-05-01
authors: [yukun]
tags:
  - django
  - mariadb
  - mysql
  - python
slug: django-mysqlclient-error
---

[Django 2.2のリリース](https://docs.djangoproject.com/en/2.2/releases/2.2/)に伴い、早速既存のWebアプリの互換性チェックの為にライブラリのversion updateを行ったが、下記のエラーメッセージが出力されマイグレーションが異常終了。


<!-- truncate -->


### 事象発生時のエラーメッセージ

```
(venv) $ python manage.py makemigrations ＜アプリ名＞
Traceback (most recent call last):
  File "manage.py", line 17, in 
    execute_from_command_line(sys.argv)
＜中略＞
  File "＜略＞/venv/lib/python3.7/site-packages/django/db/backends/mysql/base.py", line 36, in 
    raise ImproperlyConfigured('mysqlclient 1.3.13 or newer is required; you have %s.' % Database.__version__)
django.core.exceptions.ImproperlyConfigured: mysqlclient 1.3.13 or newer is required; you have 0.9.3.

```

### 発生環境

macOS v10.14.4, Python 3.7, Django 2.2, PyMySQL 0.9.3

### 原因

メッセージの通り、mysqlclientのバージョンが低いから。今更ながらDjango側の推奨MySQL (MariaDB)ライブラリはPyMySQL**ではなく**mysqlclientであることを知る。

公式ドキュメント：[Databases | Django documentation | Django](https://docs.djangoproject.com/en/3.2/ref/databases/#mysql-db-api-drivers)

参考までに両ライブラリの記事公開時点の最新バージョンを掲載。

- [PyMySQL · PyPI](https://pypi.org/project/PyMySQL/#history)：記事公開時点の最新は0.9.3 (Dec 18, 2018)

- [mysqlclient · PyPI](https://pypi.org/project/mysqlclient/#history)：記事公開時点の最新は1.4.2 (Feb 8, 2019)

### 解決法

公式推奨のライブラリに切り替えるべく、PyMySQLのアンインストール及びmysqlclientのインストールを以下のコマンドで行う。

```
(venv) $ pip uninstall pymysql
(venv) $ pip install mysqlclient

```

仮にmysqlclientのインストールでエラーが発生為た場合は下記の記事をご参照。 [Django: macOSでのpip install mysqlclient エラーの解決法](/blog/pip-install-mysqlclient-error)

記事公開時点での確認環境は以下の通り。

```
Django==2.2.1
mysqlclient==1.4.2.post1

```

ライブラリのインストール完了後、各ファイル(※1)で宣言されたpymysqlに関わるステートメント(※2)を削除していく。 ※1：

1. manage.py
2. プロジェクトフォルダ名/\_\_init\_\_.py

※2： 

```python
 import pymysql pymysql.install_as_MySQLdb() 
```


Djangoライブラリのupdate後はmigrationを実施する。ここで問題なければ事象解消と言って良い。

```
(venv) $ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sc, sessions
Running migrations:
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK

```

仮にmigrationを実施しない場合はrunserver実行時に下記の警告が発生する為。

```
(venv) $ python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 2 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): auth.
Run 'python manage.py migrate' to apply them.
＜後略＞

```

尚、settings.pyのDATABASES変数はPyMySQLと同値で問題ない。


```python
 DATABASES = { 'default': { 'ENGINE': 'django.db.backends.mysql', 'NAME': 'XXX', # データベース名 'USER': 'YYY', # ユーザ名 'PASSWORD': 'ZZZ', # パスワード 'HOST': '127.0.0.1', # MariaDBがあるサーバのIPアドレスやホストを。空欄はローカルホスト 'PORT': '3306', # 空欄はデフォルトポートの3306 } } 
```


