---
title: 'WordPress: Similar Posts の紹介と設定例 - 関連記事[投稿&#124;エントリ]を表示するプラグイン'
date: 2008-10-12
authors: [yukun]
tags:
  - n-gram
  - plugin
  - setting
  - wordpress
slug: wordpress-plugin-similar-posts
---

[![WordPress Plugin: Similar Posts](./sim_post_s02.jpg "WordPress Plugin: Similar Posts")](./sim_post_s02.jpg) 投稿した記事に関連する記事を自動で選択し、サイドバーを含む任意の位置に表示できる WordPress のプラグインであるSimilar Posts(Author: Rob Marsh, SJ) の設定の一例を紹介します。 
<!-- truncate -->


## ダウンロードとインストール

まず、下の二つのページからPost-Plugin LibraryとSimilar Postsをそれぞれダウンロードします。

- All Things Seen and Unseen » Post-Plugin Library
- All Things Seen and Unseen » Similar Posts

ダウンロードしたzipファイルから解凍されたフォルダをサーバのpluginフォルダにアップロードします。ブラウザからプラグイン管理ページを開き、Post-Plugin Library→Similar Postsの順にアクティベートします。

## 特徴

ソースを全て読んだわけではありませんが、このプラグインの特徴は、全記事からキーワードを抽出し関連度を算出し、DBの新たなテーブルに格納し直しているところだと考えます。その為、表示時間も早いですし、記事間の関連性を誘導する為に投稿者が記事に恣意的なカテゴリ・タグ付けをする必要がなくなる利点があります。ただし、設定によってはその機能を活かせなくなってしまう可能性があるので、以下に私の設定例を紹介します。

## Similar Posts の設定の一例

### General タブ

最初のおススメの設定項目は、

- Match the current post's category?
- Match the current post's tags?

の値を**No**とすることです。YesやEvery tagにすると同一カテゴリ・タグのみから関連記事の推薦を行う設定となります。その為、タグやカテゴリを越えた横断的な推薦が出来なくなり、少しもったいないです。

### Placement タブ

#### Output after post:

**この項目をActivateにすると各記事の最後に関連記事を表示**してくれます。 しかし、投稿本文と関連記事リストの間に広告を入れたい場合や表示位置を変えたい時があると思います。そういった場合はActivateせずにテンプレートの任意の場所に、 

```php

```

 を挿入することでも、関連記事リストを表示することが出来ます。

#### Output in RSS feeds:

RSSフィードにも関連記事を表示する場合は、この項目のActivateをYESにしましょう。また、ここでParametersを初期設定で用いる場合はprefixの先頭にbrタグを追加しておきましょう。もしくは、strongタグを見出しタグ(h3やh4)に変えましょう。 というのも、もし記事の投稿の際に最後に改行を入れていない場合、strongタグの文字が本文の最終行に続けて連結されてRSSフィードに配信されます。なので、改行タグ（br）を挿入するか、見出しタグにしておいた方がちょっと見栄えが良いかと思います。もちろん、記事を投稿する際に毎度最後に空行を入れてもいいのですが、それは手間かな、と思います。

### Other タブ

#### Relative importance of:

キーワードの重み付けの設定です。記事の本文、タイトル、タグそれぞれのキーワードの重要度を設定します。このブログの場合は、 content: 55%, title: 20%, tags: 25% でかなりいい感じの推薦結果を得ることが出来ました。もちろん、この値は設置するブログのタイトルやタグ付けの方針によって変わってくると思いますので是非、試行錯誤してみてください。

### Manage the Index タブ

日本語などマルチバイト文字を含むブログであれば、

- Handle extended characters?
- Treat as Chinese, Korean, or Japanese?

は**YES**にしましょう。 以上。こんな感じでしょうか。 今回はWordPressに関する初の記事となりましたが、↓の関連記事リストを見ると何だか頑張って関連していそうな記事を推薦してくれているように見えなくもないです（勿論、今後WordPress関連の記事を投稿すれば、この記事のリストも更新されます。 存外この推薦から新たな気づきが生まれることもあるので、とっても便利なプラグインです（「へー、その記事が関係するのか。共通点と相違点は何なんだろう？うーん、あ、確かに！」ってかんじで）。 余談ですが、DBのレコードを見たところ、どうやら本文からのキーワードの切り出しにはN-gram法が使われているようです。その為、文字コードがUTF-8であれば別途に形態素解析をしなくても、あらゆるマルチバイト言語の文章から機械的にキーワードマッチングできる単語(というよりN文字)集合を生成できるようです。勿論、単語の切り出し精度・速度は「N-gram」、「形態素解析」のどちらの方法にも一長一短ありますけれど。 作者のRob Marsh, SJさんスゴイなぁ。
