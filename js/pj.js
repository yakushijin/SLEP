/*============================================================================================================
PJページ設定関連処理
============================================================================================================*/
$(function () {
  //テンプレートを差し込み
  $('#template').load('portfolio.html');
});

//ページオブジェクト生成
var PageObj = function () {
  this.maindata = pjitemlistname;
  this.category = pjcategoryname;
  this.categoryselect = pjfirstselect;
  this.sideText = techverticaltext;
  this.verticalText = pjverticaltext;
  this.leftarea = '<div id="itemName" class="itemLavel">' + pjname + '</div>'
    + '<div id="itemNameText" class="itemText"></div>'
    + '<div class="row">'
    + '<div class="col-8">'
    + '<div id="itemBusinessflow" class="itemLavel">' + pjbusiness + '</div>'
    + '<div id="itemBusinessflowText" class="itemText"></div>'
    + '</div>'
    + '<div class="col-4">'
    + '<div id="itemYears" class="itemLavel">' + pjyears + '</div>'
    + '<div id="itemYearsText" class="itemText"></div>'
    + '</div>'
    + '</div>'
    + '<div id="itemUsedTech" class="itemLavel">' + pjusedtech + '</div>'
    + '<div id="itemUsedTechText" class="itemText"></div>';
  this.rightarea = '<div id="itemRole" class="itemLavel">' + pjrole + '</div>'
    + '<div id="itemRoleText" class="itemText"></div>';
  this.headerbutton = "pjButton";
  this.categoryselectcolor = pjcategoryselectcolor;
  this.linetextcolor = pjlinetextcolor;
  this.tablebackcolor = pjtablebackcolor;
  this.desclabelcolor = pjdesclabelcolor;
};