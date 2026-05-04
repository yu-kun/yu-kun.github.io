---
title: '検索エンジンを実装 (1)転置インデックス作成'
date: 2008-03-07
authors: [yukun]
tags:
  - algorithm
  - java
  - n-gram
  - search-engine
slug: java-ngram
---

今回はN-gramでテキストを分解します。N-gram法とは対象の文字列を一定のN文字単位で分解し、それの出現頻度を求める方法です。これによって、検索エンジンに使われる転置インデックスを作成したいと思います。転置インデックスの作成方法にはN-gramの他に形態素解析があります。両者の性能の長短は[全文検索 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%85%A8%E6%96%87%E6%A4%9C%E7%B4%A2#N-Gram)に詳しく載っています。

### Javaソースコード(Make2gram.java)

さて、まずは文字列を2単語に切り分けるプログラムを作成しました。データ構造は単純にArrayListで、出現頻度も求めていません。


```java
 import java.io.*; import java.util.*; /** * N-gram法 */ public class Make2gram { public static void main(String[] args) { final short nsepa = 1; // 2gram String line; ArrayList filelist = new ArrayList(); ArrayList bigram = new ArrayList(); if (args.length < 1) { // コマンドライン引数の数 System.out.println("How to use: java Make2gram [filename]"); System.exit(1); } try { BufferedReader br = new BufferedReader(new FileReader(args[0])); while ((line = br.readLine()) != null) { //System.out.println(line); filelist.add(new StringBuffer(line)); // 入力ファイルは一行=一要素として格納 } br.close(); } catch (Exception e) { System.err.println("[main] : " + e.toString()); } for (Iterator it = filelist.iterator(); it.hasNext(); ) { StringBuffer str = (StringBuffer) it.next(); int lm = str.length() - nsepa; for (int i = 0; i < lm; i++) { StringBuffer bi = new StringBuffer(4); // 4Byte(2文字)分の容量(Javaの内部文字コードはUnicode) bi.append(str.charAt(i)); // append():文字列の末尾に追加 bi.append(str.charAt(i+1)); bigram.add(bi); //System.out.print(str.charAt(i)); //System.out.println(str.charAt(i+1)); } } // 2-gramを表示 for (Iterator it = bigram.iterator(); it.hasNext(); ) { System.out.println(it.next()); } } } 
```


### 入力ファイル(text.txt)

```
検索された文書は「更新順」「ファイル名順」「文書のタイトル順」などにソートされる。
一般的な検索エンジンでは独自のランク付けルールも適用し「重要度」などと呼んでいるものもある。

```

### 実行結果

```
検索
索さ
され
れた
た文
文書
書は
は「
「更
更新
新順
順」
」「
…＜省略＞…
```
