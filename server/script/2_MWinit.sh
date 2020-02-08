source ../privateconf/set.sh
setconf ${1}

#インストール
echo "[nginx]" >> /etc/yum.repos.d/nginx.repo
echo "name=nginx repo" >> /etc/yum.repos.d/nginx.repo
echo "baseurl=http://nginx.org/packages/centos/7/\$basearch/" >> /etc/yum.repos.d/nginx.repo
echo "gpgcheck=0" >> /etc/yum.repos.d/nginx.repo
echo "enabled=1" >> /etc/yum.repos.d/nginx.repo

yum install -y nginx

#自動起動
systemctl enable nginx.service

#conf設定
mkdir /var/www
rm -f /etc/nginx/conf.d/default.conf
cp -p /root/server/conf/web.conf /etc/nginx/conf.d/
mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf_old
cp -p /root/server/conf/nginx.conf /etc/nginx/

#ssl設定※一旦オレオレ証明書を設定する
mkdir -p /etc/nginx/ssl
chmod 700 /etc/nginx/ssl
cd /etc/nginx/ssl
openssl genrsa -out cert.key 2048
openssl req -subj '/CN=common_name.example.com/O=ORGANIZATION/C=JP' -new -key cert.key > cert.csr
openssl x509 -in cert.csr -days 3650 -req -signkey cert.key > cert.crt

systemctl restart nginx

#ssl設定※ドメインの登録をしている場合のみ実行する
#mkdir -p /etc/nginx/temp
#cd /usr/local
#git clone https://github.com/certbot/certbot
#/usr/local/certbot/certbot-auto certonly --webroot -w /etc/nginx/temp -d $domain -m $mymailaddress --agree-tos -n
#sed -i -e "s/\/etc\/nginx\/ssl\/cert.crt/\/etc\/letsencrypt\/live\/$domain\/cert.pem/g" /etc/nginx/conf.d/web.conf
#sed -i -e "s/\/etc\/nginx\/ssl\/cert.key/\/etc\/letsencrypt\/live\/$domain\/privkey.pem/g" /etc/nginx/conf.d/web.conf
#rm -fR /etc/nginx/ssl
#systemctl restart nginx

