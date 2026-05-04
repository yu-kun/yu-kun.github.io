---
title: 'Java: 文字列の先頭・末尾の文字を削除するstrip()メソッド'
date: 2008-05-29
authors: [yukun]
tags:
  - java
  - string
  - strip
slug: java-strip
---

テキストマイニングを行う際、文書を単語集合に区切ったのはいいけれど、単語の先頭・末尾に以下のような文字が入っている場合は辞書に格納する際に削除したいですね。

```
Hello!
page."
"Hi,
```

単語の前後に複数の記号((ピリオドやクォーテーション、カンマやコロンなど))が入り混じった文字列から、それらを刈り取る方法を採り上げます。0からゴリゴリ文字の条件判定文を書いたり、正規表現でマッチしたときに刈り取りしたりするのも良いですが、オープンソースで今回のケースにマッチしたクラスメソッドがありますので、その使い方と仕組みを簡単に紹介します。

### StringUtils#strip(String str, String stripChars)

ソース・バイナリ共に[Apache Commons](http://commons.apache.org/)の[Lang Downloads](http://commons.apache.org/proper/commons-lang/download_lang.cgi)のページからダウンロードできます。

StringUtils#strip(String str, String stripChars)メソッド引数は、  
+第一引数：刈り取り対象文字列（テキスト）  
+第二引数：刈り取る文字  
例えば、

```
str = "Hi,]";
stripChars = "],";
result = strip(str, stripChars);
```

の時のresultの中の文字列はHiとなります。

stripメソッドは内部でstripStartとstripEndメソッドを実行しています。前者は文字列の先頭部分の刈り取りを、後者は末尾部分の刈り取りを行っています。  
以下に、stripEndのソースを引用します。


```java
 public static String stripEnd(String str, String stripChars) { int end; if (str == null || (end = str.length()) == 0) { return str; } if (stripChars == null) { while ((end != 0) && Character.isWhitespace(str.charAt(end - 1))) { end--; } } else if (stripChars.length() == 0) { return str; } else { while ((end != 0) && (stripChars.indexOf(str.charAt(end - 1)) != -1)) { end--; } } return str.substring(0, end); } 
```


ここで重要な処理部分はソース最後の、


```java
 while ((end != 0) && (stripChars.indexOf(str.charAt(end - 1)) != -1)) { end--; } } return str.substring(0, end); 
```


の部分です。  
刈り取り対象文字列の末尾から順に文字を調べていきますが、その文字を指すパラメータにendを、その初期値はテキストの文字列長でループごとにデクリメントされていきます。そのendが指す文字がstripCharsに含まれているか否かを判定しているところが、

`stripChars.indexOf(str.charAt(end - 1)) != -1`

ですね。最終的にsubstringメソッドで部分文字列を取得することで刈り取っています。  
これ書いた人上手いなー。indexOfやcharAtの使い道の幅が広がった感じがします。
