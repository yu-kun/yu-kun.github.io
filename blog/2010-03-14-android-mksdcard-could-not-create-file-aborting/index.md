---
title: 'Android: mksdcardコマンドのabortingの解決法 - could not create file &#039;...&#039;, aborting...'
date: 2010-03-14
authors: [yukun]
tags:
  - android
slug: android-mksdcard-could-not-create-file-aborting
---

下記のコマンドを入力したら、abortされてしまった。

```
C:\>mksdcard 256M C:\work\sdcard\sdcard.img
could not create file 'C:\work\sdcard\sdcard.img', aborting...

```

原因はフォルダsdcardを作成してなかった為。SDカードイメージの作成先のフォルダは予め作っておく必要がある。 フォルダ作成後改めてコマンドを入力すると上手くいった。

```
C:\>mksdcard 256M C:\work\sdcard\sdcard.img
C:\>

```
