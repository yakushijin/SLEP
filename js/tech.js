/*============================================================================================================
技術ページ設定関連処理
============================================================================================================*/
$(function () {
  //テンプレートを差し込み
  $('#template').load('portfolio.html');
});

//ページオブジェクト生成
var PageObj = function () {
  this.maindata = techitemlistname;
  this.category = techcategoryname;
  this.categoryselect = techfirstselect;
  this.sideText = techsidetext;
  this.verticalText = pjsidetext;
  this.leftarea = '<div id="itemName" class="itemLavel">' + techname + '</div>'
    + '<div id="itemNameText" class="itemText"></div>'
    + '<div id="itemDesc" class="itemLavel">' + techdesc + '</div>'
    + '<div id="itemDescText" class="itemText"></div>';
  this.rightarea = '<div id="itemRange" class="itemLavel">' + techmyrange + '</div>'
    + '<div id="itemRangeText" class="itemText"></div>';
  this.headerbutton = "techButton";
  this.categoryselectcolor = techcategoryselectcolor;
  this.linetextcolor = techlinetextcolor;
  this.tablebackcolor = techtablebackcolor;
  this.desclabelcolor = techdesclabelcolor;
};