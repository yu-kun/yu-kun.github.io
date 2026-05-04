---
title: 'Java, JSP: 現在時刻が指定期間内か判定する - GregorianCalendar#before、after'
date: 2009-02-23
authors: [yukun]
tags:
  - date
  - html
  - java
  - jsp
slug: java-jsp-gregoriancalendar-period
---

日時を扱うクラスはDateとGregorianCalendarがありますが、Sunは後者を推奨しているようです。実際GregorianCalendarのほうが扱いやすいです。下のサンプルは、現在時刻が指定した期間内か否かを判定するものです。

## ソースコード


```java
 <%@page contentType="text/html" pageEncoding="UTF-8"%> <%@page import="java.util.*" %> <%! final int MONTH_OFFSET = 1; String showTime(Calendar cal) { String str; str = cal.get(Calendar.YEAR) + "/" + (cal.get(Calendar.MONTH) + MONTH_OFFSET) + "/" + cal.get(Calendar.DATE) + " " + cal.get(Calendar.HOUR) + ":" + cal.get(Calendar.MINUTE); return str; } boolean isPeriod(Calendar start, Calendar end) { Calendar cur = Calendar.getInstance(); return cur.after(start) && cur.before(end); } %>  JSP Date Comparison

# JSP Date Comparison

<% // (year, month, date, hour, minute) monthの範囲は0-11で1月は0 Calendar startTime = new GregorianCalendar(2009, 2 - MONTH_OFFSET, 23, 21, 0); Calendar endTime = new GregorianCalendar(2009, 2 - MONTH_OFFSET, 23, 21, 10); out.println("開始時刻: " + showTime(startTime) + "  
"); out.println("終了時刻: " + showTime(endTime) + "  
"); if (isPeriod(startTime, endTime)) { out.println("現時刻は指定期間「内」"); } else { out.println("現時刻は指定期間「外」"); } %> 
```

 日時の比較はGregorianCalendar#after、beforeメソッド以外にint compareTo(Calendar cal)等もあります。 実際に使う際、期間を指定するGregorianCalendarのコンストラクタの引数データは他の入力から受け取るようにします。

## 実行結果例

本日の21:05に計ると…

```
JSP Date Comparison
開始時刻: 2009/2/23 9:0
終了時刻: 2009/2/23 9:10
現時刻は指定期間「内」

```

## 追記: SimpleDateFormatによる出力の整形

d\_kamiさんに改良していただきました。ありがとうございます(^-^)

> String showTime(Calendar cal) { Date date = cal.getTime(); SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm"); return format.format(date); } と書けばすっきりするよ、import java.text.SimpleDateFormatを忘れずに - [SimpleDateFormat - マイペースなプログラミング日記](http://d.hatena.ne.jp/d-kami/20090223/1235400686 "SimpleDateFormat - マイペースなプログラミング日記")

showTimeを修正して計りなおした実行結果は、

```
開始時刻: 2009/02/23 21:00
終了時刻: 2009/02/24 21:10
現時刻は指定期間「内」

```

確かに出力はyyyy/MM/dd HH:mmの形式になっていて見栄えも良いです。

### 参考サイト

- [GregorianCalendar (Java 2 Platform SE 5.0)](http://docs.oracle.com/javase/jp/6/api/java/util/GregorianCalendar.html "GregorianCalendar (Java 2 Platform SE 5.0)")
- [SimpleDateFormat (Java 2 Platform SE 5.0)](http://docs.oracle.com/javase/jp/6/api/java/text/SimpleDateFormat.html "SimpleDateFormat (Java 2 Platform SE 5.0)")
