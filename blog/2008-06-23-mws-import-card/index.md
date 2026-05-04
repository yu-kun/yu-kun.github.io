---
title: 'Magic Workstation にインポートするオリジナルカードの作成スクリプト'
date: 2008-06-23
authors: [yukun]
tags:
  - game
  - magic
  - module
  - mws
  - python
slug: mws-import-card
---

[Magic Workstation](http://www.magicworkstation.com/)(MWS)という対戦カードゲーム[Magic: The Gathering](https://mtg-jp.com/)が出来るソフトがありますが、その機能の一つにオリジナルカードのインポート機能があります。カードの作成方法はテキストファイルに規定の書式で書いていけばいいのですが、自動化できるところがありましたので、即席ですがスクリプトを書いてみました。

[SpoilerMaker.py](pathname:///files/SpoilerMaker.py_.zip)


<!-- truncate -->


### 使い方

コマンドラインの第1引数に後述に説明する書式で作成したファイル名、第2引数に変換した(MWS規定の書式)ファイルを書き込むファイル名を指定してください。

#### 使用例

```
$ python SpoilerMaker.py sample_cards.txt converted_cards.txt
ファイル"sample_cards.txt"を読み込みます。
変換処理中...
変換処理が完了しました。
ファイル"converted_cards.txt"に変換データを保存しました。

```

### 機能

具体例を以って示しますと、以下のような書式のファイルをMWSの規定に合わせた書式に書き直します。

#### 読み込むファイル(作成するもの) sample\_cards.txt

```
CN Apothecary Initiate
CC W
MC W
TC Creature - Kithkin Cleric
PT 1/1
CT Whenever a player plays a white spell you may pay %1. If you do, you gain 1 life.
FT
AT
RA C
CA 1/3
CN Armored Ascension
CC W
MC 3W
TC Enchantment - Aura
PT
CT Enchant creature  Enchanted creature gets +1/+1 for each Plains you control and has flying.
FT
AT
RA U
CA 2/3
CN Ballynock Cohort
CC W
MC 2W
TC Creature - Kithkin Soldier
PT 2/2
CT First strike  Ballynock Cohort gets +1/+1 as long as you control another white creature.
FT A kithkin's worst enemy is solitude
AT Jesper Ejsing
RA C
CA 3/3

```

1枚のカードは空行で区切ります。行頭にCN, CC, MC, TC, PT, CT, FT, AT, RA, CAを書き、小スペースをあけて該当する属性を書きます。省略した項目は自動的に追加され、その項目の属性値は空文字で置換されます。ただし、カードナンバー(Card #:の欄に書くもの)は自動的に計算されたものが書き込まれます。

#### 書き出すファイル書式(MWSデフォルト規定)

注:Webページ用に一部のタブ文字の数を調整しました。

```
Card Name:	Apothecary Initiate
Card Color:	W
Mana Cost:	W
Type & Class:	Creature - Kithkin Cleric
Pow/Tou:	1/1
Card Text:	Whenever a player plays a white spell you may pay %1. If you do, you gain 1 life.
Flavor Text:
Artist:
Rarity:	C
Card #:	1/3
Card Name:	Armored Ascension
Card Color:	W
Mana Cost:	3W
Type & Class:	Enchantment - Aura
Pow/Tou:
Card Text:	Enchant creature  Enchanted creature gets +1/+1 for each Plains you control and has flying.
Flavor Text:
Artist:
Rarity:	U
Card #:	2/3
Card Name:	Ballynock Cohort
Card Color:	W
Mana Cost:	2W
Type & Class:	Creature - Kithkin Soldier
Pow/Tou:	2/2
Card Text:	First strike  Ballynock Cohort gets +1/+1 as long as you control another white creature.
Flavor Text:	A kithkin's worst enemy is solitude
Artist:	Jesper Ejsing
Rarity:	C
Card #:	3/3

```

#### カード1枚のテンプレート

```
CN
CC
MC
TC
PT
CT
FT
AT
RA
CA

```

### スクリプトを使用する利点

1. 各項目が"CA"(Card Name項目)など2文字なので、打ち込みや修正が簡単。同時に、各項目の列が揃うので見栄えも良く管理しやすいかも。MWS側でも項目名は変更できますけれどね。
2. カードナンバー(Card #:の欄に書くもの)を自動的に計算してくれます。読み込みファイルのナンバーが正しくなくてもOKです。カードを任意の場所に挿入できて管理が楽かも。

実装したい機能等がありましたらコメントやブクマコメント等で気軽にどうぞ。 一応コードを表示しておきます。


```python
# coding: Shift_JIS
"""
Magic Work Station の Spoiler List 作成スクリプト
author  : Yukun
Edit    : 2008/6/23
GPLv2
"""
import sys
version = '0.1'
err_inv = 'SpoilerMaker\'s Error: Nonexistent key'
err_non = 'Nothing'
success = 'Normal'
class MagicCard:
    CN = 'Card Name:\t'
    CC = 'Card Color:\t'
    MC = 'Mana Cost:\t'
    TC = 'Type & Class:\t'
    PT = 'Pow/Tou:\t'
    CT = 'Card Text:\t'
    FT = 'Flavor Text:\t'
    AT = 'Artist:\t\t'
    RA = 'Rarity:\t\t'
    CA = 'Card #:\t\t'
    def __init__(self):
        self.flag = 0
        self.attr = [{'CN':MagicCard.CN},
                    {'CC':MagicCard.CC},
                    {'MC':MagicCard.MC},
                    {'TC':MagicCard.TC},
                    {'PT':MagicCard.PT},
                    {'CT':MagicCard.CT},
                    {'FT':MagicCard.FT},
                    {'AT':MagicCard.AT},
                    {'RA':MagicCard.RA},
                    {'CA':MagicCard.CA},
                    ]
    def set_attr(self, key, value):
        attr = self.attr
        for i in range(len(attr)):
            if (attr[i].get(key, err_non) != err_non):
                attr[i][key] = attr[i][key]+value
                self.flag = 1
                self.attr = attr
                return success
        return err_inv
    def __str__(self):
        attr = self.attr
        str = ''
        for i in range(len(attr)):
            for (k, v) in attr[i].items():
                str += '%s :: %s\n' % (k, v)
        return str
class SpoilerMaker:
    def __init__(self):
        self.cards = []
        self.card_num = 0
        self.line_num = 0
    def read(self, filename):
        f = open(filename)
        x = f.read()
        f.close()
        lines = x.split('\n')
        cards = self.cards
        card = MagicCard()
        card_num = self.card_num
        line_num = self.line_num
        for line in lines:
            line_num +=1
            if (line == ''):
                if (card.flag != 0):
                    cards.append(card)
                    card_num += 1
                    card = MagicCard()
            else:
                kv = line.split(' ', 1)
                if (len(kv) != 2):
                    print '  %d行目でエラーです。書式を確認してください。' % line_num
                    print '  処理を中断し、終了します。'
                    exit(1)
                s = card.set_attr(kv[0], kv[1])
                if (s != success):
                    print '  %d行目でエラーです。書式を確認してください。' % line_num
                    print '  %s :: \'%s\' at line %d' % (s, kv[0], line_num)
        self.card_num = card_num
        self.line_num = line_num
        self.cards = cards
    def write(self, filename):
        g = open(filename, 'w')
        cards = self.cards
        for i in range(len(cards)):
            attr = cards[i].attr
            for j in range(len(attr)):
                if (j == 9):
                    attr[j]['CA'] = '%s%d/%d' % (MagicCard.CA, i+1, self.card_num)
                g.write('%s\n' % attr[j].values()[0])
            g.write('\n')
        g.close()
    def __str__(self):
        cards = self.cards
        str = ''
        for i in range(len(cards)):
            attr = cards[i].attr
            for j in range(len(attr)):
                str += '%s\n' % attr[j].values()[0]
            str += '\n'
        return str
def _main():
    argv_list = sys.argv
    readfile  = argv_list[1]
    writefile = argv_list[2]
    s = SpoilerMaker()
    print 'ファイル\"%s\"を読み込みます。' % readfile
    print '変換処理中...'
    s.read(readfile)
    print '変換処理が完了しました。'
    s.write(writefile)
    print 'ファイル\"%s\"に変換データを保存しました。' % writefile
if __name__ == '__main__': _main()
```


