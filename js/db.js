/*============================================================================================================
クライアントDB（indexedDB）関連処理
============================================================================================================*/

//--------------------<初回DB作成、テーブル作成、データ取り込み処理>--------------------
function dbInit() {
  //DB初期化
  dbDelete();
  //初回DB作成
  dbOpen().onupgradeneeded = function () {
    let db = event.target.result;
    //カテゴリテーブル作成、データ取り込み
    db.createObjectStore(categoryname, { keyPath: 'categoryid' });
    dataNewAdd(categoryname);
    //技術テーブル作成、データ取り込み
    db.createObjectStore(techitemlistname, { keyPath: 'itemid' });
    dataNewAdd(techitemlistname);
    //PJテーブル作成、データ取り込み
    db.createObjectStore(pjitemlistname, { keyPath: 'itemid' });
    dataNewAdd(pjitemlistname);
    //役割テーブルの作成、データ取り込み
    db.createObjectStore(rolelistname, { keyPath: 'roleid' });
    dataNewAdd(rolelistname);
    //範囲テーブルの作成、データ取り込み
    db.createObjectStore(rangelistname, { keyPath: 'rangeid' });
    dataNewAdd(rangelistname);
    //PJと技術のマッピングテーブル作成、データ取り込み
    db.createObjectStore(pjtechmapname, { keyPath: 'id', autoIncrement: true });
    dataNewAdd(pjtechmapname);
    //PJと役割のマッピングテーブル作成、データ取り込み
    db.createObjectStore(pjrolemapname, { keyPath: 'id', autoIncrement: true });
    dataNewAdd(pjrolemapname);
    //技術と範囲のマッピングテーブル作成、データ取り込み
    db.createObjectStore(techrangemapname, { keyPath: 'id', autoIncrement: true });
    dataNewAdd(techrangemapname);
  };
  dbOpen().onerror = function () { };
  dbOpen().onsuccess = function () { };
};
//--------------------------------------------------------------------------------

//--------------------<各データ取り込み、作成処理>--------------------
function dataNewAdd(tablename) {
  //csvファイルを読み込み
  $.get(csvdir + tablename + '.csv', function (csvdata) {
    let arraydata = $.csv.toArrays(csvdata);
    //配列の値を連想配列としてDBに登録する
    dbOpen().onsuccess = function () {
      let table = writeTransaction(event.target.result, tablename).objectStore(tablename);
      switch (tablename) {
        //カテゴリテーブル
        case categoryname:
          $(arraydata).each(function (index, value) {
            var insertdata = {
              categoryid: value[0],
              category1: value[1],
              category2: value[2],
              categoryname: value[3]
            };
            successOrError(table.put(insertdata));
          });
          break;
        //技術テーブル
        case techitemlistname:
          $(arraydata).each(function (index, value) {
            var insertdata = {
              itemid: value[0],
              category: value[1],
              name: value[2],
              side: value[3],
              vertical: value[4],
              techuse: value[5]
            };
            successOrError(table.put(insertdata));
          });
          break;
        //PJテーブル
        case pjitemlistname:
          $(arraydata).each(function (index, value) {
            var insertdata = {
              itemid: value[0],
              category: value[1],
              name: value[2],
              side: value[3],
              vertical: value[4],
              business: value[5],
              years: value[6],
              pjdesc: value[7]
            };
            successOrError(table.put(insertdata));
          });
          break;
        //役割テーブル
        case rolelistname:
          $(arraydata).each(function (index, value) {
            var insertdata = {
              roleid: value[0],
              rolename: value[1]
            };
            successOrError(table.put(insertdata));
          });
          break;
        //範囲テーブル
        case rangelistname:
          $(arraydata).each(function (index, value) {
            var insertdata = {
              rangeid: value[0],
              rangename: value[1]
            };
            successOrError(table.put(insertdata));
          });
          break;
        //PJと技術のマッピングテーブル
        case pjtechmapname:
          $(arraydata).each(function (index, value) {
            var insertdata = {
              pjid: value[0],
              techid: value[1]
            };
            successOrError(table.put(insertdata));
          });
          break;
        //PJと役割のマッピングテーブル
        case pjrolemapname:
          $(arraydata).each(function (index, value) {
            var insertdata = {
              pjid: value[0],
              roleid: value[1]
            };
            successOrError(table.put(insertdata));
          });
          break;
        //技術と範囲のマッピングテーブル
        case techrangemapname:
          $(arraydata).each(function (index, value) {
            var insertdata = {
              techid: value[0],
              rangeid: value[1]
            };
            successOrError(table.put(insertdata));
          });
          break;

        default:
      };
    };
    dbOpen().onerror = function () { };
  });
};
//-----------------------------------------------------------------------

//--------------------<DB汎用共通処理>--------------------
//DBオープン
function dbOpen() {
  return indexedDB.open("store", 1);
};

//DB削除
function dbDelete() {
  indexedDB.deleteDatabase("store");
};

//書き込み用トランザクション実行
function writeTransaction(db, table) {
  return db.transaction(table, "readwrite");
};

//読み込み用トランザクション実行
function readTransaction(db, table) {
  return db.transaction(table, "readonly");
};

//汎用実行成否
function successOrError(request) {
  request.onsuccess = function () { };
  request.onerror = function () { };
};
//----------------------------------------------------------