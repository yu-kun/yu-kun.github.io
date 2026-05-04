---
title: 'Linuxコマンドで複数ファイルの文字コードを一括変換'
date: 2008-01-12
authors: [yukun]
tags:
  - character
  - command
  - linux
slug: euc-to-utf8
---

Linux系OSのfedora6のデフォルト文字コードはUTF8なので、先日久々に参照したEUCのC++ソースコード中のコメントや出力が文字化けしていました。

そこで、ファイルの文字コードをEUCからUTF8に変換するコマンドを調べたところ、[PHPプロ！TIPS+](http://www.phppro.jp/phptips/archives/vol30/)のページの中程にそれに関するコマンドがあったので参考にしました。

```
$find -name '*.cc' | xargs nkf --overwrite -w
```

↑は拡張子がccの全てのテキストファイルの文字コードをutf8に変換します。

```
$find . -type f -print0 | xargs -0 nkf --overwrite -w -Lu
```

↑このコマンドの意味を簡単に示しますと、まずファイルを検索するfindコマンドで、カレントディレクトリ「.」から通常ファイル「-type f」を探索し出力します「-print0」(常に真)。

> % find \[検索開始ディレクトリ\] (option) 参考:[UNIXコマンド \[find\]](http://www.k-tanaka.net/unix/find.php)

ここで、findコマンドの結果をパイプ「|」をもって渡し、そこでxargsでコマンドを実行します。ここでxargsは以下の機能を持ちます。

> xargs\[えっくす・あーぐす\] 標準入力から引数を読み込み、指定のコマンドを実行するコマンド 参考:[UNIXの部屋 検索:xargs (\*BSD/Linux/Solaris)](http://x68000.q-e-d.net/~68user/unix/pickup?xargs)

文字コード変換コマンドである nkf のオプション--overwriteは変換した文字コードのデータを元のファイルに上書きするもので、-wが文字コードをUTF8に指定するものです。ちなみに、EUCに変換したい場合は-e、Windowsで使われているSJISにする場合は-sを代わりに指定します。

最後の-Luオプションは改行コードをLFに指定するものです。
