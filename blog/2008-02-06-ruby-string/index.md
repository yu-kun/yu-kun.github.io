---
title: 'Rubyで引数の設定値によって4パターンの部分文字列を取得するラッパー関数'
date: 2008-02-06
authors: [yukun]
tags:
  - html
  - ruby
  - string
slug: ruby-string
---

引数に設定値を与え、それによって挙動を変えることで、似た機能をまとめてみます。

追記(2008.2.8)：正規表現のマッチを保持する変数があったことを失念していました。「$\`」マッチした部分より前の文字列、「$&」マッチした文字列、「$'」マッチした部分より後ろの文字列を使えばより簡潔に書けると思いました。

### ソースコード


```ruby
EXCL = true
INCL = false
BEFORE = true
AFTER = false
#
# string 分割する文字列
# delineator 分割する場所
# desired    BEFORE: delineator 文字列より前の文字列
#            AFTER:  delineator 文字列より後の文字列
# type       INCL:   分割文字列に delineator を加える
#            EXCL:   分割文字列に delineator を加えない
def split_str(string, delineator, desired, type)
  low_str = string.downcase # 小文字に揃える(変換)
  marker = delineator.downcase
  return if (low_str.index(marker) == nil) # delineator に一致しない
  if (desired == BEFORE)
    if (type == EXCL)
      split_pos = low_str.index(marker)
    else
      split_pos = low_str.index(marker) + marker.length
    end
    parsed_str = low_str[0, split_pos]
  else
    if (type == EXCL)
      split_pos = low_str.index(marker)+marker.length
    else
      split_pos = low_str.index(marker)
    end
    parsed_str = low_str[split_pos, string.length]
  end
  return parsed_str
end
string = "I'm designing a Web crawler and a Search engine."
p split_str(string, "crawler", BEFORE, INCL);
p split_str(string, "crawler", BEFORE, EXCL);
p split_str(string, "crawler", AFTER, INCL);
p split_str(string, "crawler", AFTER, EXCL);
p split_str(string, "crauler", AFTER, EXCL);
```


### 実行結果

```
"i'm designing a web crawler"
"i'm designing a web "
"crawler and a search engine."
" and a search engine."
nil
```

### 単に部分文字列を取得するには

```
str = "A Web crawler"
p str[6, str.size] #=> "crawler"
```
