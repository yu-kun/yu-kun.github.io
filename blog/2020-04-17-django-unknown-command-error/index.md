---
title: 'Django: エラー解決法 Unknown command: ''~'' Type ''manage.py help'' for usage.'
date: 2020-04-17
authors: [yukun]
tags:
  - django
  - python
slug: django-unknown-command-error
---

Python 3.8.2、Django==3.0.5の環境で、カスタムコマンドを作成の上、python manage.py コマンド名 を実行したところ、下記のエラーが発生しコマンド処理が実行されない事象が発生。


<!-- truncate -->


### エラーメッセージ


```bash
 vscode@d2a06e1c5d42:/workspace$ python manage.py crawl Unknown command: 'crawl' Type 'manage.py help' for usage. 
```


### 事象発生時のDjangoプロジェクトフォルダ構成

```
project/ # Djangoプロジェクトトップディレクトリ
    manage.py
    app_name/
        __init__.py
        models.py
        management/
            __init__.py
            commands/
                __init__.py
                crawl.py
        views.py
```

### 原因

settings.py内のINSTALLED\_APPSリストにカスタムコマンドpyファイルが設置されているアプリ名を設定していなかった為。

### 解決法

上記の通り、INSTALLED\_APPSリストにアプリ名を設定することで当該エラーは解消する。


```bash
 INSTALLED_APPS = ( 'django.contrib.auth', 'django.contrib.admin', 'django.contrib.contenttypes', 'django.contrib.sessions', 'django.contrib.sites', 'app_name', # <= アプリ名を追加 ) 
```


動作確認としてpython manage.py helpを実行することで、利用できるカスタムコマンド一覧(Available subcommands)を出力できる。

### 参考サイト

[django custom command not found - Stack Overflow](https://stackoverflow.com/questions/2190539/django-custom-command-not-found)
