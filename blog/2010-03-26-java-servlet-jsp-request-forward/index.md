---
title: 'Java: ServletからJSPへリクエストをフォワード'
date: 2010-03-26
authors: [yukun]
tags:
  - java
  - jsp
  - servlet
slug: java-servlet-jsp-request-forward
---

### 目的

Servletで処理した結果をJSPファイルに転送し、HTMLを生成する。これによって、MVCモデルにおけるViewの分離ができる。

### 方法


```java
 protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException { ArrayList table = new ArrayList(); // 転送データ ＜中略＞ req.setAttribute("table", table); req.getRequestDispatcher("jsp/view.jsp").forward(req, res); 
```

 上記のServletコード上のtableという変数をview.jspに渡したす場合、HttpServletRequest #setAttributeで変数を登録し、getRequestDispatcherとforwardでリクエストをフォワードする。 JSP側で登録した変数を取り出すには、下記のコードを用いる。 

```java
 <% ArrayList table = (ArrayList)request.getAttribute("table"); %> 
```


