---
title: 'Python: Microsoft Wordファイル(*.doc)のテキストデータ抽出 - pywin32, win32com'
date: 2014-09-08
authors: [yukun]
tags:
  - file
  - office
  - python
  - windows
slug: python-win32com-word-text
---

Microsoft Office Wordファイルの検索クローラをPythonで作成する際、表題の通り、\*.docからテキストデータに変換する必要がある。本記事では[win32comライブラリ](/blog/python-win32com-module-install "Python: win32comモジュールのインストール方法")を用いてPythonスクリプトからWordファイルのテキストデータを抽出するスクリプトを紹介する。 (尚、世には多数のOfficeファイルコンバーターが有るので、このソースを使うことが最適とは限らない) 
<!-- truncate -->


### ソースコード

エラーハンドリングは必要最低限である為、扱うファイル特性に応じて追加が必要な場合もある。 

```python
 # coding: Shift_JIS import win32com.client def word2text(file_path): text = "" doc = win32com.client.gencache.EnsureDispatch("Word.Application") doc.Visible = False # アプリで開かない doc.DisplayAlerts = False # 警告OFF try: doc_file = doc.Documents.Open(file_path, False, True) # 変換ダイアログ非表示、読み取り専用で開く for s in doc_file.Sentences: text += str.rstrip(str(s)) + "\n" doc_file.Close() finally: doc.Quit() return text def main(): print word2text('C:\サンプル\python_win32com.doc') if __name__ == '__main__': main() 
```


### テスト対象ファイル

[検証用サンプルファイル(doc)](pathname:///files/python_win32com.doc) ※対象ファイルは当方でウィルスチェックしたものをアップロードしているが、不安な方は自前でサンプルを用意すると良い。(基本Webにある物は疑ってかかるのが良い)

### 実行環境

Windows7 (32bit), Python2.7.7, pywin32 219, Office 2003

### 実行結果

```
Word
わーど

```

### 参考サイト

- [Documents.Open メソッド (Microsoft.Office.Interop.Word)](http://msdn.microsoft.com/ja-jp/library/microsoft.office.interop.word.documents.open\(v=office.11\).aspx)
