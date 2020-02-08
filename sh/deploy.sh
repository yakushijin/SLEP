#ウェブディレクトリ初期化
rm -fR /var/www/*

cd /var/www/

#ビルド済み圧縮ファイルを解凍
tar zxf /root/compile_src.tar.gz .

#権限設定
chown -R nginx:nginx /var/www/
chmod -R 755 /var/www/

#nginx再起動
systemctl restart nginx

#ビルド済み圧縮ファイルを削除
rm -f /root/compile_src.tar.gz