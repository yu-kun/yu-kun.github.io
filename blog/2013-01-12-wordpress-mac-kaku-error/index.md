---
title: 'WordPress: MacブログエディタKaKuの起動エラーへの対処例 - 初期化対応'
date: 2013-01-12
authors: [yukun]
tags:
  - mac
  - wordpress
slug: wordpress-mac-kaku-error
---

ブログエディタとしてMacの[Kaku](http://ppmweb.lolipop.jp/apps/kaku/)を活用しているのだが、先日変なタイミングでOSがクラッシュしたのが原因かは不明だが、KaKuの起動時にエラーが発生して起動不可能になってしまったのでその時の対処法。と言っても、単に設定ファイルを全て削除することで対応した。尚、エラーコード・メッセージは控えておくのを忘れてしまった。。

### 設定ファイルの削除方法

```
$ rm -r ~/Library/Application\ Support/Kaku
$ rm ~/Library/Preferences/jp.lolipop.ppmweb.Kaku.plist

```

削除後に再度アイコンをクリックすれば正常に起動する。
