source ../privateconf/set.conf

#初期ファイルを退避
mv  ../img/* ../resold/img/
mv  ../text/* ../resold/text/
mv  ../js/ScreenSettings.js ../resold/js/

#カスタマイズ済みファイルを各ディレクトリにコピー
cp -p $localimages/* ../img/
cp -p $localsetting ../js/
cp -p $localcsvs/* ../text/
