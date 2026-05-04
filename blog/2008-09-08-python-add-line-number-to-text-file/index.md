---
title: 'Python: テキストファイルの行頭に行番号を追加'
date: 2008-09-08
authors: [yukun]
tags:
  - command
  - file
  - module
  - python
  - read
  - write
slug: python-add-line-number-to-text-file
---

コマンドラインで指定されたテキストファイルの行頭に行番号を追加し、そのデータを新たなファイルに書き出すスクリプトです。

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
import sys
argvs = sys.argv
argc = len(argvs)
if (argc != 3):
    print 'Usage: $ python %s target_file making_file' % argvs[0]
    quit()
f = open(argvs[1])
lines2 = f.readlines()
f.close()
nf = open(argvs[2], 'w')
i = 1
for line in lines2:
    nf.write('%3d: %s' % (i, line))
    i = i + 1
nf.close()
```

 仮にこのソースコードをfile05a.pyというファイルで保存した場合、使用する際はプロンプトに以下のように打ち込みます。

### 実行結果

#### プロンプト

```
> python file05a.py file05a.py file05a-l.txt

```

この結果、生成されたファイルが下記になります。

#### file05a-l.txt

```
  1: #!/usr/bin/python
  2: # coding: UTF-8
  3:
  4: import sys
  5:
  6: argvs = sys.argv
  7: argc = len(argvs)
  8: if (argc != 3):
  9:     print 'Usage: $ python %s target_file making_file' % argvs[0]
 10:     quit()
 11: f = open(argvs[1])
 12: lines2 = f.readlines()
 13: f.close()
 14: nf = open(argvs[2], 'w')
 15: i = 1
 16: for line in lines2:
 17:     nf.write('%3d: %s' % (i, line))
 18:     i = i + 1
 19: nf.close()

```
