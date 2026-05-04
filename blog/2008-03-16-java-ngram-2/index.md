---
title: '検索エンジンを実装 (2)出現位置とその文書ID'
date: 2008-03-16
authors: [yukun]
tags:
  - java
  - n-gram
  - search-engine
slug: java-ngram-2
---

id:d-kamiさんから改良版Make2Gram付きトラックバックを頂きました([連絡方法がわからんのでトラックバックで - マイペースなプログラミング日記](http://d-kami.hatenablog.com/entry/20080314/1205500472))(はてなダイヤリーから移転前)。d-kamiさん、ありがとうございます。

上記のページにあるコードから、TreeMapやsubstringを用いたbigramの切り出し・カウント方法などを学ばせて頂きました。

さて、今回の実装その2は以下の機能を加えました。

1. コマンドライン引数にディレクトリ名を指定して、そのディレクトリ以下のファイル全てを処理の対象とする。
2. N-gram情報には文書IDと部分文字列の出現位置を格納するようにデータ構造の拡張。


<!-- truncate -->


そして今回、指定ディレクトリ以下のファイルを再帰的に読み込んでいく処理は[Java 再帰的にファイルを検索 ／ Chat&Messenger](http://sattontanabe.blog86.fc2.com/blog-entry-55.html "Java 再帰的にファイルを検索 ／ Chat&Messenger")を参考にさせて頂きました。

### Make2Gram.java


```java
 import java.io.File; import java.io.FileReader; import java.io.BufferedReader; import java.io.IOException; import java.util.ArrayList; import java.util.TreeMap; public class Make2Gram{ public static void main(String[] args) throws IOException{ if(args.length == 0){ System.out.println("引数にディレクトリ名を指定してください"); System.exit(1); } int N = 2; // bigram // http://sattontanabe.blog86.fc2.com/blog-entry-55.html // Java 再帰的にファイルを検索 ／ Chat&Messenger // のクラスFileSearchを使用しています FileSearch search = new FileSearch(); File[] files = search.listFiles(args[0], null); // 全てのファイルを取得 // ファイルIDとパスの対応表 TreeMap fileMap = new TreeMap(); ArrayList docs = new ArrayList(); for(int i=0; i < files.length; i++){ fileMap.put(i, files[i].getAbsoluteFile()); BufferedReader br = new BufferedReader(new FileReader(files[i])); StringBuilder sb = new StringBuilder(); String line; while((line = br.readLine()) != null) sb.append(line); br.close(); // ファイル内容(RAW)を格納 String text = sb.toString(); // ファイルの内容 改行抜き docs.add(text); } //テキストの部分文字列とそのIndexRecordクラスを関連付けるMap //TreeMapなのでMapのキーにした部分文字列でソートされる TreeMap gramMap = new TreeMap(); for(int i = 0; i < fileMap.size(); i++){ // ファイルごとの処理 String text = docs.get(i); for(int j = 0; j < text.length() - N; j++){ //テキストからN文字取り出す String gram = text.substring(j, j + N); if(gramMap.containsKey(gram)){ //gramMapに登録されてる文字列ならカウントを増やす IndexRecord ir = gramMap.get(gram); ir.count++; ir.file_id.add(i); ir.word_pos.add(j); gramMap.put(gram, ir); }else{ //gramMapに登録されていない文字列なら登録 gramMap.put(gram, new IndexRecord(i, j)); } } } for(String part : gramMap.keySet()){ System.out.printf("%s : %sn", part, gramMap.get(part)); } } } 
```


ファイル読み込み部分とbigram切り出し部分のループを二つに分けたのは今後の拡張の為です。

### IndexRecord.java(N-gram情報を格納するクラス)


```java
 import java.util.ArrayList; public class IndexRecord { // 出現回数 Integer count; // 出現したファイルID ArrayList file_id; // ファイル内の出現位置(文書の先頭からのオフセット) ArrayList word_pos; public IndexRecord(int id, int pos) { count = 1; file_id = new ArrayList(); file_id.add(id); word_pos = new ArrayList(); word_pos.add(pos); } public String toString() { StringBuffer sb = new StringBuffer(); sb.append(count); for(int i = 0; i < file_id.size(); i++){ sb.append(" (" + file_id.get(i) + ", " + word_pos.get(i) + ")"); } return sb.toString(); } } 
```


### 実行結果の一部

```
･･･＜中略＞･･･
定の : 2 (0, 40) (1, 59)
対象 : 1 (0, 28)
度」 : 1 (2, 71)
度を : 1 (0, 58)
数の : 1 (1, 46)
文字 : 3 (0, 2) (0, 43) (1, 61)
文書 : 3 (1, 48) (2, 5) (2, 22)
文検 : 1 (1, 1)
新順 : 1 (2, 10)
方法 : 1 (0, 63)
更新 : 1 (2, 9)
書の : 1 (2, 23)
書は : 1 (2, 6)
書（ : 1 (1, 49)
検索 : 5 (0, 26) (1, 2) (1, 65) (2, 0) (2, 45)
求め : 1 (0, 60)
法」 : 2 (0, 10) (0, 17)
･･･＜中略＞･･･
```

おー、なんか楽しくなってきました。

### 今後の改良点

- IndexRecordにアクセサ(Getter, Setter)を作成しフィールドの修飾詞はprivateに
- IO部分とN-gram解析部分のスレッドを分離(マルチスレッドのデザインパターンを学ぶ甲斐あり)
- 文字列の出現位置情報を用いたAND検索(次はこれに挑戦してみよう)
- forブロックのループ継続判定に使用する数値は予め求めておく(毎回length, sizeメソッド等を呼び出さないように)などのコードの最適化。
