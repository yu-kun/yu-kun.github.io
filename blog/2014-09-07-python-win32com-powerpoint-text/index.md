---
title: 'Python: Microsoft PowerPointファイル(*.ppt)のテキストデータ抽出 - pywin32, win32com'
date: 2014-09-07
authors: [yukun]
tags:
  - file
  - office
  - python
  - windows
slug: python-win32com-powerpoint-text
---

Microsoft Office PowerPointファイルの検索クローラをPythonで作成する際、表題の通り、\*.pptからテキストデータに変換する必要がある。本記事では[win32comライブラリ](/blog/python-win32com-module-install "Python: win32comモジュールのインストール方法")を用いてPythonスクリプトからスライド中の各シェイプボックスからテキストデータを抽出するスクリプトを紹介する。 (尚、世には多数のOfficeファイルコンバーターが有るので、このソースを使うことが最適とは限らない) 
<!-- truncate -->


### ソースコード

エラーハンドリングは必要最低限である為、扱うファイル特性に応じて追加が必要な場合もある。 

```python
 # coding: Shift_JIS import win32com.client def powerpoint2text(file_path): text = "" ppt = win32com.client.gencache.EnsureDispatch("PowerPoint.Application") ppt.Visible = True # アプリが開く(0, Falseにするとエラー on Python2.7, Windows7, Office2003) ppt.DisplayAlerts = False # 警告OFF try: ppt_file = ppt.Presentations.Open(file_path, True) # 読み取り専用で開く slide_count = len(ppt_file.Slides) + 1 for i in range(1, slide_count): slides = ppt_file.Slides(i) shape_num = slides.Shapes.Count + 1 for j in range(1, shape_num): try: text += slides.Shapes(j).TextFrame.TextRange.Text + " " except: pass text += '\n' ppt_file.Close() finally: ppt.Quit() return text def main(): print powerpoint2text('C:\サンプル\python_win32com.ppt') if __name__ == '__main__': main() 
```

 後述の結果を見て分かるとおり、テキストデータの保持構成は以下の通り。

```
＜1スライド目1シェイプ目＞ ＜1スライド目2シェイプ目＞･･･＜1スライド目nシェイプ目＞
＜2スライド目1シェイプ目＞ ＜2スライド目2シェイプ目＞･･･＜2スライド目nシェイプ目＞
・・・
＜mスライド目1シェイプ目＞ ＜mスライド目2シェイプ目＞･･･＜mスライド目nシェイプ目＞

```

### テスト対象ファイル

[検証用サンプルファイル(ppt)](pathname:///files/python_win32com.ppt) ※対象ファイルは当方でウィルスチェックしたものをアップロードしているが、不安な方は自前でサンプルを用意すると良い。(基本Webにある物は疑ってかかるのが良い)

### 実行環境

Windows7 (32bit), Python2.7.7, pywin32 219, Office 2003

### 実行結果

実行時にPowerPointも立ち上がり、処理後、終了する。

```
C:\Python27\python.exe C:/Users/xxx/PycharmProjects/elastic/crawler.py
１スライド目（タイトル） ２つ目のボックスYukun’s Blog
２スライド目 Python でぱわぽをそうさするには？
３スライド目 公式ドキュメントをよく読もう！

```

### 参考サイト

- [Presentations.Open メソッド (PowerPoint)](http://msdn.microsoft.com/ja-jp/library/office/ff746171\(v=office.15\).aspx)
- [ms office - PowerPoint presentation slide count from Python? - Stack Overflow](http://stackoverflow.com/questions/17050211/powerpoint-presentation-slide-count-from-python)
