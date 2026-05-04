---
title: 'Python Twitter のインストール'
date: 2011-03-05
authors: [yukun]
tags:
  - python
  - setting
  - twitter
slug: python-twitter-install
---

Twitter APIのPython ラッパーライブラリのインストール手順を以下に紹介。 実行環境は以下の通り。 OS ：Windows7 Pythonの実行パス ：C:\\Python27

### ダウンロードするもの

#### python-twitter ライブラリ

[http://code.google.com/p/python-twitter/](http://code.google.com/p/python-twitter/) 
<!-- truncate -->


#### 依存ライブラリ

1. [https://pypi.org/project/simplejson/](https://pypi.org/project/simplejson/)
2. [http://code.google.com/p/httplib2/](http://code.google.com/p/httplib2/)
3. [http://github.com/simplegeo/python-oauth2](https://github.com/simplegeo/python-oauth2)

### インストール手順

まず、依存ライブラリをインストールする。それぞれ解凍したフォルダ上で以下のコマンドを実行

```
C:\httplib2-0.6.0>python setup.py install
C:\simplejson-2.1.3>python setup.py install
C:\simplegeo-python-oauth2-1920657>python setup.py install

```

為念、import を実行しインストールの確認を取る。 

```python
 >>> import httplib2 >>> import simplejson >>> import oauth2 
```

 最後に、python-twitter ライブラリをインストールする。

```
C:\python-twitter-0.8.1>python setup.py build
C:\python-twitter-0.8.1>python setup.py install

```

### サンプルプログラム

指定のユーザの発言(@応答は除く)を表示するスクリプトを紹介。

#### ソースコード


```python
 import twitter api = twitter.Api() statuses = api.GetUserTimeline('yukun_') for s in statuses: if s.text[0] != '@': print s.text , "|" , s.created_at 
```


#### 実行結果

```
お知らせ: ブログ更新しました。「 VMware PlayerでCentOSを導入 」 - | Wed Feb 23 14:52:48 +0000 2011
I uploaded a YouTube video -- カードゲームアプリの作成 (1)画像のD&D  | Sun Feb 13 11:00:05 +0000 2011
お知らせ: ブログ更新しました。「 Shell Script: testコマンドによる条件判定 (数値、文字列) 」 - | Sun Feb 13 07:01:06 +0000 2011
お知らせ: ブログ更新しました。「 Java: TCP Socket Echo Server/Client サンプル 」 - | Fri Feb 11 22:31:19 +0000 2011
今日は品川でボルダリングしてきた。面白かったー(^o^) | Fri Feb 11 13:40:43 +0000 2011
お知らせ: ブログ更新しました。「 Subversion: コトハジメ 」 - | Mon Feb 07 12:01:04 +0000 2011
お知らせ: ブログ更新しました。「 Shell Script: for文 - ワードリストに変数、コマンドを使用 」 - | Sun Feb 06 11:00:49 +0000 2011
お知らせ: ブログ更新しました。「 Shell Script: for文 - ワードリストを順に出力 」 - | Sun Jan 30 13:47:35 +0000 2011
運転免許を更新中(=´∇｀=) | Sun Jan 30 04:33:30 +0000 2011
デフォルトテーマ(Twenty Ten)が地味に優秀。 CSS がひとつに纏まっているのでページ読み込みが多少早くなった。 | Mon Jan 17 14:03:52 +0000 2011
WordpressのVer3テーマへの移行テストが完了したが、ユーザービリティの影響が不明瞭で中々踏み切れない。アクセス数がもっと安定してきたらやろうかな～。 | Mon Jan 03 08:02:15 +0000 2011
New blog posting, PHP: 添字配列の初期化、出力、代入 - | Mon Jan 03 07:06:40 +0000 2011
情報セキュリティスペシャリスト試験に受かりましたー。 | Mon Dec 20 13:12:15 +0000 2010

```
