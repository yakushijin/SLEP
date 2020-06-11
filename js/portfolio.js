/*============================================================================================================
画面構成作成関連処理
============================================================================================================*/
//各設定値の反映処理
$(window).on('load', function () {
  var pageobj = new PageObj();
  LoadOn();
  dbInit();
  //dbの読み込み前に各処理を実行するとエラーになる為少し待ってから後続処理を実施する
  $('#template').delay(2000).queue(function () {
    headerDisp();
    categoryDisp(pageobj);
    tableSizeInit(pageobj);
    textDisp(pageobj);
    textchange(pageobj);
    descchange(pageobj);
    colorchange(pageobj);
    LoadOff();
    eventsInit();
  });
});

//イベント処理の初期化
function eventsInit() {
  //セレクトボックスのカテゴリ選択変更時の処理
  $('#categoryselect').change(function () {
    var pageobj = new PageObj();
    $('*[name=textlist]').remove();
    itemInit();
    pageobj.categoryselect = $('option:selected').val();
    textDisp(pageobj);
  });

  //トップページ
  $('#topButton').on('click', function () {
    window.location.href = toplink;
  });
  //技術ページ
  $('#techButton').on('click', function () {
    window.location.href = techlink;
  });
  //PJページ
  $('#pjButton').on('click', function () {
    window.location.href = pjlink;
  });
};

//表の大きさ設定
function tableSizeInit(pageobj) {
  var smartphone = 500;
  var cssstring = "";
  var v_linesize = "";
  var s_linesize = "";
  //スマホかPCかを判定
  if (window.innerWidth < smartphone) {
    cssstring = "Small";
    v_linesize = "308";
    s_linesize = "160";
  } else {
    cssstring = "Big";
    v_linesize = "995";
    s_linesize = "500";
  }
  //各CSSを設定
  $(".textDispBack").addClass('textDispBack' + cssstring);
  $(".verticalTableLine").addClass('verticalTableLine' + cssstring);
  $('.verticalTableLine').css('border-right', 'solid ' + v_linesize + 'px ' + pageobj.tablebackcolor);
  $(".sideTableLine").addClass('sideTableLine' + cssstring);
  $('.sideTableLine').css('border-top', 'solid ' + s_linesize + 'px ' + pageobj.tablebackcolor);
  $(".verticalText").addClass('verticalText' + cssstring);
  $(".sideText").addClass('sideText' + cssstring);
  $(".arrowSide").addClass('arrowSide' + cssstring);
  $(".arrowVertical").addClass('arrowVertical' + cssstring);
  $(".item_size").addClass('item_size' + cssstring);
  $(".arrowLeft").addClass('arrowLeft' + cssstring);
  $(".arrowtop").addClass('arrowtop' + cssstring);
  $(".arrowBottom").addClass('arrowBottom' + cssstring);
  $(".arrowRight").addClass('arrowRight' + cssstring);
};

//ヘッダーの色、テキスト設定
function headerDisp() {
  $('.headerBack').css('background', headerbackcolor);
  $('.header-button').css('color', headertextcolor);
  $('#topButton').text(toppagename);
  $('#techButton').text(techpagename);
  $('#pjButton').text(pjpagename);
};

//ページごとの色設定
function colorchange(pageobj) {
  $('#' + pageobj.headerbutton).css('background', 'linear-gradient(' + headerchoicecolor + ')');
  $('.categoryselect').css('background-color', pageobj.categoryselectcolor);
  $('.lineText').css('color', pageobj.linetextcolor);
  $('.verticalTableColor').css('background', 'linear-gradient(to left, ' + pageobj.tablebackcolor + ', rgba(255,255,255,0) 100%)');
  $('.sideTableColor').css('background', 'linear-gradient(to bottom, ' + pageobj.tablebackcolor + ', rgba(255,255,255,0) 100%)');

  $('.itemLavel').css('color', pageobj.desclabelcolor);
  $('.itemLavel').css('border-bottom', 'solid 2px ' + pageobj.desclabelcolor);
};

//ページごとの表内テキスト設定
function textchange(pageobj) {
  $("#sideText").text(pageobj.sideText);
  $("#verticalText").text(pageobj.verticalText);
};

//ページごとの説明欄テキスト設定
function descchange(pageobj) {
  $("#leftarea").append(pageobj.leftarea);
  $("#rightarea").append(pageobj.rightarea);
};

