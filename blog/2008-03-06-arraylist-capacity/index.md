---
title: 'ArrayListのコンストラクタに初期容量を指定することで要素の追加処理を高速化'
date: 2008-03-06
authors: [yukun]
tags:
  - array
  - java
  - list
  - memory
slug: arraylist-capacity
---

javaのArrayListのコンストラクタにはオーバーロードで幾つかの種類がありますが、その一つに以下のようなものがあります。

> ArrayList(int initialCapacity) 指定された初期サイズで空のリストを作成します。 [Java 2 Platform SE 1.3: クラス ArrayList](https://docs.oracle.com/javase/jp/6/api/java/util/ArrayList.html)

ArrayListは動的に容量を確保しますが、そのメモリ割り当て処理はCPUにそれなりの負荷を与えます。そこで、予め格納する容量が分かっていればコンストラクタの引数で初期容量を指定することで、その負荷の掛かる処理を事前に省くことが出来、その結果、処理時間の短縮につながります。

ちなみに、このint initialCapacityの容量の単位はコレクションの要素数です(2008/3/7修正)。

以下に初期容量を指定したときとしないときのでの処理時間を計るJavaのソースコードを示します。


```java
 import java.io.*; // for BufferedReader import java.util.*; // for ArrayList public class DumpFile { /** * @param args : 入力ファイル名 */ public static void main(String[] args) { String line; ArrayList filelist = new ArrayList(); ArrayList mlist = new ArrayList(4000000); // 計測用リスト：4898304バイトのファイル if (args.length < 1) { // コマンドライン引数の数 System.out.println("How to use: java DumpFile [filename]"); System.exit(1); } try { BufferedReader br = new BufferedReader(new FileReader(args[0])); while ((line = br.readLine()) != null) { filelist.add(line); // 入力ファイルは一行=一要素として格納 //System.out.println(line); } br.close(); } catch (Exception e) { System.err.println(e.toString()); } int n = filelist.size(); long start = System.currentTimeMillis(); // 処理時間の計測開始 for (int i = 0; i < n; i++) { //System.out.println(list.get(i)); mlist.add(filelist.get(i)); } long end = System.currentTimeMillis(); System.out.println("実行時間:" + (end - start) + "ms"); /*for (int i = 0; i < n; i++) { System.out.println(mlist.get(i)); }*/ } } 
```


入力ファイルは日本語単語405,000語で4898304Byteです。

```
…< 中略>…
楽観
楽観さ
楽観し
楽観した
楽観したら
楽観したり
楽観したろう
楽観しちゃ
…< 中略>…
```

結果は、

`mlistに対して初期容量を指定しない場合：17ms   mlistに対して初期容量を指定した　場合：8ms`

となり、今回の場合は処理時間を1/2に短縮できていることが分かりました。 ちなみに、ArrayListのメモリ動的割り当て容量は、現在の容量の1.5倍のようです。

> int newCapacity = (oldCapacity \* 3)/2 + 1; ArrayList#ensureCapacityメソッド内の一文 - ArrayList.java 1.56 06/04/21

### 参考にしたサイト

- Java 入門 | ArrayList クラス

### 追記(2008/3/7)：

1．コンストラクタでインスタンス容量を指定するものとして、StringBufferクラスがあります。これも、

```
StringBuffer sb = new StringBuffer(40000); // 40KByteを確保
```

のように指定します。

これによって、append()やinsert()によって予め割り当てられたバッファを越す際に呼び出されるメモリ動的割り当て処理を軽減することが出来ます。

2．ArrayListのコンストラクタに引数を指定しない場合は10個の要素を持った配列が作られます。

> /\*\* \* Constructs an empty list with an initial capacity of ten. \*/ public ArrayList() { this(10); } ArrayList.java 1.56 06/04/21
