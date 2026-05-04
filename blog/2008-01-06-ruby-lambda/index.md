---
title: 'Ruby: lambdaメソッドを使いブロックをオブジェクト化'
date: 2008-01-06
authors: [yukun]
tags:
  - ruby
slug: ruby-lambda
---

に関して、練習します。 他の言語と比較してRubyのコードブロックの扱いは特徴的で扱い難そうに見えますが、使いこなせればコード量を減らせるし、その結果として可読性も増すので、慣れていきたいです。 

```ruby
def times_n(n)
  lambda  { |x| x * n}     # Kernel#lambdaの引数はブロック
# lambda do |x| x * n end  でもよい(複数行に渉るときなど)。
end
times_ten = times_n(10)    # nに10を代入
# 生成されたtimes_tenはProcインスタンス
p times_ten.class          #=> Proc
# times_ten = { |x| x * n} はエラー。
# {}でのブロックはメソッドの引数としてのみ渡せる。
# また、ブロック引数はメソッドの最後の引数として定義する。
# ブロックの実行にはcallメソッドを用いる
p times_ten.call(5)        # ブロック変数xに10が代入される
#=> 50
```


ここで、クラスProcとは


<!-- truncate -->


> Proc はブロックをコンテキスト(ローカル変数のスコープやスタックフレーム)とともにオブジェクト化した手続きオブジェクトです。 - Rubyリファレンスマニュアル : Proc

続けて、以下も練習してみる。


```ruby
arr1 = [1, 2, 3, 4, 5]
arr2 = arr1.collect(&amp;amp;times_ten)
p arr2 #=> [10, 20, 30, 40, 50]
p arr2.class #=> Array
```


ここで、Enumerable#collectは、

> collect : 各要素を順番にブロックに渡して評価し、その結果で要素を置き換えます。 Rubyリファレンスマニュアル : collect

ブロックが格納された変数をメソッドの引数として渡すときは「&」をその変数名の前につけます。 仮につけないと以下のようなエラーが出ます。

`` `collect': wrong number of arguments (1 for 0) (ArgumentError) ``

最後に、selectメソッドを用い、同時に評価に条件を組み込んでみます。


```ruby
def times_n(n)
  lambda { |x| x * n}   # lambdaの引数はブロック
end
times_ten = times_n(10) # nに10を代入
ceiling = 50
arr3 = [1, 25, 50, 55, 30, 100]
p arr3.select { |x| x < ceiling }
#=> [1, 25, 30]
arr4 = [0.1, 2.5, 5, 5.5, 3, 10]
p arr4.collect(&amp;amp;times_ten).select { |x| x < ceiling } #  -.-;
#=> [1.0, 25.0, 30]
```


arr3の要素が順にブロック変数xに読み込まれます。

> select : 各要素に対してブロックを評価した値が真であった要素を全て含む配列を返します。真になる要素がひとつもなかった場合は空の配列を返します。 - Rubyリファレンスマニュアル : select
