---
title: 'Python: PyGaze実行エラー "ImportError: cannot import name ''Screen''" の解決法'
date: 2019-02-19
authors: [yukun]
tags:
  - pygaze
  - python
slug: pygaze-import-error-screen
---

### 事象

[PyGaze](http://www.pygaze.org/)というEye Tracker用のPythonライブラリのサンプルプログラムである[annoying\_message.py](http://www.pygaze.org/documentation/examples/)実行時に下記のエラーが発生。


<!-- truncate -->


```
/Users/xxx/PycharmProjects/pygaze/venv/bin/python /Users/yu/PycharmProjects/pygaze/annoying_message.py
Traceback (most recent call last):
  File "/Users/xxx/PycharmProjects/pygaze/annoying_message.py", line 15, in 
    from pygaze.libscreen import Display, Screen
  File "/Users/xxx/PycharmProjects/pygaze/venv/lib/python3.6/site-packages/pygaze/libscreen.py", line 22, in 
    from screen import Screen
ImportError: cannot import name 'Screen'

Process finished with exit code 1

```

### 発生環境

Python 3.6 (Mac OS)

### 原因

Python 3系のPyGazeライブラリにScreenクラスが含まれていない為。因みに、下記の用にpipでscreenをインストールしても、本件は解消しない。

```
(venv) $ pip install screen
Collecting screen
  Using cached https://files.pythonhosted.org/packages/a4/d2/68dacd66f28618462650e475f29663eb1f97cecdc3cf8f0881e52f425a3a/screen-1.0.1.tar.gz
Building wheels for collected packages: screen
  Building wheel for screen (setup.py) ... done
  Stored in directory: /Users/xxx/Library/Caches/pip/wheels/51/44/cd/d14c668e66a41c06ce691c89c71b674161f5e8a50c64d16fbe
Successfully built screen
Installing collected packages: screen
Successfully installed screen-1.0.1
(venv) $ 

```

annoying\_message.py内の下記のステートメント想定しているインポート先はPyGazeパッケージ内のScreenクラスの為。


```python
 from pygaze.libscreen import Display, Screen 
```


### 解決法

当該スクリプトを実行したい場合は、Python 2.7系でPyGazeの環境構築を行えば良い。
