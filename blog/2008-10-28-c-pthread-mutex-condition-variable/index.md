---
title: 'C++, pthread: スレッドの同期と排他制御 - MutexとCondition Variable'
date: 2008-10-28
authors: [yukun]
tags:
  - multithread
  - pthread
  - synchronization
slug: c-pthread-mutex-condition-variable
---

以前、[Boostライブラリを用いたスレッドの同期と排他制御](/blog/boost-thread-mutex-condition "C++, boost::thread : スレッドの同期と排他制御 - mutex、conditionクラス - Yukun's Blog")を取り上げましたが、今記事はそれのpthreadバージョンです（似せただけです）。pthreadライブラリ自体はC言語から扱えますが、今回はstaticなメンバ関数を別スレッドで動かす練習も兼ねてC++で書いてみました。 
<!-- truncate -->


## ソースコード


```cpp
#include <iostream>
using namespace std;
#include <stdio.h>
#include <pthread.h>
#define BUFFER_NUM 100
#define WAIT_NUM 1000000
#define LOOP_NUM 100
class HandleData {
public:
  HandleData()
  : index_(0), channel_array_len_(sizeof(channel_array_)/sizeof(channel_array_[0])), num_data_(0) {
    access_lock_ = PTHREAD_MUTEX_INITIALIZER;
    access_threshold_ = PTHREAD_COND_INITIALIZER;
  }
  // データの追加
  void putData(int n) {
    pthread_mutex_lock(&access_lock_); // スレッドにロックをかける
    while (index_ >= channel_array_len_) {
      printf("putData(): waitn");
      pthread_cond_wait(&access_threshold_, &access_lock_);
      // このスレッドを一時停止しロックを解除する（getData側のpthread_cond_signalが呼ばれるまで）
    }
    int i = index_;
    channel_array_[index_++] = n; // スレッドセーフなデータ格納
    printf("put: %2d in channel_array_[%2d]n", n, i);
    pthread_cond_signal(&access_threshold_);
    pthread_mutex_unlock(&access_lock_); // スレッドのロックを解除
  }
  // データの取得
  int getData() {
    pthread_mutex_lock(&access_lock_);
    while (index_ <= 0) {
      printf("getData(): waitn");
      pthread_cond_wait(&access_threshold_, &access_lock_);
      // このスレッドを一時停止しロックを解除する（putData側のpthread_cond_signalが呼ばれるまで）
    }
    num_data_ = channel_array_[--index_]; // スレッドセーフなデータ取得
    printf("get: %2d in channel_array_[%2d]n", num_data_, index_);
    pthread_cond_signal(&access_threshold_);
    pthread_mutex_unlock(&access_lock_);
    return num_data_;
  }
  // データを格納する関数(スレッド)
  static void *runPut(void *hd) {
    int wait_num = WAIT_NUM;
    HandleData *phd = reinterpret_cast<handleData*>(hd);
    for (int i = 0; i < LOOP_NUM; i++) {
      phd->putData(i);
      while (--wait_num); // 空回しで時間稼ぎ
      wait_num = WAIT_NUM;
    }
    return NULL;
  }
  // データを取得する関数(スレッド)
  static void *runGet(void *hd) {
    HandleData *phd = reinterpret_cast<handleData*>(hd);
    for (int i = 0; i < LOOP_NUM; i++) {
      phd->getData();
    }
    return NULL;
  }
private:
  pthread_mutex_t access_lock_; // 排他制御を行う変数(lock, unlock)
  pthread_cond_t access_threshold_; // 状態変数(waitしてlockを外す用途)
  volatile int index_;
  int channel_array_[BUFFER_NUM]; // putData()、getData()からアクセスされる変数
  const int channel_array_len_;
  int num_data_;
};
int main()
{
  pthread_t thr_put;
  pthread_t thr_get;
  HandleData hd;
  // スレッドの生成(走らせるのはstaticメンバ関数)
  pthread_create(&thr_put, NULL, HandleData::runPut, reinterpret_cast<void*>(&hd));
  pthread_create(&thr_get, NULL, HandleData::runGet, reinterpret_cast<void*>(&hd));
  pthread_join(thr_put, NULL);
  pthread_join(thr_get, NULL);
  return 0;
}
```

 あまりこういった書き方はしないのだけれど。

## 実行結果の一例

```
put:  0 in channel_array_[ 0]
put:  1 in channel_array_[ 1]
put:  2 in channel_array_[ 2]
put:  3 in channel_array_[ 3]
get:  3 in channel_array_[ 3]
get:  2 in channel_array_[ 2]
＜中略＞
put: 96 in channel_array_[ 0]
get: 96 in channel_array_[ 0]
getData(): wait
put: 97 in channel_array_[ 0]
get: 97 in channel_array_[ 0]
getData(): wait
put: 98 in channel_array_[ 0]
get: 98 in channel_array_[ 0]
getData(): wait
put: 99 in channel_array_[ 0]
get: 99 in channel_array_[ 0]

```

## pthreadで相互排他を行う際の注意点

boostのmutex::scoped\_lockクラスであればデストラクタにロックの解除を任せられるので管理が楽ですが、pthreadでは「ロックする」、「ロック解除」の2ステップを必ず書かなければなりません。なのでロック中に予期せぬ例外やエラーの為関数などのスコープを脱する際もpthread\_mutex\_unlock()をし忘れていないか等の注意が必要です。
