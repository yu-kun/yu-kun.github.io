---
title: 'Apple Thunderbolt Displayに画面が表示されない場合の解決例'
date: 2019-01-30
authors: [yukun]
tags:
  - mac
slug: apple-thunderbolt-display-error
---

### 事象

先日、MacBook Pro (Retina, 15-inch, Late 2013)とThunderbolt Displayを接続したところ、Display側に画面が出力されない事象が発生。

但し、Display側のLANコネクタ、USBは使用可能。妻のMacBook ProとDisplayを接続したところ、正常にThunderbolt Display側に画面が出力されたことから、原因は当方のMacBook Proの可能性が高く、Appleへ問い合わせした。


<!-- truncate -->


### 解決例

Apple側からはSMCリセットについてアドバイス頂き、下記リンク先の手順を実施したところ事象は解消。 [Mac の SMC (システム管理コントローラ) をリセットする方法 - Apple サポート](https://support.apple.com/ja-jp/HT201295)

MacBookもThunderbolt Displayもかれこれ5年近く使用しているが、まだまだ頑張ってもらいたい。(せめてPython3.0が標準のOS＋WiFi6普及までは)