/*============================================================================================================
データ取得、画面表示関連
============================================================================================================*/
//初回またはカテゴリ変更時の表内テキスト表示処理
function textDisp(pageobj) {
  dbOpen().onsuccess = function () {
    var sideadjustment = 0.9;
    var verticaladjustment = 0.9;
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, pageobj.maindata).objectStore(pageobj.maindata);
    table.openCursor().onsuccess = function (event) {
      var data = event.target.result;
      if (data) {
        if (data.value.category == pageobj.categoryselect) {
          var id = "text" + data.value.itemid;
          $("#text").append('<div id="' + id + '" name="textlist" class="text_btn"  onclick="textClick(\'' + pageobj.maindata + '\',\'' + id + '\', \'' + data.value.itemid + '\')">' + data.value.name + '</div>');
          $("#" + id).css('left', data.value.side * sideadjustment + '%');
          $("#" + id).css('bottom', data.value.vertical * verticaladjustment + '%');
          var avg = (Number(data.value.side) + Number(data.value.vertical)) / 2;
          $("#" + id).css('background', 'linear-gradient(to top,' + tablebuttoncolor + ' ' + avg + '%,#eeecf9)');
        }
        data.continue();
      }
      $('.text_btn').css('color', tabletextbuttoncolor);
    };
    //アイテム未選択用説明
    $("#subarea").before('<span id="initDesc" class="descPop initDesc" >表内の各種項目を選択することでここに詳細が表示</span>');
  };
  dbOpen().onerror = function () { };
};

//表と説明欄の初期化
function itemInit() {
  $("#initDesc").remove();
  $("[id^='text']").css('border', 'none');
  $("#itemNameText").empty();
  $("#itemDescText").empty();
  $("#itemBusinessflowText").empty();
  $("#itemRangeText").empty();
  $("#itemRoleText").empty();
  $("#itemUsedTechText").empty();
};

//表内テキスト押下時の変更表示処理
function textClick(maindata, htmlid, dbid) {
  itemInit();
  dbOpen().onsuccess = function () {
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, maindata).objectStore(maindata);
    table.get(dbid).onsuccess = function (event) {
      var data = event.target.result;
      //選択されたitemのスタイルを変更
      $("#" + htmlid).css('border', 'solid 2px ' + tablebuttonbodercolor);
      switch (maindata) {
        //技術ページ用説明欄の値変更
        case techitemlistname:
          $("#itemNameText").text(data.name);
          $("#itemDescText").text(data.techuse);
          rangeGet(data.itemid);
          break;
        //PJページ用説明欄の値変更
        case pjitemlistname:
          $("#itemNameText").text(data.pjdesc);
          $("#itemBusinessflowText").text(data.business);
          $("#itemYearsText").text(data.years);
          techGet(data.itemid);
          roleGet(data.itemid);
          break;
        default:
      }
    };
  };
  dbOpen().onerror = function () { };
};

//説明欄item押下時の表示処理
function textDescClick(htmlid, techuse) {
  var deschtmlid = "textDescUse" + htmlid;
  //初期化処理
  textDescClose();
  //選択されたitemのスタイルを変更
  $("#" + htmlid).css('color', '#ff9e50');
  //説明用ポップアップを表示
  $("#" + htmlid).after('<span id="' + deschtmlid + '" class="descPop textDescUse" onclick="textDescClose()">' + techuse + 'に使用</span>');
  $('.textDescUse').css('background', descusebackcolor);
  $('.textDescUse').css('color', descusetextcolor);
};

//説明用ポップアップ押下時または説明欄item押下時の処理
function textDescClose() {
  //説明用ポップアップを消す
  $("[id^='textDescUse']").remove();
  //すべてのitemを初期状態に戻す
  $("[id^='textdesc']").css('color', tabletextbuttoncolor);
};

//初回セレクトボックス表示処理
function categoryDisp(pageobj) {
  dbOpen().onsuccess = function () {
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, categoryname).objectStore(categoryname);
    table.openCursor().onsuccess = function (event) {
      var data = event.target.result;
      if (data) {
        if (data.value.category1 == pageobj.category) {
          if (data.value.category2 == pageobj.categoryselect) {
            $("#categoryselect").prepend('<option value="' + data.value.category2 + '" selected>' + data.value.categoryname + '</option>');
          } else {
            $("#categoryselect").append('<option value="' + data.value.category2 + '">' + data.value.categoryname + '</option>');
          }
        }
        data.continue();
      }
    };
  };
  dbOpen().onerror = function () { };
};

