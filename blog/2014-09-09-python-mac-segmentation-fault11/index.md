---
title: 'Python: MacのインタプリタでのSegmentation fault: 11エラーの解決策'
date: 2014-09-09
authors: [yukun]
tags:
  - mac
  - python
slug: python-mac-segmentation-fault11
---

### 事象

下記の通り2行目の処理でセグメンテーションエラーとなる。 

```python
 $ python Python 2.7.2 (v2.7.2:8527427914a2, Jun 11 2011, 15:22:34) [GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin Type "help", "copyright", "credits" or "license" for more information. >>> str1 = 'hello.doc' >>> print str1 Segmentation fault: 11 
```

 
<!-- truncate -->


### 発生環境

Mac OS 10.9.4 (Mavericks), Python 2.7.2

### 解決策

以下の通り、readline.so を readline.so.disabled にリネームする。

```
$ which python
/Library/Frameworks/Python.framework/Versions/2.7/bin/python
$ cd /Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload/
$ sudo mv readline.so readline.so.disabled

```

### 参考サイト

- [Issue 18458: interactive interpreter crashes and test\_readline fails on OS X 10.9 Mavericks due to libedit update - Python tracker](http://bugs.python.org/issue18458)
- [osx mavericks - Python crashing when running two commands (Segmentation Fault: 11) - Stack Overflow](http://stackoverflow.com/questions/18158381/python-crashing-when-running-two-commands-segmentation-fault-11)
