---
title: 'Python: Beautiful Soupのインストール - Mac OS編'
date: 2012-10-08
authors: [yukun]
tags:
  - mac
  - python
  - setting
slug: python-beautifulsoup-install-mac
---

インストール方法自体は配布元に記載の方法で実施。

### 参考サイト

1. [Beautiful Soup: We called him Tortoise because he taught us.](https://www.crummy.com/software/BeautifulSoup/)
2. [Beautiful Soup Documentation — Beautiful Soup 4.0.0 documentation](http://www.crummy.com/software/BeautifulSoup/bs4/doc/)

> The current release is Beautiful Soup 4.1.3 (August 20, 2012). You can install it with pip install beautifulsoup4 or easy\_install beautifulsoup4. It's also available as the python-beautifulsoup4 package in recent versions of Debian and Ubuntu.


<!-- truncate -->


### インストール方法


```bash
$ sudo easy_install beautifulsoup4
Password:
Searching for beautifulsoup4
Reading https://pypi.org/simple/beautifulsoup4/
Reading http://www.crummy.com/software/BeautifulSoup/bs4/
Reading http://www.crummy.com/software/BeautifulSoup/bs4/download/
Best match: beautifulsoup4 4.1.3
Downloading 
Processing beautifulsoup4-4.1.3.tar.gz
Running beautifulsoup4-4.1.3/setup.py -q bdist_egg --dist-dir /tmp/easy_install-vQ3gxL/beautifulsoup4-4.1.3/egg-dist-tmp-QEs1O5
zip_safe flag not set; analyzing archive contents...
Adding beautifulsoup4 4.1.3 to easy-install.pth file
Installed /Library/Python/2.7/site-packages/beautifulsoup4-4.1.3-py2.7.egg
Processing dependencies for beautifulsoup4
Finished processing dependencies for beautifulsoup4
$
```

 このインストール方法を用いた場合は、下記のディレクトリにインストールされ、サーチパスリスト(sys.path)にも追加される。 `/Library/Python/2.7/site-packages/beautifulsoup4-4.1.3-py2.7.egg` 

```python
>>> import sys
>>> print sys.path
['', '/Library/Python/2.7/site-packages/beautifulsoup4-4.1.3-py2.7.egg',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python27.zip',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-darwin',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac/lib-scriptpackages',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-tk',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-old',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload',
'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages',
'/Library/Python/2.7/site-packages']
```


### 使用方法


```python
 >>> from urllib import urlopen >>> from bs4 import BeautifulSoup >>> soup = BeautifulSoup(urlopen('http://www.yukun.info')) >>> print soup.title Yukun's Blog >>> print soup.title.name title >>> print soup.title.string Yukun's Blog >>> for link in soup.find_all('a'): ... print(link.get('href')) ... https://yukun.info/ #content https://yukun.info/ http://www.yukun.info/about

https://yukun.info/sitemap/ ... 
```