//--------------------<技術データから対応範囲データ取得>--------------------
//対応範囲データの取得（マッピング）
function rangeGet(id) {
  dbOpen().onsuccess = function () {
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, techrangemapname).objectStore(techrangemapname);
    table.openCursor().onsuccess = function (event) {
      var data = event.target.result;
      if (data) {
        //取得したデータを展開し、条件に沿ったデータを抽出
        if (data.value.techid == id) {
          rangeNameGet(data.value.rangeid);
        }
        data.continue();
      }
    };
  };
  dbOpen().onerror = function () { };
};

//対応範囲データの取得（実データ取得、画面表示）
function rangeNameGet(id) {
  dbOpen().onsuccess = function () {
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, rangelistname).objectStore(rangelistname);
    table.openCursor().onsuccess = function (event) {
      var data = event.target.result;
      if (data) {
        //対応範囲データの取得、画面表示
        if (data.value.rangeid == id) {
          $("#itemRangeText").append('<div> ・' + data.value.rangename + '</div>');
        }
        data.continue();
      }
    };
  };
  dbOpen().onerror = function () { };
};
//-------------------------------------------------------------------

//--------------------<PJデータから役割データ取得>--------------------
//役割データの取得（マッピング）
function roleGet(id) {
  dbOpen().onsuccess = function () {
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, pjrolemapname).objectStore(pjrolemapname);
    table.openCursor().onsuccess = function (event) {
      var data = event.target.result;
      //取得したデータを展開し、条件に沿ったデータを抽出
      if (data) {
        if (data.value.pjid == id) {
          roleNameGet(data.value.roleid);
        }
        data.continue();
      }
      //取得したデータを展開し、条件に沿ったデータを抽出
    };
  };
  dbOpen().onerror = function () { };
};

//役割データの取得（実データ取得、画面表示）
function roleNameGet(id) {
  dbOpen().onsuccess = function () {
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, rolelistname).objectStore(rolelistname);
    table.openCursor().onsuccess = function (event) {
      var data = event.target.result;
      //役割データの取得、画面表示
      if (data) {
        if (data.value.roleid == id) {
          $("#itemRoleText").append('<div> ・' + data.value.rolename + '</div>');
        }
        data.continue();
      }
    };
  };
  dbOpen().onerror = function () { };
};
//--------------------------------------------------------------------

//--------------------<PJデータから技術データ取得>--------------------
//技術データの取得（マッピング）
function techGet(id) {
  dbOpen().onsuccess = function () {
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, pjtechmapname).objectStore(pjtechmapname);
    table.openCursor().onsuccess = function (event) {
      var data = event.target.result;
      //取得したデータを展開し、条件に沿ったデータを抽出
      if (data) {
        if (data.value.pjid == id) {
          techNameGet(data.value.techid);
        }
        data.continue();
      }
    };
  };
  dbOpen().onerror = function () { };
};

//技術データの取得（実データ取得、画面表示）
function techNameGet(id) {
  dbOpen().onsuccess = function () {
    var avg = 0;
    //クライアントDB接続、展開
    let table = readTransaction(event.target.result, techitemlistname).objectStore(techitemlistname);
    table.openCursor().onsuccess = function (event) {
      var data = event.target.result;
      if (data) {
        if (data.value.itemid == id) {
          //技術データの取得、画面表示
          var htmlid = "textdesc" + id;
          $("#itemUsedTechText").append('<div id="' + htmlid + '" name="textdesc" class="text_desc_btn"  onclick="textDescClick(\'' + htmlid + '\',\'' + data.value.techuse + '\')">' + data.value.name + '</div>');
          var avg = (Number(data.value.side) + Number(data.value.vertical)) / 2;
          $("#" + htmlid).css('background', 'linear-gradient(to top,#1b0d3b ' + avg + '%,#eeecf9)');
        }
        data.continue();
      }
      $('.text_desc_btn').css('color', tabletextbuttoncolor);
    };
  };
  dbOpen().onerror = function () { };
};
//-------------------------------------------------------------