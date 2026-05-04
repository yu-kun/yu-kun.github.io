---
title: 'JavaとRubyで文字列の終端の扱いの違い'
date: 2008-03-04
authors: [yukun]
tags:
  - exception
  - java
  - ruby
  - string
slug: diff-java-ruby-string
---

RubyのコードをJavaに書き直す際に注意する相違点が幾つかあったので、そのうちの一つを挙げてみます。特に文字列関係は色々やりにくいです。

```
a = "4321"
p a[4] #=> nil
```

Rubyでは文字を\[\]で指すとき終端文字の次の添え字を指すとnilを返します。これをCで言う文字列の終端文字'\\0'のように考え、if文などの判定に用いることが出来ます。

対して、Javaで同じような書式で書こうものなら、


```java
public class Test {
  public static void main(String[] args) {
    String str = "abcdef";
    char[] arr = str.toCharArray(); // String型をchar型の配列に変換
    System.out.println(arr);
    System.out.println(str.length()+ " == " + arr.length);
    try {
      System.out.println(arr[6]);
    } catch (java.lang.ArrayIndexOutOfBoundsException e) {
      System.out.println("キャッチ：" + e);
-    }
    try {
      System.out.println(str.charAt(6));
    } catch (java.lang.StringIndexOutOfBoundsException e) {
      System.out.println("キャッチ：" + e);
    }
    // 最後の文字を知るためには
    System.out.println(str.charAt(str.length() - 1));
  }
}
```


のように例外でキャッチしなければなりません。

### 実行結果

```
6 == 6
abcdef
キャッチ：java.lang.ArrayIndexOutOfBoundsException: 6
キャッチ：java.lang.StringIndexOutOfBoundsException: String index out of range: 6
f
```

まぁ、str.length()を用いて文字列長でcharAtで指す文字が文字列の末尾かどうかを判定することで制御すればよいまでの話かもしれません。

今回はとあるアルゴリズムを移植上、気づきが色々あったのでこうした機会に言語仕様に対する理解を深めていきたいです。
