---
title: 'ActionScript: XMLの子要素の読み込み - XMLオブジェクトと「.. 」「[]」演算子'
date: 2008-10-07
authors: [yukun]
tags:
  - actionscript
  - flash-actionscript
  - xml
slug: actionscript-xml-element-attribute
---

XMLのパースの練習に、AmazonのWebサービスAPIを用いて本を検索し、表紙の縮小画像をStage上にランダムに配置するFlashをAS3で書いてみました。 _追記：現時点はAPI仕様が変わった為、下記のプログラムは機能しません。。_ 
<!-- truncate -->
 

## XMLの扱い方の一例

以下は上のFlashの解説ではありませんが、作成過程でXMLの扱いで詰ったところがあったのでピックアップしてみます。

### 使用するXMLデータ

通常は外部ファイルを読み込みますが下の例ではXMLデータをソースコード中に書き込んでいます。 まず、扱うXMLデータは、 

```actionscript
<title><![CDATA[新版 明解C言語 入門編]]]]><![CDATA[></title>
<title><![CDATA[プログラミング言語C ANSI規格準拠]]]]><![CDATA[></title>
<title><![CDATA[やさしいC++―まずは「C言語」からはじめよう!! (I・O BOOKS)]]]]><![CDATA[></title>
```

 とします。本のデータはAmazonで検索語を「C言語」にして検索した結果を用いています。 ちなみに、 

```html

```

 タグで囲まれた要素内では全ての文字列を扱うことが出来ます。

### 外部XMLデータからXMLオブジェクトを作成

大抵は外部ファイルから読み込みます。その場合は、URLLoaderクラスのdataフィールドをXMLのコンストラクタの引数に渡せばOKです。 

```actionscript
 var urlLoader:URLLoader = new URLLoader(); urlLoader.load("http://www.example.com/text.xml"); // 中略：ロードが完了(のイベントをキャッチ)したら↓ var booksXml:XML = new XML(urlLoader.data); 
```

 ここではbooksXml変数がXMLオブジェクトです。

### ソースに直接XMLデータを書き込む場合

あまりそういった場合は無いのですが、テストなどの際は 

```actionscript
 var booksXml:XML = <![CDATA[新版 明解C言語 入門編]]> ＜中略＞ ; 
```

 のように書きます。他にもXMLコンストラクタに文字列リテラルとして渡すことも可能です。その場合、渡す文字列は一行にします。

### XMLの各要素と属性へのアクセス

今回扱うXMLの入れ子の深さ2ですかね。booksタグの中にbook要素があり、そのbookタグの中にtitle、author、image要素があり、それぞれのタグの中にほしいデータがある、と。 XMLオブジェクトにデータを代入しインスタンスを作成した際に、パースは終わっていますので子要素へのアクセスは「.」、子孫へは「..」や「\[\]」演算子を用います。また、子(子孫)属性に対しては「.@」「..@」です。 

```actionscript
 trace(booksXml.book); // 実行結果A (booksXml['book']と同値) trace(booksXml.book.title); // 実行結果B (xml['book']["title"]やbooksXml..titleと同値) 
```


#### 実行結果A


```actionscript
 <![CDATA[新版 明解C言語 入門編]]> ./51N3ym-NBRL._SL75_.jpg <![CDATA[プログラミング言語C ANSI規格準拠]]> ./41W69WGATNL._SL75_.jpg <![CDATA[やさしいC++―まずは「C言語」からはじめよう!! (I・O BOOKS)]]> ./51PKHX9QEVL._SL75_.jpg 
```


#### 実行結果B


```actionscript
 <![CDATA[新版 明解C言語 入門編]]> <![CDATA[プログラミング言語C ANSI規格準拠]]> <![CDATA[やさしいC++―まずは「C言語」からはじめよう!! (I・O BOOKS)]]> 
```

 一致する全ての要素をXMLList形式で返しています。実際のプログラムではfor文で回してデータを取得します。 上で使った演算子に代わるメソッド等もありますが、それらはまたの機会に取り上げてみます。
