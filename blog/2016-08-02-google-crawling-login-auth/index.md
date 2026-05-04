---
title: 'Python+PhantomJS: Google ログインを伴うweb crawlingでのアカウント設定'
date: 2016-08-02
authors: [yukun]
tags:
  - google
  - python
slug: google-crawling-login-auth
---

先日、ゲームIngressのcommと言うプレーヤーのアクティビティログを、PhantomJSモジュールを使用して取得しようとしたところ、メールアドレスとパスワードでログインできない事象が発生したので、対処法を備忘録として記載する。 
<!-- truncate -->


### 使用したPythonサンプルコード

説明の簡略化の為に、import文など省いている。 

```python
 login_url = "https://www.ingress.com/intel?ll=35.663091,139.735247" GOOGLE_USER = os.environ['GOOGLE_USER'] GOOGLE_PASS = os.environ['GOOGLE_PASS'] driver = webdriver.PhantomJS(executable_path='/usr/local/bin/phantomjs') driver.get(login_url) driver.find_element_by_link_text('Sign in').click() WebDriverWait(driver, 10).until( expected_conditions.visibility_of_element_located((By.ID, 'Email')) ) idTextBox = driver.find_element_by_id('Email') idTextBox.send_keys(GOOGLE_USER) nextButton = driver.find_element_by_id('next') nextButton.click() WebDriverWait(driver, 10).until( expected_conditions.visibility_of_element_located((By.ID, 'Passwd')) ) driver.find_element_by_id('Passwd').send_keys(GOOGLE_PASS) driver.find_element_by_id('signIn').click() capture() # 画面キャプチャを取得する関数(ここでは内容割愛) 
```


### 発生事象

driver.find\_element\_by\_id('signIn').click()ステップ後にアカウント再設定用のメールアドレス及び電話番号による追加認証画面に遷移して、Intel Mapページに遷移しない。

### 原因

普段使用していないブラウザ(PhantomJSのエミュレーションでセッション情報をなにも保持していない)からのアクセスで、追加認証情報を登録していた為。

### 解決方法

一番手間がかかるのは、当該追加認証画面へ遷移する場合を見越して、追加認証を処理するロジックを実装する手法。 対して、手っ取り早いのは、追加認証用のメールアドレス及び電話番号をGoogleのアカウント設定画面から削除すること。勿論、この変更に伴い、セキュリティは低下するので当該アカウントにメール等の重要なデータを紐付けしておかないことをお勧めする。
