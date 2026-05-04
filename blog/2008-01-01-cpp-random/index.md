---
title: 'C++でMIN以上MAX未満の乱数を生成'
date: 2008-01-01
authors: [yukun]
tags:
  - number
  - random
slug: cpp-random
---

### ソースコード


```cpp
 #include // for time() #include // for srand(), rand() #include using namespace std; #define MIN 10 #define MAX 21 int main() { srand(time(NULL)); // 現在時刻を乱数の種の設定 int lucky = MIN + rand() % (MAX - MIN); // MIN以上MAX未満の乱数を生成 cout < < "生成した乱数は" << lucky << "です。n"; for (int i = 0; i< 100; i++) { // 100個生成 cout << MIN + rand() % (MAX - MIN) << " "; } return 0; } 
```

 
<!-- truncate -->


### 実行結果

`C:cpp> g++ rand01.cpp C:cpp> a.exe 生成した乱数は19です。 14 13 11 10 18 15 11 14 19 11 11 14 19 17 20 10 10 16 20 18 13 18 17 10 16 19 13 18 14 10 19 17 12 18 20 13 15 14 20 13 10 14 20 15 19 13 11 19 19 13 20 19 15 19 15 13 18 12 18 10 13 14 12 10 16 13 14 20 13 16 11 11 10 12 16 17 13 10 20 11 10 18 12 19 14 18 10 12 12 14 10 15 12 17 19 18 19 17 12 19 C:cpp>`
