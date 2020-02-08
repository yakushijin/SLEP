
# 開発環境構築
### 前提
- node.js（npm）
- vscode
- git
- bash

①プロジェクトフォルダへ移動
```
cd [格納フォルダ]/portfolio
```
②package.jsonを作成
```
npm init
```
③babelをインストール、設定
```
npm install --save-dev babel-cli
npm install --save-dev babel-preset-es2015
echo "{ \"presets\": [\"es2015\"] }" > .babelrc
```

# ビルド
```
cd sh 
./build.sh
```
# デプロイ
```
#対象サーバにログインし以下を実行する
deploy.sh
```
# リリース
- ビルド、デプロイを環境ごとにすべて自動で実施する
- 事前に以下ファイルに環境ごとのサーバの情報を入力しておく
```
privateconf/set.conf
```
- 開発環境リリースの場合
```
cd sh 
./release.sh dev
```
- ステージング環境リリースの場合
```
cd sh 
./release.sh staging
```
- 本番環境リリースの場合
```
cd sh 
./release.sh prod
```
