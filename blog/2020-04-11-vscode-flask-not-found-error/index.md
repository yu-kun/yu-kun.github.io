---
title: 'VSCode: エラー解決法 ModuleNotFoundError: No module named ‘flask'''
date: 2020-04-11
authors: [yukun]
tags:
  - flask
  - python
  - vscode
slug: vscode-flask-not-found-error
---

Visual Studio CodeのDev Container上でPython Flaskライブラリの使用を試みたところ下記のエラーが発生しスクリプトを実行できない事象が発生。


<!-- truncate -->


### エラーメッセージ


```bash
 vscode@7a83afce1faf:/workspaces/test-vs$ pip freeze click==7.1.1 Flask==1.1.2 itsdangerous==1.1.0 Jinja2==2.11.1 MarkupSafe==1.1.1 Werkzeug==1.0.1 vscode@7a83afce1faf:/workspaces/test-vs$ /usr/bin/python3 /workspaces/test-vs/app.py Traceback (most recent call last): File "/workspaces/test-vs/app.py", line 1, in from flask import Flask ModuleNotFoundError: No module named 'flask' 
```


### 原因

使用しているPythonインタプリターのPATHが誤っていた為。


```bash
 vscode@7a83afce1faf:/workspaces/test-vs$ which python /usr/local/bin/python 
```


上記の通り、Pythonコンテナ上のデフォルトパスは/usr/local/bin/pythonだが、エラー発生の指定インタプリタは/usr/bin/python3と相違。原因はVSCodeのローカル環境で一度Pythonインタプリタの設定をした際にsettings.jsonにパス設定をしてしまった為。


```javascript
 { "python.pythonPath": "/usr/bin/python3" } 
```


### 解決法

上記のsettings.jsonのpython.pythonPath行をコメントアウトすればデフォルトのパスを参照するようになる。また、明示的に以下の通り指定しても良い。


```javascript
 { "python.pythonPath": "/usr/local/bin/python3.8" //"python.pythonPath": "/usr/bin/python3" } 
```


### 再実行結果


```bash
 vscode@7a83afce1faf:/workspaces/test-vs$ /usr/local/bin/python3.8 /workspaces/test-vs/app.py * Serving Flask app "app" (lazy loading) * Environment: production WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead. * Debug mode: off * Running on (Press CTRL+C to quit) 127.0.0.1 - - [11/Apr/2020 13:24:20] "GET / HTTP/1.1" 200 -
```


### ソースコード


```python
 from flask import Flask app = Flask(__name__)

@app.route('/') def hello_world(): return "Hello World!"

if __name__=='__main__': app.run() 
```


