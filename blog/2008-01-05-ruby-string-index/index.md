---
title: 'Rubyで文字列から日本語文字をインデックス指定する'
date: 2008-01-05
authors: [yukun]
tags:
  - array
  - character
  - ruby
  - string
slug: ruby-string-index
---

RubyのStringインスタンスに格納されている文字列のインデックスを得るにはchrメソッドを用います。

#### ソースコード


```ruby
 # chrは文字コードObjを文字列Objに変換するメソッド str1 = "abcdef" p str1[2] #=> 99 p str1[2].chr #=> "c" 
```


<!-- truncate -->


### インデックスはバイト換算

なので、2バイト長の日本語文字などは取り出せません。


```ruby
 str2 = "あいうえお" p str2[2] #=> 130 puts str2[2] #=> 130 p str2[2].chr #=> "\202" puts str2[2].chr + str2[3].chr #=> "い" 
```


そこで、

### 日本語文字列のインデックス指定はsplitメソッドで一旦配列に分割


```ruby
 str2 = "あいうえお" jarr3 = str2.split(//s) # 文字コードがSJISの場合 puts jarr3[3] #=> え 
```


多バイト長の文字列処理を扱ったソースを読み込んで慣れていこうかな。
