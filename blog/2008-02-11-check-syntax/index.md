---
title: '3種類の括弧の対応をチェックするC言語プログラム'
date: 2008-02-11
authors: [yukun]
tags:
  - c-language
  - stack
  - string
slug: check-syntax
---

先日勉強会でこの辺のテーマを取り上げたので、字句解析や構文解析(の一部)とスタックの復習も兼ねて作成(required for 1h+)。

### 実装のポイント

- 閉じ括弧の有無の判定は、ファイルの終端が読み終わった後。
- 開き括弧の判定は、閉じ括弧を読み込んだ際に行い、スタックの最上位に対応する開き括弧があるか否かで。
- 入れ子の(または再帰的な)構造で、どの深さにスレッドがいるか調べるにはスタックを用いる。


<!-- truncate -->


### ソースコード(C言語) valid\_pare.c


```cpp
#include <stdio.h>
#include <stdlib.h>
const int MAXSIZE = 128; // スタックサイズ(静的)
// スタックするデータ構造(Cell)
typedef struct brackets Brackets;
struct brackets {
  int kind; // 括弧の種類
  int line; // 位置：行
  int pos; // 位置：列
};
Brackets stack[128];
int pnt;
Brackets pop(void)
{
  if (pnt < = 0) {
    printf("error:stack empty.\n");
    exit(1);
  }
  pnt--;
  return stack[pnt];
}
void push(Brackets b)
{
  if (pnt >= MAXSIZE) {
    printf("error:stack fullness.\n");
    exit(1);
  }
  stack[pnt] = b;
  pnt++;
}
// stackが空(1)か否(0)か
int empty(void)
{
  return (pnt == 0) ? 1 : 0;
}
// スタックの最上位の文字種を返す
int peek()
{
  return stack[pnt-1].kind;
}
// 括弧の判別
int kind(int ch)
{
  int code;
  switch (ch) {
  case '(':
    code = 1;
    break;
  case ')':
    code = 2;
    break;
  case '{':
    code = 3;
    break;
  case '}':
    code = 4;
    break;
  case '[':
    code = 5;
    break;
  case ']':
    code = 6;
    break;
  default:
    code = 0; // 括弧以外の文字
    break;
  }
  return code;
}
int main()
{
  int ch;
  FILE *fp;
  char fname[64]; // ファイル名
  int k; // 文字の種類
  int line = 1, pos = 0;
  Brackets kakko, temp;
  pnt = 0; // スタックポインタ(GV)の初期化
  printf("Filename:");
  scanf("%62s", fname);
  if ((fp = fopen(fname, "r")) == NULL) {
    printf("\aCan't be opened.\n");
    exit(1);
  }
  //printf("%d行目\n", line);
  // ファイルから一文字ずつ読む
  while ((ch = fgetc(fp)) != EOF) {
    //putchar(ch);
    if (ch == '\n') {
      line++; pos=0;
      //printf("%d行目\n", line);
      continue;
    }
    pos++;
    //printf("%d", pos);
    k = kind(ch);
    if (k > 0) { // 文字が括弧の場合
      if (k % 2) { // 開き括弧の場合
        kakko.kind = k;
        kakko.line = line;
        kakko.pos  = pos;
        push(kakko);
      } else if (!empty() && (k == peek()+1)) {
        temp = pop(); // 対応する閉じ括弧があった
      } else {
        printf("対応する開き括弧がない");
        printf("(%d行目の%d文字目)。\n", line, pos);
      }
    }
  }
  puts("テキスト終端");
  fclose(fp);
  if (!empty()) {
    printf("対応する閉じ括弧がない。\n");
    while (!empty()) {
      temp = pop();
      printf("%d行目の%d文字目。\n", temp.line, temp.pos);
    }
  }
  return 0;
}
```


### 使用したText

```
(1+2)
ac)c
((3+6)ge))
(([y)
ij])(k
{5/3}
```

### 実行結果

```
D:\parentheses>gcc valid_pare.c
D:\parentheses>a.exe
Filename:pare.txt
対応する開き括弧がない(2行目の3文字目)。
対応する開き括弧がない(3行目の10文字目)。
対応する開き括弧がない(4行目の5文字目)。
テキスト終端
対応する閉じ括弧がない。
5行目の5文字目。
4行目の1文字目。
D:\parentheses>

```

### 改良するなら

- 関数を他のファイルに分けて、main側でインクルードする。
- スタック領域を動的に割り当てる。(Brackets \*)emalloc(sizeof(Brackets))かな。
- スタック配列を伸縮性のある構造・操作関数で実装する。
- 結果の表示をコンパイラのエラー出力っぽくする。該当箇所に「^」をマーク。
- 他の言語で実装してみる(OOPを用いて等等)。
- 字句・構文解析のオープンソースを参考にする。

こういった小さなものを作りつつ、OOPのパターンに基づいて拡張性を考慮する今日この頃。
