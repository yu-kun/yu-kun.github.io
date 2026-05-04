---
title: 'Python pip: エラー対処法 - "Could not find a version that satisfies the requirement PIL (from versions: ) No matching distribution found for PIL"'
date: 2019-02-18
authors: [yukun]
tags:
  - python
slug: python-pip-pil-install-error
---

Python Imaging Library (PIL)をpipでインストールを試みたところ、下記のエラーメッセージが出力され、インストールプロセスが中断。

```
(venv) $ pip install pil
Collecting pil
  Could not find a version that satisfies the requirement pil (from versions: )
No matching distribution found for pil

```

発生環境はPython 3.6.4 (Mac OS 10.14.3)。


<!-- truncate -->


### 原因・対応

コマンド誤り。正しいインストールコマンドは下記の通り。

```
$ pip install pillow

```

### 参考サイト

- [Pillow — Pillow (PIL Fork) 5.4.1 documentation](https://pillow.readthedocs.io/en/stable/)
