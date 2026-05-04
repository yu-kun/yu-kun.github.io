---
title: 'タグの中の要素を抜き出すRuby関数'
date: 2008-02-09
authors: [yukun]
tags:
  - regexp
  - ruby
slug: ruby-extract-tag
---

ライブラリを使えば簡単ですが、正規表現の学習の為に。

### ソースコード


```ruby
def return_between(unporsed, start, termi)
  unporsed =~ /#{start}(.*?)#{termi}/
  return $1
end
str = "<title>Trump Code</title>"
start = "<title>"
termi = "</title>"
puts return_between(str, start, termi)
#=> Trump Code
```


ここで学んだことは、正規表現の規則中に変数を用いる際は#{var\_str}と表記すること。
