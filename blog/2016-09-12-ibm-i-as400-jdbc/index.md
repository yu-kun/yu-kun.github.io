---
title: 'IBM System i (AS400): JDBCからPF・LFファイルへアクセスする際の参考サイト'
date: 2016-09-12
authors: [yukun]
tags:
  - as400
  - ibm
  - java
  - system-i
slug: ibm-i-as400-jdbc
---

JDBCを用いてIBM System i(AS400)からPF、LFファイルへアクセスする際に参考となるリンクを以下に纏めておく。(全て公式サイト) 
<!-- truncate -->


- JDBCのドライバのダウンロード先：[IBM Toolbox for Java and JTOpen](http://www-03.ibm.com/systems/power/software/i/toolbox/)
- JDBCドライバに関わるドキュメント：[IBM Knowledge Center - IBM Toolbox for Java JDBC ドライバー](https://www.ibm.com/support/knowledgecenter/ja/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/tcws_toolbox.html)
- サンプルコード：[IBM Knowledge Center - Example: Using JDBCQuery to query a table](http://www.ibm.com/support/knowledgecenter/ssw_ibm_i_71/rzahh/jdbcqueryexample.htm)

尚、ドライバについてはAS400上の下記のパス上にも保管されているので、ここからダウンロードしてJavaのクラスパスを通して使用することも可能。

```
/QIBM/ProdData/HTTP/Public/jt400/lib/jt400.jar
```
