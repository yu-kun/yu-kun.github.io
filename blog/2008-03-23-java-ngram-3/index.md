---
title: '検索エンジンを実装 (3)文書内の検索語を特定'
date: 2008-03-23
authors: [yukun]
tags:
  - java
  - n-gram
  - search-engine
slug: java-ngram-3
---

今回実装したことは、

- IndexRecordクラスにフィールド更新用のメソッドやハッシュフィールドを追加（今後改善の必要大）。
- 検索語を含んでいるファイルをピックアップする（色々と無駄な部分あり）。

辺りです。

後述に現在の問題点とその解決案を考えてみましたが、先ずはソースコードと実行結果(デバッグプリント)を示します。

**追記**：こちらに→ [検索エンジンを実装 (4)AND演算](/blog/java-intersection "検索エンジンを実装 (4)AND演算 - Yukun's Blog") 完成版を書きましたので、そちらをご覧ください。↓以下、黒歴史(>\_<)↓

### IndexRecord.java


```java
 import java.util.ArrayList; import java.util.TreeMap; public class IndexRecord { // 総出現回数 Integer count; // 出現したファイルID ArrayList file_ids; // ファイル内の出現位置(ファイルの先頭からのオフセット) ArrayList word_poses; // ファイルIDごとに出現数をカウント<ファイルid, 出現数> TreeMap idcntMap; private IndexRecord() {} public IndexRecord(int id, int pos) { count = 1; file_ids = new ArrayList(); file_ids.add(id); word_poses = new ArrayList(); word_poses.add(pos); idcntMap = new TreeMap(); idcntMap.put(id, 1); } public void renewal(int id, int pos) { count++; file_ids.add(id); word_poses.add(pos); if(idcntMap.containsKey(id)){ Integer idcnt = idcntMap.get(id); idcnt++; idcntMap.put(id, idcnt); } else { idcntMap.put(id, 1); } } public String toString() { StringBuffer sb = new StringBuffer(); sb.append(count); for(int i = 0; i < file_ids.size(); i++){ sb.append(" (" + file_ids.get(i) + ", " + word_poses.get(i) + ")"); } sb.append(" "+ idcntMap); return sb.toString(); } } 
```


### Make2Gram.java


