# インフラ構築
環境：centos7系でOSインストール済み
## 手動設定
- 固定IP設定
```
nic=XXX 
nmcli connection modify $nic ipv4.addresses "XXX.XXX.XXX.XXX/XX" ipv4.method manual
nmcli connection modify $nic ipv4.gateway "XXX.XXX.XXX.XXX"
nmcli connection modify $nic ipv4.dns "XXX.XXX.XXX.XXX"
nmcli connection modify $nic connection.autoconnect yes
systemctl restart network
```

- 公開鍵設定
```
#クライアントPCにて作成※対話モードはすべてEnter押下
ssh-keygen -t rsa
#サーバへ公開鍵設置
scp ~/.ssh/id_rsa.pub root@XXX.XXX.XXX.XXX:/root/
#サーバ側で設定
mkdir /root/.ssh/
chmod 700 /root/.ssh/
mv /root/id_rsa.pub /root/.ssh/
mv /root/.ssh/id_rsa.pub /root/.ssh/authorized_keys
```

## 自動スクリプト実行
- 対象のサーバの/root配下にprivateconfフォルダとserverフォルダを置く
```
scp -r server root@XXX.XXX.XXX.XXX:/root/
scp -r privateconf root@XXX.XXX.XXX.XXX:/root/server
```

- rootユーザでログインし、権限変更とシェル実行のカレントディレクトリを変更する
```
chmod -R 700 /root/server/*
cd /root/server/script/
```
- 開発環境構築の場合
```
./1_OSinit.sh dev
./2_MWinit.sh dev
```
- ステージング環境構築の場合
```
./1_OSinit.sh staging
./2_MWinit.sh staging
```
- 本番環境構築の場合
```
./1_OSinit.sh prod
./2_MWinit.sh prod
```

- スクリプトを削除する
```
rm -fR /root/server
```
- ソースをデプロイ※developmentを参照

