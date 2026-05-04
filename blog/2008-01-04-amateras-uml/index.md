---
title: 'JavaのソースコードからUMLのクラス図を作成'
date: 2008-01-04
authors: [yukun]
tags:
  - eclipse
  - java
  - setting
  - uml
slug: amateras-uml
---

[![オセロプログラムの実行画面](./othello01-e1273384016708.png "othello01")](./othello01-e1273384016708.png) 統合開発環境のEclipseでJavaのオセロプログラム(講義の課題)を制作中に一度クラス図を作成しようと試みました。使用プラグインは[AmaterasUML](http://amateras.osdn.jp/cgi-bin/fswiki/wiki.cgi?page=AmaterasUML)でこちらのサイト([軽量なUMLプラグインAmaterasUML (1/4) - @IT](http://www.atmarkit.co.jp/fjava/rensai3/eclipseplgn14/eclipseplgn14_1.html))を参考にしながらインストールを進めました。 さて、数あるUMLデザイナの中でこのプラグインのアドバンテージの一つはJavaクラスの継承関係などを包含したクラス図をソースコードから生成できる点にあると私は考えます。 その作り方は、まず「ファイル」→「新規」→「その他」から「AmaterasUML」→「クラス図」と選択してクラス図ファイルを作成し、そのファイルをダブルクリックしクラス図エディタを起動します。その上にクラスファイルをドラックアンドドロップすれば、そのクラスのクラス図が作成されます。また継承関係などを表したい場合は、その関係のクラスを選択した上でドラッグ＆ドロップすればOK。下図にその使用状況を示します。 [![AmaterasUMLの使用画面](./eclipseOthUMLs-e1273384060843.png "eclipseOthUMLs")](./eclipseOthUMLs-e1273384060843.png) ちなみに、これによって作成された図は画像形式でエクスポートできます。 人にプログラムの構造の説明する際に役立つので重宝しています。
