#ビルドディレクトリクリア
rm -fR ../compile_src/*
mkdir ../compile_src/js
mkdir ../compile_src/css
mkdir ../compile_src/html

cd ../

#es6→es5変換
for i in `ls js/*.js`; do node_modules/.bin/babel ${i} -o compile_src/${i} ; echo ${i} ; done 

#ソース圧縮
for i in `ls compile_src/js/*.js`; do sed -e 's/^ *\/\/.*/ /g' ${i} | sed -z 's/\n/ /g' | sed -e 's/ \+/ /g' | sed -e 's/\/\*[^\*\/]*\*\///g' > ${i} ; done 
for i in `ls css/*.css`; do sed -z 's/\n/ /g' ${i} | sed -e 's/ \+/ /g' | sed -e 's/\/\*[^\*\/]*\*\///g' > compile_src/${i} ; done 
for i in `ls html/*.html`; do sed -z 's/\n/ /g' ${i} | sed -e 's/ \+/ /g' > compile_src/${i} ; done 

cd compile_src

#その他ファイルをコピーし圧縮
cp -pr ../img .
cp -pr ../text .
cp -pr ../lib .
tar zcf compile_src.tar.gz ./* 

touch .gitkeep