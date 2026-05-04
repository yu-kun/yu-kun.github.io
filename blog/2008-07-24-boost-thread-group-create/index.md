---
title: 'C++, boost::thread : スレッドグループの生成と実行'
date: 2008-07-24
authors: [yukun]
tags:
  - boost
  - multithread
slug: boost-thread-group-create
---

同じような処理を行うスレッドが複数ある場合は、それらをスレッドグループでまとめると、スレッドへの操作がやり易くなります。スレッドグループへの登録には、boost::thread ライブラリの thread\_group クラスを用いて、メンバ関数 create\_thread() の引数にマルチスレッドで実行したい関数のアドレスを指定します。

それでは下記のサンプルで実際にその過程と実行結果を確認してみましょう。


<!-- truncate -->


### ソースコード


```cpp
 #include #include #include using namespace std; using namespace boost; // マルチスレッドで実行する関数 void run(const char thr_name) { int count = 0; while(1) { if (++count % 100000000 == 0) // 空回り用の if 文 cout << "Thread-" << thr_name << ": No." << count << endl; } } int main() { const char chs[] = {'A', 'B', 'C', 'D'}; // 生成スレッドの名前の配列 const int NUM_THREAD = sizeof(chs) / sizeof(chs[0]); // 配列の要素数の算出 // スレッドグループの生成と実行開始 thread_group thr_grp; for (int i = 0; i < NUM_THREAD; ++i) { thr_grp.create_thread(bind(&run, chs[i])); // create_thread()でrun()を別スレッドで実行 } // join_all()で全スレッドの終了を待つ thr_grp.join_all(); return 0; } 
```


### 実行結果の一例

実行する環境によって、出力結果は変化します(順序など)。

```
Thread-B: No.100000000
Thread-A: No.100000000
Thread-C: No.100000000
Thread-D: No.100000000
Thread-B: No.200000000
Thread-A: No.200000000
Thread-C: No.200000000
Thread-D: No.200000000
Thread-B: No.300000000
Thread-A: No.300000000
Thread-C: No.300000000
Thread-D: No.300000000
Thread-B: No.400000000
Thread-A: No.400000000
＜略＞

```

### リファレンス

- [Boost C++ Libraries - Chapter 17. Thread](http://www.boost.org/doc/libs/1_35_0/doc/html/thread.html "Boost C++ Libraries - Chapter 17. Thread")
    - [Boost C++ Libraries - Thread Management](http://www.boost.org/doc/libs/1_35_0/doc/html/thread/thread_management.html#thread.thread_management.threadgroup "Boost C++ Libraries - Thread Management")
