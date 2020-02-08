/*============================================================================================================
ロード時の表示制御
============================================================================================================*/
//ロード開始
function LoadOn(){
  $('body').append('<div div id="loaderid" class="loader"></div>' );
  $('body').prepend('<div id ="loadertexterea" class="loadertexterea"><div class="loadertext">クライアント側</br>DB作成中</div></div>' );
  $('body').prepend('<div id="lockid" class="lock">' );
  $('body').append('</div>');
}
//ロード終了
function LoadOff(){
  $("#loadertexterea").remove();
  $("#loaderid").remove();
  $("#lockid").remove();
}
