---
title: 'Python: win32comモジュールのインストール方法'
date: 2012-05-15
authors: [yukun]
tags:
  - python
  - windows
slug: python-win32com-module-install
---

PythonでWindowsのアプリ・ファイルを扱う際に必要なwin32comモジュールのインストール方法を以下の通り。 
<!-- truncate -->


1. 配布元へアクセス：Win32 Extensions for Python
2. ダウンロードエリアに移動：[Python for Windows extensions - Browse Files at SourceForge.net](http://sourceforge.net/projects/pywin32/files/)
3. ページ中のpywin32のリンクを開き、最新ビルドリンクを開く
4. Pythonの使用環境に合わせてダウンロードパッケージを選択(32bit or 64bitはpythonのプロンプト実行時に確認できる) 32bitの例：
    
    ```
    C:\Users\yukun>python
    Python 2.7.1 (r271:86832, Nov 27 2010, 18:30:46) [MSC v.1500 32 bit (Intel)] on win32
    Type "help", "copyright", "credits" or "license" for more information.
    >>>
    
    ```
    
    この場合は、pywin32-XXX.win32-py2.7.exeを選択
5. ダウンロードしたexeファイルを実行しインストールする
6. インストール後”C:\\...\\Lib\\site-packages”ディレクトリにwin32comモジュールのファイル群が作成されていることを確認
7. import文が正常に実行できることを確認
    
    ```
    C:\Users\yukun>python
    Python 2.7.1 (r271:86832, Nov 27 2010, 18:30:46) [MSC v.1500 32 bit (Intel)] on
    win32
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import win32com
    >>>
    
    ```
