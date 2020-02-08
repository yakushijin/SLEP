echo "start"

#リリース対象判定
source ../privateconf/set.sh
setconf ${1}

#ビルド実行
./build.sh
echo "buidlDone"

sleep 1

#ビルド済み圧縮ファイルとデプロイ用シェルをサーバへ送信
scp -P $hostSshPort -i $sshKey ../compile_src/compile_src.tar.gz root@$hostIp:/root/
sleep 1
scp -P $hostSshPort -i $sshKey deploy.sh root@$hostIp:/root/
echo "scpDone"

sleep 1

#デプロイ実行
ssh -p $hostSshPort -i $sshKey root@$hostIp "chmod 700 /root/deploy.sh;/root/deploy.sh"
echo "deployDone"
