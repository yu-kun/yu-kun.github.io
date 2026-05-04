---
title: 'C++, boost::thread : スレッドの生成と実行'
date: 2008-07-08
authors: [yukun]
tags:
  - boost
  - multithread
slug: boost-thread-create-run
---

C/C++でスレッドを扱う場合は、プラットフォームによって使用するライブラリが違います。 Windows なら Windows API の thread で、 UNIX や Linux 系ならば pthread ライブラリ等を使用します。プラットフォーム依存するコードは可搬性に難があり、解決策の1つとしてプリコンパイルで依存部分をプラットフォームに合わせたライブラリを選択してコンパイルする方法があります。


<!-- truncate -->


boost ライブラリの boost::thread は、上のような処理をラップして共通のインターフェイスとして実装されています。

boost/thread.hppの一部


```cpp
#if defined(BOOST_THREAD_PLATFORM_WIN32)
#include <boost/thread/win32/thread.hpp>
#elif defined(BOOST_THREAD_PLATFORM_PTHREAD)
#include <boost/thread/pthread/thread.hpp>
#else
#error "Boost threads unavailable on this platform"
#endif
```


これによって、 boost がインストールされている OS ならば、同じコードでコンパイルすることが出来ます。さて、それでは boost::thread を使って基本的なスレッドの生成と実行を、以下の三つのパターンで確認してみます。

- 引数なし関数をマルチスレッドで実行
- 引数付き関数をマルチスレッドで実行
- メンバ関数をマルチスレッドで実行

## 引数なし関数をマルチスレッドで実行

### ソースコード


```cpp
#include <iostream>
#include <boost/thread.hpp>
using namespace std;
using namespace boost;
// 引数なし関数をマルチスレッドで実行
const int kCount =  100000000;
const int kInterval = 1000000;
void PrintHello() {
  for(int i = 0; i != kCount; ++i)
    if (!(i % kInterval)) cout << "Hello ";
}
void PrintWorld() {
  for(int i = 0; i != kCount; ++i)
    if (!(i % kInterval)) cout << "World! ";
}
int main() {
  thread thr_hello(&PrintHello); // PrintHello関数を実行するスレッドの生成、実行
  thread thr_world(&PrintWorld);
  thr_hello.join(); // thr_helloが走らせているスレッドの終了を待つ
  thr_world.join();
  return 0;
}
```


### 実行結果の一部抜粋

`Hello World! Hello Hello World! Hello World! Hello World! Hello World! World! Hello World! Hello World! Hello World! Hello World! Hello World! World!`

13行目: PrintHello() の for ループで kInteral を用いて空回りの負荷をある程度与えることで、スレッドの切り替え(スレッドスケジューリング)を出力に反映させやすくしています。仮に、単なるforループだと、マシン性能が高い場合スレッドの切り替え前に関数の実行が終了してしまう場合もありマルチスレッドか否かの確認がとり難いです。

23行目: thread クラスのインスタンスを生成しそのコンストラクタに、0引数の関数のアドレスを渡すことで、その関数を走らせるスレッドを生成、実行しています。

ここで、関数アドレスを表す表記は&関数名ですが、この**アンパサンド「&」は省略できます**。実際に確認しますと、

```
cout <<  PrintHello << endl;
cout << &PrintHello << endl;
```

の出力結果は、

```
003B17A8
003B17A8
```

となります。実行する環境によって上の数値は変わりますが、ここで大事なのは二つの出力が同値である、すなわち「**関数名＝＝&関数名＝＝関数のアドレス**」ということです。

余談ですが、関数アドレスを格納する関数ポインタを引数として渡すことも勿論可能です。例えば、

```
void (*fp)(void) = PrintHello; // 関数のアドレスを指す関数ポインタを宣言
thread thr_fp(fp); // ポインタが指すアドレスにある関数を走らせるスレッドを生成、実行
```

とも書けます。さて、次に引数をとる関数のスレッドの生成、実行方法を確認しましょう。

## 引数付き関数をマルチスレッドで実行

### ソースコード


```cpp
#include <iostream>
#include <boost/thread.hpp>
#include <boost/bind.hpp>
using namespace std;
using namespace boost;
// 引数付き関数をマルチスレッドで実行
const int kCount =  100000000;
const int kInterval = 1000000;
void PrintString(const char *str) {
  for(int i = 0; i != kCount; ++i)
    if (!(i % kInterval)) cout << str;
}
int main() {
  const char *kHello = "Hello ";
  const char *kWorld = "World! ";
  thread thr_hello(bind(&PrintString, kHello));
  thread thr_world(bind(&PrintString, kWorld));
  thr_hello.join();
  thr_world.join();
  return 0;
}
```


### 実行結果の一部抜粋

`Hello World! Hello Hello World! Hello World! Hello World! Hello World! World! Hello World! Hello World! Hello World! Hello World! Hello World! World!`

21行目: thread クラスのコンストラクタには**関数オブジェクトも渡せる**ので、 **boost::bind** を用いて、その第二引数にPrintString 関数に渡したい引数を指定して、関数オブジェクトを生成しています。

さて、2つのスレッドの生成法を確認しましたが、 Java や他のオブジェクト指向をサポートしている言語を使い慣れている人には、違和感のある書き方だったかもしれません。私は「引数よりメンバ変数の呼び出しの方がいい」「C++ならオブジェクト指向だよね」と脊髄反射的に思ったり。  
ということで最後は、

## メンバ関数をマルチスレッドで実行

### ソースコード


```cpp
#include <iostream>
#include <boost/thread.hpp>
#include <boost/bind.hpp>
using namespace std;
using namespace boost;
// メンバ関数をマルチスレッドで実行
class PrintMessage {
 public:
  PrintMessage(const char* msg)
    :kMessage_(msg), kCount_(100000000), kInterval_(1000000) {}
  void run();
 private:
  const int kCount_;
  const int kInterval_;
  const char *kMessage_;
};
void PrintMessage::run() {
  for(int i = 0; i != kCount_; ++i)
    if (!(i % kInterval_)) cout << kMessage_;
}
int main() {
  PrintMessage hello("Hello ");
  PrintMessage world("World! ");
  thread thr_hello(bind(&PrintMessage::run, &hello));
  thread thr_world(bind(&PrintMessage::run, &world));
  thr_hello.join();
  thr_world.join();
  return 0;
}
```


### 実行結果の一部抜粋

`Hello World! Hello Hello World! Hello World! Hello World! Hello World! World! Hello World! Hello World! Hello World! Hello World! Hello World! World!`

おー、盛り上がってきましたね。

## リファレンス

[Boost C++ Libraries - Boost.Threads - <boost/thread.hpp>](http://www.boost.org/doc/libs/1_31_0/libs/thread/doc/thread.html#class-thread)
