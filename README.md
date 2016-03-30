# agqr-recorder
A streaming recorder from www.agqr.jp for node.js

インスパイア元: [https://gist.github.com/ybenjo/9904543](https://gist.github.com/ybenjo/9904543)

## 必要なもの
- rtmpdump

## インストール
```
$ npm install
$ npm run build
```

## 録画予約
`schedule.json`を編集する。

## 起動
cronで毎29/59分に起動する。

```
$ npm start
```

## TODO
- mp3を作る
- Dropboxに生成物を送る
