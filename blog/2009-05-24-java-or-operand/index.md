---
title: 'Java: OR論理演算子の評価条件'
date: 2009-05-24
authors: [yukun]
tags:
  - java
slug: java-or-operand
---

以前、OR演算の2つのオペランドが両方評価されるか否かがあやふやだったので以下のコードを以て改めて確認してみます。 

```java
public class Sample1 {
  public static void main(String[] args) {
    int i = 5, j = 10, k =15;
    if ((i++ < j) | (k-- > j))
      System.out.println("values of i: " + i + " values of k: " + k);
    if ((i < j) || (--k > j))
      System.out.println("values of k: " + k);
  }
}
```

 実行結果は

```
values of i: 6 values of k: 14
values of k: 14

```

となります。 1つめのif文で使われている演算子はビット論理OR演算子で左右の**両オペランドを評価**します。よって式i++とk--が評価されているため結果はvalues of i: 6 values of k: 14となります。 2つめのif文で使われているのは短絡論理OR演算子で、評価順序は||の_左側のオペランドを先ず評価し_、それがtrueなら_右側は評価せず_(ORは片方が真ならもう片方の結果にかかわらず真ですから)、_falseなら評価_します。よって、if ((i < j) || (--k > j))ではi < jがtrueとなるため--k > jは評価されずkはデクリメントされません。よってkの値は変わらず、上記のような実行結果となります。
