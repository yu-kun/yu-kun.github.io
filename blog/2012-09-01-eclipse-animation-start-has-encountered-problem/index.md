---
title: 'Eclipse: &#039;Animation start&#039; has encountered a problemの対処例'
date: 2012-09-01
authors: [yukun]
tags:
  - eclipse
  - mac
  - php
  - setting
slug: eclipse-animation-start-has-encountered-problem
---

[![eclipse_animation_start (Mac OS)](./eclipse_animation_start1.png "eclipse_animation_start (Mac OS)")](./eclipse_animation_start1.png) 表題のエラーはMac OS+Eclipse(PDT)+PHP環境で発生。結論から言うと、対処法としては参考サイトに記載のフォーラム内容を参考に以下の手順で解消。

### 対処法

下記の設定ファイル中の、

```
/Applications/eclipse-php/eclipse-php.app/Contents/MacOS/eclipse-php.ini

```

以下の行を削除。

```
-Xdock:icon=../Resources/
mac.icns

```

もしくは適当なアイコンファイルパスを指定する。

### 参考サイト

1. [Eclipse Community Forums: PDT » 'Animation Start' has encountered a problem (on launch)](http://www.eclipse.org/forums/index.php/t/263016/)
2. [Eclipse for php on Mac OSX 10.5: "Animation Start" error - Stack Overflow](http://stackoverflow.com/questions/9048227/eclipse-for-php-on-mac-osx-10-5-animation-start-error)
