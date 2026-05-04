---
title: 'Python: lxmlのインストール方法'
date: 2008-06-13
authors: [yukun]
tags:
  - module
  - python
  - setting
  - xml
slug: install-lxml
---

lxml とはXMLやHTMLを扱うPythonのライブラリの一つです。

> lxml is the most feature-rich and easy-to-use library for working with XML and HTML in the Python language. - lxmlの冒頭の文より

### linux系OS(Fedoraなど)の場合


```bash
 # yum python-lxml 
```

 も一つの手ですがバージョンが古いので、通常はeasy\_install経由でlxmlをインストールします。 前段階として、easy\_installをインストールするためにhttp://peak.telecommunity.com/dist/ez\_setup.pyをダウンロードしてスーパーユーザで実行します。 

```bash
 # python ez_setup.py error: invalid Python installation: unable to open /usr/lib/python2.5/config/Makefile (No such file or directory) 
```

 上のようなエラーがでた場合はpython-develをインストールします。また、合わせてlxmlに必要なパッケージもインストールするには以下のようなコマンドを実行します。 

```bash
 # yum install python-devel libxml2* libxslt* 
```

 改めて、 

```bash
 # python ez_setup.py 
```

 完了後、easy\_installコマンドが実行できるようになります。 lxmlのインストールは以下のコマンドを実行すればOKです。 

```bash
 # easy_install lxml 
```

 ライブラリの確認方法は、 

```python
 $ python >>> import lxml >>> 
```

 でエラーが出なければOKです。

### アンインストール方法

以下のコマンドを実行。 

```python
 # easy_install -mxN lxml 
```


### Windowsの場合

Webアプリのデプロイ環境はLinux系だけれど、開発やテストの一部はWindows機で行いたいのでWindowsにeasy\_installでインストールしようとしましたが、途中でエラーが出て中々上手くいきませんでした。 解決に時間が掛かりそうだったので、とりあえず[Python Package Index : lxml 1.3.4](https://pypi.org/project/lxml/1.3.4/)のlxml-1.3.4.win32-py2.5.exeをダウンロード＆インストールして済ませました。

### 参考にした記事

- [lxmlがインストールできない - kuma8の日記](http://kuma8.hatenablog.jp/entry/20070712/1184247598)
