---
title: 'POSTメソッドを用いてExcite翻訳を行うRubyコード'
date: 2008-02-08
authors: [yukun]
tags:
  - network
  - regexp
  - ruby
slug: ruby-excite-translation
---

しかし、未完です。

Webの巡回などにはWWW::Mechanizeという便利なライブラリがありますが、あえてnet/httpのPOSTメソッドを使う理由は、単にPOSTそのものと正規表現の学習をするためです。

今回は正規表現で試行錯誤。

### Rubyソースコード


```ruby
 #!/usr/bin/ruby require 'net/http' require 'kconv' before = "hello" http = Net::HTTP.new('www.excite.co.jp') response = http.post('/world/english', "before=#{before}&wb_lp=ENJA") result = Kconv.tosjis(response.body) result =~ /"after"[^>]*>(.*)/ism puts $1 
```


### 実行結果

```
こんにちは
＜中略＞
```

ここで、正規表現

`/"after"[^>]*>(.*)/ism`

の部分を

`/"after"[^>]*>(.*)< \/textarea>/ism`

に変更するとマッチしなくなってしまいました。  
オプション指定のmで複数行にマッチするはずなんですが・・・うーん、何を見落としているのだろう。
