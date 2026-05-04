---
title: 'Webページから指定したタグの要素を抜き出すRuby関数'
date: 2008-02-10
authors: [yukun]
tags:
  - network
  - regexp
  - ruby
  - string
slug: extract-web-tag
---

単一のWebページから抜き出した複数の要素を配列に格納して返します。 以下の例はaタグの要素(エレメント)を抽出した場合です。

### Rubyコード


```ruby
 require 'net/http' require 'kconv' def parse_array(string, beg_tag, close_tag) array = Array.new string.scan(/#{beg_tag}(.*?)#{close_tag}/sm) { |matched| #puts matched array = array | matched } return array end Net::HTTP.version_1_2 Net::HTTP.start('b.hatena.ne.jp', 80) {|http| response = http.get('/hotentry/') str = Kconv.tosjis(response.body) a_tag_array = parse_array(str, "" ) puts a_tag_array } 
```


### 学んだこと

- Net::HTTP.startメソッドをブロックを用いて呼び出すことによって、ブロックの間だけセッションを開いて接続し、ブロック終了とともに自動的にセッションを閉じる。Rubyに慣れてもJavaやCでの手続きを意識しておくこと。
- 配列の結合には和集合(演算子は「|」)を用いた。この場合、重複する要素は1つとして数えられる。別々に数えたい場合は「+」演算子を用いる。
- String#scanメソッドはブロックで用いるとブロック変数にマッチした部分を格納する。その際、正規表現の中で「()」が用いられると、()内の部分を配列にして返す。今回は別に配列にする必要はなかったかも。

### 参考サイト

> Web サーバからドキュメントを得る - [Rubyist Magazine - 標準添付ライブラリ紹介 【第 7 回】 net/http](http://magazine.rubyist.net/?0013-BundledLibraries)[](http://magazine.rubyist.net/?0013-BundledLibraries)
