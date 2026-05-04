---
title: 'チャットログから本文を抽出'
date: 2007-04-10
authors: [yukun]
tags:
  - chatterbot
  - regexp
  - ruby
  - xml
slug: chatlog
---

先日、メッセンジャーのチャットで会話するボットを作りました。 そのボットに「学習」させるネタに、会話文であるWindows Live Messengerのチャットログを用いることにしました。しかし、ログはXML形式なので、本文以外の余計なタグがはいっています。  
まあ、エディタで不用な部分を置換していっても良いのですが...

#### 抽出処理をRubyで自動化

> 仮に1時間かかる単調作業をするとしたら、私は50分かけても、その作業をこなすスクリプトを書く。

と言う言葉を思いだしたので、早速、Windows Live Messenger(前MSN)のチャットログから本文のみを抽出するコードを書いてみました。


```ruby
#! ruby -Ks
require ‘kconv’
MSNRegexp =/(.*?)&lt;.Text&gt;/xm
data = ""
filename = ARGV[0]
begin
  open(filename) do |f|
    f.each do |line| # ファイルから1行ずつ読む
    line = Kconv.kconv(line, Kconv::SJIS) # 文字コードを変換
    line.chomp!
    next if line.empty?
    data.concat(line)
  end
end
rescue => e
  puts(e.message)
end
open(’msnLog.txt’, ‘w’) do |f| # 出力ファイル
data.scan(MSNRegexp){|tdata|
  if tdata
    f.puts(tdata)
  end
}
end
```


上記のコードをプロンプトで抽出したいファイル名を引数に与えて 実行すると、msnLog.txtというファイルに本文が抽出されます。発言者なども抽出したい場合は、正規表現の部分を修正すれば良いですね。

では、今し方学習したボットとの会話はこんなです。 「[とあるボットのチャットログ](/blog/chatbot-log "人工無脳とのチャットログ")」 やってる本人は、結構楽しんでましたね＾＾；と言うか合せてました。

#### 今後の改良点

当面の課題は、辞書のメンテツールの作成及びデータベース化、人格形成、文脈・話者理解と情報収集・加工機能を利用環境に合せたエージェント化とか(ぅぉぃ)。
