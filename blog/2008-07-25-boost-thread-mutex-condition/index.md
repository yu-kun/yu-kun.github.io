---
title: 'C++, boost::thread : スレッドの同期と排他制御 - mutex、conditionクラス'
date: 2008-07-25
authors: [yukun]
tags:
  - boost
  - multithread
  - synchronization
slug: boost-thread-mutex-condition
---

複数のスレッドから1つの変数にアクセスする際、システム側のスレッドスケジューリング次第で、予期せぬ書き換えが起こってしまう場合があります。その為、ある1つのスレッドが変数にアクセスしている際は他のスレッドをブロックする排他制御やスレッドの同期を行う必要があります。C++でJavaのsynchronizedメソッド/ブロックと同じような記法でクリティカルセクションを実装する方法の1つにboost::threadライブラリのmutexとconditionクラスがあります。 
<!-- truncate -->


## mutex クラスの使い方

スレッドの排他制御を実現できます。具体的な使い方は、mutexインスタンスをmutex::scoped\_lockクラスのコンストラクタの引数に指定し、そのインスタンスを取得することでロックをかけられます。あるスレッドが上の処理を以ってmutexインスタンスにロックをかけた場合、その他のスレッドは再度同一のmutexインスタンスにロックをかけられないようになっており、その他のスレッドはscoped\_lockのコンストラクタ途中で待たされます。 mutexインスタンスのロック解除は、ロックをかけたスレッドがscoped\_lockインスタンスのデストラクタを実行することで完了します。

## condition クラスの使い方

次に、複数のスレッドを同期させる処理について。例えば、あるスレッドが排他的にある変数にアクセスしようとするが、その前にif文を用いて「Wait! そのアクセスちょっと待った！しばらく他のスレッドの処理を待て！」みたいな処理を行いたい場合。そのスレッドは既にmutex変数でロックを取得していますが、「待ち」に入る際はロックを解除する必要があります。 上述のような処理を実現するのがconditionクラスです。メンバ関数のwait()に引数にmutexインスタンスを指定することで、そのスレッドはロックを解除し一時停止します。他のスレッドがnotify\_all()を実行すると、一時停止中の全てのスレッドが実行可能状態になります。これによって、スレッドの同期を実現します。

## 実際にどんな挙動か確かめよう

上の説明は以下のサンプルと実行結果を先に確認した後の方がしっくりくるかもしれません。

### ソースコード


```cpp
#include <iostream>
#include <string>
#include <boost/thread.hpp>
#include <boost/bind.hpp>
using namespace std;
using namespace boost;
class HandleData {
 public:
  HandleData()
    : index_(0), iarr_len_(sizeof(iarr_)/sizeof(iarr_[0])), num_data_(0){}
  // データの追加
  void putData(int n) {
    // mutexインスタンスにロックをかける
    mutex::scoped_lock look(thread_sync_);
    while (index_ >= iarr_len_) {
      printf("[putData] waitn");
      // 引数のmutexインスタンスのロックを解除する。
      // notify_all()などが呼ばれるまでこのスレッドを一時停止する
      thread_state_.wait(thread_sync_);
    }
    printf("put: %d in iarr_[%d]n", n, index_);
    iarr_[index_++] = n;
    int loop = 1000000;
    while(loop--) ; // 空回し用
    thread_state_.notify_all();
  } // lockのデストラクタが呼ばれてロック解除(lookインスタンスのスコープ切れ)
  // データの取得
  int getData() {
    // putData()と同じくiarr_にスレッドセーフでアクセスする為にロックをかける
    mutex::scoped_lock look(thread_sync_);
    while (index_ <= 0) { // putData側のthread_state_.notify_all();が実行されるまで待つ
      printf("[getData] waitn");
      thread_state_.wait(thread_sync_);
    }
    num_data_ = iarr_[--index_];
    printf("get: %d in iarr_[%d]n", num_data_, index_);
    thread_state_.notify_all();
    return num_data_;
  } // lookのデストラクタでロック解除
 private:
  mutex thread_sync_;
  condition thread_state_;
  int index_;
  int iarr_[100]; // putData()、getData()からアクセスされる変数
  const unsigned int iarr_len_;
  int num_data_;
};
void threadPut(HandleData *hd) {
  const unsigned int NUM_LOOP = 100;
  for (int i = 0; i < NUM_LOOP; i++) {
    hd->putData(i);
  }
}
void threadGet(HandleData *hd) {
  const unsigned int NUM_LOOP = 100;
  for (int i = 0; i < NUM_LOOP; i++) {
    hd->getData();
  }
}
int main()
{
  HandleData hd;
  thread thr_put(bind(&threadPut, &hd));
  thread thr_get(bind(&threadGet, &hd));
  thr_put.join();
  thr_get.join();
  return 0;
}
```


### 実行結果の一例

実行する環境によって、出力結果は変化します(格納・出力順序など)。

```
put: 0 in iarr_[0]
get: 0 in iarr_[0]
put: 1 in iarr_[0]
get: 1 in iarr_[0]
＜中略＞
get: 12 in iarr_[1]
get: 11 in iarr_[0]
[getData] wait
put: 13 in iarr_[0]
put: 14 in iarr_[1]
get: 14 in iarr_[1]
get: 13 in iarr_[0]
[getData] wait
put: 15 in iarr_[0]
put: 16 in iarr_[1]
＜中略＞
get: 95 in iarr_[0]
[getData] wait
put: 97 in iarr_[0]
put: 98 in iarr_[1]
get: 98 in iarr_[1]
get: 97 in iarr_[0]
[getData] wait
put: 99 in iarr_[0]
get: 99 in iarr_[0]

```

### volatile 修飾子の必要性

52行目のメンバ変数のindexの宣言 `volatile int index_;` volatile(揮発性)接頭語がつくと、コンパイラによる最適化を防ぐことができます。これによって、プログラムはindex\_を読み取る際は必ずメモリから読みにいきます。これは変数が複数スレッドから常に書き換えられても、必ずそれが反映されるということです。 このサンプルでは付けなくても最適化によるバグの発生はなさそうかな...? 追記：コメントでのご指摘の通り、volatileは不要なので削除しました。

### リファレンス

- [Boost C++ Libraries - Chapter 17. Thread](http://www.boost.org/doc/libs/1_35_0/doc/html/thread.html "Boost C++ Libraries - Chapter 17. Thread")
    - [Boost C++ Libraries - Synchronization](http://www.boost.org/doc/libs/1_35_0/doc/html/thread/synchronization.html#thread.synchronization.mutex_types "Boost C++ Libraries - Synchronization")
