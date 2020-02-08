#各ディレクトリのファイルを削除
rm -fR ../img/*
rm -f ../js/ScreenSettings.js
rm -fR ../text/*

#退避済みファイルを各ディレクトリに戻す
mv ../resold/img/* ../img/
mv ../resold/text/* ../text/ 
mv ../resold/js/ScreenSettings.js  ../js/