```java
 import java.io.File; import java.io.FileReader; import java.io.BufferedReader; import java.io.IOException; import java.util.ArrayList; import java.util.TreeMap; public class Make2Gram{ public static final boolean DEBUG = true; // デバッグ用フラグ public static void main(String[] args) throws IOException{ if(args.length == 0){ System.out.println("引数にディレクトリ名を指定してください"); System.exit(1); } int N = 2; // bigram // http://sattontanabe.blog86.fc2.com/blog-entry-55.html // Java 再帰的にファイルを検索 ／ Chat&Messenger // のクラスFileSearchを使用しています FileSearch search = new FileSearch(); File[] files = search.listFiles(args[0], null); // 全てのファイルを取得 // ファイルIDとパスの対応表 TreeMap fileMap = new TreeMap(); ArrayList docs = new ArrayList(); for(int i=0; i < files.length; i++){ fileMap.put(i, files[i].getAbsoluteFile()); BufferedReader br = new BufferedReader(new FileReader(files[i])); StringBuilder sb = new StringBuilder(); String line; while((line = br.readLine()) != null) sb.append(line); br.close(); // ファイル内容(RAW)を格納 String text = sb.toString(); // ファイルの内容 改行抜き docs.add(text); } //テキストの部分文字列とそのIndexRecordクラスを関連付けるMap //TreeMapなのでMapのキーにした部分文字列でソートされる TreeMap gramMap = new TreeMap(); for(int i = 0; i < fileMap.size(); i++){ // ファイルごとの処理 String text = docs.get(i); for(int j = 0; j < text.length() - N; j++){ //テキストからN文字取り出す String gram = text.substring(j, j + N); if(gramMap.containsKey(gram)){ //gramMapに登録されてる文字列ならカウント等を増やす IndexRecord ir = gramMap.get(gram); ir.renewal(i, j); gramMap.put(gram, ir); }else{ //gramMapに登録されていない文字列なら登録 gramMap.put(gram, new IndexRecord(i, j)); } } } //for(String part : gramMap.keySet()) //System.out.printf("%s : %sn", part, gramMap.get(part)); String input = "N文字"; // 検索語(e.g.) if(DEBUG) System.out.println("input #=> "+ input); String[] swords = new String[(input.length()+1)/2]; boolean odd = false; // 文字列長の偶奇判定 if (input.length() < 2){ System.out.println("2文字未満の処理は未実装"); System.exit(1); } // 検索文字列をN文字単位に分割 for(int i = 0, j = 0; i < input.length()-N; i += N, j++){ swords[j] = input.substring(i, i+N); } if ((input.length() & 1) == 1){ // 文字列長が奇数 swords[swords.length-1] = input.substring(input.length()-N, input.length()); odd = true; } if(DEBUG){ System.out.print("swords #=> "); for(String part : swords) System.out.print(part +" "); System.out.println(); } // [N文, 文字](e.g.) TreeMap id_per_cnt = new TreeMap(); // N文字単位のIndexRecordを格納する配列 IndexRecord[] ng_records = new IndexRecord[swords.length]; // 2文字ごとにgramMapと照合 for(int i = 0; i < swords.length; i++){ if(!gramMap.containsKey(swords[i])) { System.out.println(" 検索語：【"+ input +"】はありません。"); System.exit(1); } IndexRecord ir = gramMap.get(swords[i]); ng_records[i] = ir; TreeMap _idcntMap = ir.idcntMap; for(Integer id : _idcntMap.keySet()){ if(id_per_cnt.containsKey(id)){ int cnt = id_per_cnt.get(id); cnt += _idcntMap.get(id); id_per_cnt.put(id, cnt); } else { id_per_cnt.put(id, _idcntMap.get(id)); } } if(DEBUG) System.out.println(" "+ swords[i] +"："+ ng_records[i]); } if(DEBUG) System.out.println("id_per_cnt #=> "+ id_per_cnt); for(Integer id : id_per_cnt.keySet()){ // ↓以下の部分の評価は中途段階。出現位置を考慮に入れた判定に変更予定。 // それに伴い、IndexRecordのデータ構造は要変更。 if(id_per_cnt.get(id) / swords.length > 0){ if(DEBUG) System.out.println(" 検索語はファイルid["+ id +"]中に存在する可能性あり。"); String target_doc = docs.get(id); int pos = target_doc.indexOf(input); String mch = target_doc.substring(pos, pos + input.length()); System.out.println(" 照合文字列 : "+ mch); } } } } 
```


### 実行結果(コマンドライン引数部分は省略)

```
input #=> N文字
swords #=> N文 文字
  N文：2 (0, 1) (0, 42) {0=2}
  文字：3 (0, 2) (0, 43) (1, 61) {0=2, 1=1}
id_per_cnt #=> {0=4, 1=1}
  検索語はファイルid[0]中に存在する可能性あり。
  照合文字列 : N文字
```

### 現在の問題点

IndexRecordクラス:ArrayList型ではフィールド(ファイルidと出現位置)の関係性を取りづらい。

### 解決案

IndexRecordクラスのフィールドにファイルidを主キーとして、その部分単語の全ての出現位置を求められるハッシュデータが必要かと考えました。

今回もうすうすは感じていましたが、データ構造を設計し間違えるとプログラム構造が煩雑になりやすいです。初めから仕様を明確にしておけばデータモデリングでミスることもなかったかな。

しばらくは、今後の実装機能の洗い出しとそれに対応できるクラス構造を考えてみようかな。また、N-gramに分割する処理部分は別クラスのインスタンスメソッドとしてまとめたほうが良いですね。並行してデザインパターンも復習しておこう。
