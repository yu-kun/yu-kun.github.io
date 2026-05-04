---
title: 'AS3でお絵かきFlashを作る (2)ボタン作成 - Flexコンポーネントの導入'
date: 2008-10-14
authors: [yukun]
tags:
  - actionscript
  - flash-actionscript
  - flex
  - graphics
  - paint
slug: actionscript-paint-flash-flex-button
---

undo、redoのボタンをFlexコンポーネントのButtonクラスを用いて作成してみました。 
<!-- truncate -->
  [以前](/blog/actionscript-xml-element-attribute "ActionScript: XMLの子要素の読み込み - XMLオブジェクトと「.. 」「[]」演算子 - Yukun's Blog")はボタンを作るのに直書きしていましたが、レイアウトの配置修正に手間取るのでFlexコンポーネントを使用することにしました。 少し話し変わりますが、ActionScriptのGraphicsクラスは標準で適切なタイミングでスクリーンのバッファをとっているのかな。 Javaでは通常画面バッファをとっていない為ウィンドウ描画の度にチラつきがあり、書き手がその辺の面倒を見なければいけませんでした。 しかし、ASではそういった設定が無くともチラつきが無いので、Graphicsクラス内部でやってくれているのかなぁと推測してみました（まだ調べていません）。 また話し変わりますが、フレームワークに囚われるとその枠組みから離れるた場合に思考停止になる危険があるかも。フレームワークの利点欠点が見極められるようにならないとなぁ(自戒)。
