---
title: 'AS3でMind MapぽいFlashを作る (2)各ノードのドラック＆ドロップ'
date: 2008-09-21
authors: [yukun]
tags:
  - actionscript
  - flash-actionscript
  - mind-map
slug: actionscript-mind-map-flash-node-drug-drop
---

今回は、各ノードのD&Dの実装です↓。中央の"Yukun's Blog"ノードのみドロップで位置固定します。他ノードはドロップ後、安定化に入ります。 
<!-- truncate -->
  [前回](/blog/actionscript-mind-map-flash-node-balance "AS3でMind MapぽいFlashを作る (1)ノード間隔の安定化 - Yukun's Blog")と同じくRキーで全ノードがランダムに散ります。 さて、次に追加する機能はノード間の関係を視覚化してみようと思います。現在使用しているデータはこのブログのカテゴリの一部ですので、関連性と言えるものは少ないかもしれませんが･･･。 具体的には、各ノード間をつないでいる線分上に文字列なり数値なりを表示してみます。
