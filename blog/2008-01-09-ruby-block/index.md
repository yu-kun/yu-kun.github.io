---
title: 'Ruby: メソッドの引数にブロックを渡す'
date: 2008-01-09
authors: [yukun]
tags:
  - phrase
  - ruby
slug: ruby-block
---

ブロックの使い方を練習してみます。 

```ruby
 def repeat(n) n.times { yield } if block_given? end repeat(2) { puts "Hello." } # Hello. # Hello. 
```

 メソッドに渡したブロックはyieldを用いて呼び出します。 似たような例としてもう一つ。 

```ruby
 # nからmまでの自然数の合計を求める def sumup(n, m, sum=0) (n..m).each { |x| # yield でブロックを呼び出す yield if block_given? # 引数にブロックが与えられている puts x sum += x } puts "Sum : #{sum}" end sumup(2, 4) { printf "Add : " } #Add : 2 #Add : 3 #Add : 4 #Sum : 9 
```

 渡されたブロックはProcオブジェクトに変換されるのでcallを用いて呼び出すことも出来ます。下の例で確認してみます。 

```ruby
 # nからmまでの自然数の合計を求める def sumup(n, m, &block) sum = 0 (n..m).each { |x| block.call if block # ブロックを呼び出し puts x sum += x } puts "Sum : #{sum}" end sumup(0, 4) { printf "Add : " } #Add : 0 #Add : 1 #Add : 2 #Add : 3 #Add : 4 #Sum : 10 
```

 最後に、渡されたブロックをまた引数として渡す場合の例を示します。 その際、ブロック変数名の前に「&」をつけます。 

```ruby
 # 配列内の最小値を求める def minimum(arr, &block) block ? arr.select(&block).min : arr.min end arr = [20,48,15,67] p minimum(arr) {|i| i > 30} #=> 48 
```


