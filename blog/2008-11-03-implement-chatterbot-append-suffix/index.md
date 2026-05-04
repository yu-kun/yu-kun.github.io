---
title: '人工無脳を作ってみる (1)入力文の末尾に文字列を追加'
date: 2008-11-03
authors: [yukun]
tags:
  - chatterbot
  - java
  - read
  - string
slug: implement-chatterbot-append-suffix
---

さて、最初は単純にユーザの入力文の末尾に予め定義されている文字列を付け足して応答するだけのものです。

### ソースコード


```java
 package info.yukun.chatterbot; import java.io.BufferedReader; import java.io.InputStreamReader; public class SimpleChatterBot { private String botName = "chatterbot"; private String callStr = "なにかしゃべってよ(>_<)"; private String[] suffixResponses = { "ってアレですね、わかります(^^)b", "ですか？わかりません(>_<)", "って何？日本語でおk('`)b"}; public void go() { try { BufferedReader stdReader = new BufferedReader(new InputStreamReader(System.in)); System.out.print("INPUT : "); String response; String input; while ((input = stdReader.readLine()) != null) { // ユーザの入力待ち if (input.equals("")) { // 入力が無かった response = callStr; } else { response = decorateInput(input) + getSuffixResponse(); } System.out.print(botName + ": " + response); System.out.print("\nINPUT : "); } stdReader.close(); System.out.println("\nPROGRAM END"); } catch (Exception e) { e.getStackTrace(); System.exit(-1); // プログラムを終了 } } private String getSuffixResponse() { int rand = (int) (Math.random() * suffixResponses.length); return suffixResponses[rand]; } private String decorateInput(String input) { return "「" + input + "」"; } public static void main(String[] args) { SimpleChatterBot bot = new SimpleChatterBot(); bot.go(); } } 
```

 getSuffixResponse()メソッド内で使われているMath.random()は、

> static double random() 0.0 以上で、1.0 より小さい正の符号の付いた double 値を返します。

ですので、「Math.random() \* 配列の長さ」 は「0～配列の長さ-1」 を意味します。

### 実行結果の例

```
INPUT : こんにちは
chatterbot: 「こんにちは」って何？日本語でおk('`)b
INPUT : え、
chatterbot: 「え、」ですか？わかりません(>_<)
INPUT : いえ、聞き返しただけです。
chatterbot: 「いえ、聞き返しただけです。」って何？日本語でおk('`)b
INPUT :
chatterbot: なにかしゃべってよ(>_<)
INPUT : 最近どうですか？
chatterbot: 「最近どうですか？」ってアレですね、わかります(^^)b
INPUT :
PROGRAM END

```

なんだかー、それはかとなくばかにしていますねf^^; 最初はJavaで書いていきますが、実装する機能の種類やリリースする環境によっては恐らく途中でOOをサポートする他の言語に変更するかも。
