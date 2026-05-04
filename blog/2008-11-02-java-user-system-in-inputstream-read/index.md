---
title: 'Java: ユーザからの(標準)入力を取得 - System.inとInputStreamReaderクラス'
date: 2008-11-02
authors: [yukun]
tags:
  - java
  - read
  - string
slug: java-user-system-in-inputstream-read
---

コマンドプロンプトからキーボード(標準)入力を取得するプログラムです。 肝心の標準入力を取得する手続きはSystem.inフィールドですが、これはバイトストリームでの読み込みを行うメソッドしか持たないので、InputStreamReaderクラスでラップすることでバイトストリームを文字列に変換出来るメソッドに任せます(read()メソッド)。 しかし、InputStreamReader#read()メソッドは一文字毎にしか読み込めず非効率な面があるので、最後にBufferedReaderクラスでラップすることで入力文字をバッファに格納し一行まとめて読み込めるようにします。(readLine()メソッド)。 このように、高水準のコンポーネントにSystem.inのような低水準のコンポーネントを渡して、その中で低水準メソッドを制御する手法はTemplate Methodパターンに通じるものがあるかも。The Open-Closed Principleですね。

### ソースコード


```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
public class ReadLineSample {
  public static void main(String[] args) {
    try {
      BufferedReader stdReader =
        new BufferedReader(new InputStreamReader(System.in));
      System.out.print("INPUT : ");
      String line;
      while ((line = stdReader.readLine()) != null) { // ユーザの一行入力を待つ
        if (line.equals("")) line = "＜空文字＞";
        System.out.print("OUTPUT: " + line);
        System.out.print("\nINPUT : ");
      }
      stdReader.close();
      System.out.println("\nPROGRAM END");
    } catch (Exception e) {
      e.getStackTrace();
      System.exit(-1); // プログラムを終了
    }
  }
}
```


### 実行結果

文字列を入力した後Enterキーを押すと入力した文字がOUTPUTされます。

```
INPUT : Hello World!
OUTPUT: Hello World!
INPUT : こんにちは。
OUTPUT: こんにちは。
INPUT :
OUTPUT: ＜空文字＞
INPUT :
PROGRAM END

```

プログラムを終了する際は、プロンプト上でCtrl+CかCtrl+Zを押してください。それでreadLine()の戻り値はnullとなりwhileループを抜けます。ここでの注意は、単に文字を何も入力せずEnterキーだけ打つと**空文字を返す**ことです（≠null）。 対して、C言語でこういった処理の場合は環境に合わせた改行文字も読み込こんでいます。たぶん、JavaではInputStreamReaderのreadのどこかの段階でその辺は上手く処理されているのかな？気が向いた時に確認してみようかな。
