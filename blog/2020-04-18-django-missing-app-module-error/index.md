---
title: 'Django: エラー解決法 TypeError: __init__() missing 1 required positional argument: ''app_module'''
date: 2020-04-18
authors: [yukun]
tags:
  - django
  - python
  - vscode
slug: django-missing-app-module-error
---

Python 3.8.2、Django==3.0.5の環境で、python manage.py runserverを実行した際に下記のエラーが発生し、サーバーが起動しない事象が発生。


<!-- truncate -->


### エラーメッセージ


```bash
 vscode@d2a06e1c5d42:/workspace$ python manage.py runserver Watching for file changes with StatReloader Performing system checks...

System check identified no issues (0 silenced). April 18, 2020 - 09:48:16 Django version 3.0.5, using settings 'crossk.settings' Starting development server at Quit the server with CONTROL-C. Exception in thread django-main-thread: Traceback (most recent call last): File "/usr/local/lib/python3.8/threading.py", line 932, in _bootstrap_inner self.run() File "/usr/local/lib/python3.8/threading.py", line 870, in run self._target(*self._args, **self._kwargs) File "/home/vscode/.local/lib/python3.8/site-packages/django/utils/autoreload.py", line 53, in wrapper fn(*args, **kwargs) File "/home/vscode/.local/lib/python3.8/site-packages/django/core/management/commands/runserver.py", line 137, in inner_run handler = self.get_handler(*args, **options) File "/home/vscode/.local/lib/python3.8/site-packages/django/contrib/staticfiles/management/commands/runserver.py", line 27, in get_handler handler = super().get_handler(*args, **options) File "/home/vscode/.local/lib/python3.8/site-packages/django/core/management/commands/runserver.py", line 64, in get_handler return get_internal_wsgi_application() File "/home/vscode/.local/lib/python3.8/site-packages/django/core/servers/basehttp.py", line 45, in get_internal_wsgi_application return import_string(app_path) File "/home/vscode/.local/lib/python3.8/site-packages/django/utils/module_loading.py", line 17, in import_string module = import_module(module_path) File "/usr/local/lib/python3.8/importlib/__init__.py", line 127, in import_module return _bootstrap._gcd_import(name[level:], package, level) File "", line 1014, in _gcd_import File "", line 991, in _find_and_load File "", line 975, in _find_and_load_unlocked File "", line 671, in _load_unlocked File "", line 783, in exec_module File "", line 219, in _call_with_frames_removed File "/workspace/crossk/wsgi.py", line 16, in application = get_wsgi_application() File "/home/vscode/.local/lib/python3.8/site-packages/django/core/wsgi.py", line 13, in get_wsgi_application return WSGIHandler() File "/home/vscode/.local/lib/python3.8/site-packages/django/core/handlers/wsgi.py", line 127, in __init__ self.load_middleware() File "/home/vscode/.local/lib/python3.8/site-packages/django/core/handlers/base.py", line 37, in load_middleware mw_instance = middleware(handler) TypeError: __init__() missing 1 required positional argument: 'app_module' 
```


### 原因

settings.pyのINSTALLED\_APPSリストに作成したapp名を記載するところ、誤って、MIDDLEWAREリストに記載していた為。

### 解決法

MIDDLEWAREリストに記載しているapp名を削除し、INSTALLED\_APPSリストにapp名を記載すれば良い。

### 参考サイト

[django - TypeError: \_\_init\_\_() missing 1 required positional argument: 'app\_module' - Stack Overflow](https://stackoverflow.com/questions/53209189/typeerror-init-missing-1-required-positional-argument-app-module)
