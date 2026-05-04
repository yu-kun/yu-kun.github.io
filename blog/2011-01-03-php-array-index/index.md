---
title: 'PHP: 添字配列の初期化、出力、代入'
date: 2011-01-03
authors: [yukun]
tags:
  - array
  - php
slug: php-array-index
---

### ソースコード


```php
<?php
// 添字配列の初期化
$numbers = array(0, 3, 100, 2087123454, ); // 数値のみ(末尾要素のカンマは省略可)
$strings = array('Jon', 'Mery', 'Sun', 'Ren', ); // 文字列のみ
$numstrs = array(1, 1.0, '1', ); // 複数型混合(数値、少数、文字列)
$empty = array(); // 空の配列
// var_dumpで構造を確認
echo '$numbers == ';
var_dump($numbers);
echo '$strings == ';
var_dump($strings);
echo '$numstrs == ';
var_dump($numstrs);
echo '$empty == ';
var_dump($empty);
echo PHP_EOL;
// 配列の要素を出力
echo $numbers[2], PHP_EOL;
echo $strings[0], PHP_EOL;
echo $numstrs[2], PHP_EOL, PHP_EOL;
// foreach で配列の要素を先頭から順に出力
foreach ($numbers as $val) {
	echo $val, PHP_EOL;
}
echo PHP_EOL;
// 配列の要素への代入
$strings[0] = 'Mike';
$empty[] = 'Jon'; // 空のブラケットを用いると要素の追加となる
echo $strings[0], PHP_EOL;
echo $empty[0], PHP_EOL;
?>
```


### 実行結果

```
$numbers == array(4) {
  [0]=>
  int(0)
  [1]=>
  int(3)
  [2]=>
  int(100)
  [3]=>
  int(2087123454)
}
$strings == array(4) {
  [0]=>
  string(3) "Jon"
  [1]=>
  string(4) "Mery"
  [2]=>
  string(3) "Sun"
  [3]=>
  string(3) "Ren"
}
$numstrs == array(3) {
  [0]=>
  int(1)
  [1]=>
  float(1)
  [2]=>
  string(1) "1"
}
$empty == array(0) {
}
100
Jon
1
3
100
2087123454
Mike
Jon

```

### リファレンス

- [PHP: 配列 - Manual](http://www.php.net/manual/ja/language.types.array.php)
