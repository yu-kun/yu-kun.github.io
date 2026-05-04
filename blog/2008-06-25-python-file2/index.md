---
title: 'Python: ファイル、ディレクトリの属性確認(存在、読み込み、書き込み、実行)'
date: 2008-06-25
authors: [yukun]
tags:
  - file
  - python
slug: python-file2
---

### ソースコード


```python
 $ python >>> import os >>> os.access('/root', os.F_OK) True >>> os.access('/root', os.R_OK) False >>> os.access('/home', os.R_OK) True >>> os.access('/root', os.W_OK) False >>> os.access('/root', os.X_OK) False >>> exit() $ 
```

 os.access()の第1引数には調べるパスを指定し、第2引数には調べる内容を指定します。

| 第2引数 | 調べる内容 |
| --- | --- |
| os.F\_OK | 存在するか? |
| os.R\_OK | 読み込めるか? |
| os.W\_OK | 書き込めるか? |
| os.X\_OK | 実行可能か? |

上の例は、一般ユーザで実行しているため、/rootの読み書きはできないことを示しています。

### リファレンス

- [14.1 os -- Miscellaneous operating system interfaces](http://docs.python.org/2/library/os.html)
    - [14.1.4 Files and Directories](http://docs.python.org/2/library/os.html#os-file-dir)
