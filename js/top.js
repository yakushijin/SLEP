/*============================================================================================================
トップ画面構成作成関連処理
============================================================================================================*/
$(function () {
  baseInit();
  $('#allBackGround').delay(2000).queue(function () { eventsInit(); });
  if (anime) { extraAnime(); }
});

//各種表示設定
function baseInit() {
  //各種表示テキスト、色の設定
  $('#techButton').text(techpagename);
  $('#pjButton').text(pjpagename);
  $('#plofilName').text(myname);
  $('#plofilAge').text(myage);
  $('#plofilJobs').text(myjobs);
  $('#plofilText').text(myfreetext);
  $('#freeText').text(freetext);
  $('.plofilName').css('color', namecolor);
  $('.plofilAgeJobs').css('color', agejobscolor);
  $('.top-button').css('color', topbuttontextcolor);
  $('.top-button').css('background-image', 'linear-gradient(' + topbuttoncolor + ')');
  $('.top-button').css('border-bottom', 'solid 3px ' + topbuttonbodercolor);
  //画面サイズを取得し、背景色の設定をする
  $('.allBackGround').css('height', window.innerHeight);
  //全体の縦幅と横幅の情報をアニメーション領域に設定
  $('#anime').attr("width", window.innerWidth);
  if(window.innerWidth > 1000 ){
    $('#anime').attr("height", window.innerHeight / 1.5);
  }else{
    $('#anime').attr("height", window.innerHeight / 2);
  }
};

//イベント処理の初期化
function eventsInit() {
  //技術ページ
  $('#techButton').on('click', function () {
    window.location.href = techlink;
  });
  //PJページ
  $('#pjButton').on('click', function () {
    window.location.href = pjlink;
  });
};

//追加アニメーション設定
function extraAnime() {
  //--------------------<初期化関連処理>--------------------
  //玉のオブジェクト
  let balls = [];
  //玉の数
  let ballsquantity = 30;
  //玉の色
  let ballscolor = ['#E0CA82', '#D1AE15', '#F5D100'];
  //玉の基準となる大きさ
  let ballssize = 1;
  //玉の基準となる移動速度
  let ballsspeed = 5;
  //玉の基準となる横の移動方向
  let ballssidemove = [1, -1];

  //玉オブジェクトのコンストラクタ
  var Ball = function (ballsize, ballcolor, sideposition, verticalposition, sidemovement, verticalmovement, defaultsideposition) {
    this.ballsize = ballsize;
    this.ballcolor = ballcolor;
    this.sideposition = sideposition;
    this.verticalposition = verticalposition;
    this.sidemovement = sidemovement;
    this.verticalmovement = verticalmovement;
    this.defaultsideposition = defaultsideposition;
  };

  //アニメーション実行環境設定
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
  //-----------------------------------------------------------  

  $(window).on('load', function () {
    //キャンバス周りの定義
    var canvas = document.querySelector('#anime');
    var ctx = $('#anime')[0].getContext('2d');

    //プロパティの定義追加
    Ball.prototype = {
      mural: function () {
        //玉の位置を変更する
        this.sideposition += this.sidemovement;
        this.verticalposition += this.verticalmovement;
        //たまに横方向の移動を逆転させる
        if (Math.random() > 0.999) {
          this.sidemovement = this.sidemovement * ballssidemove[~~(Math.random() * 2)];
        }
        //画面の上まで到達した場合下から再度出現させる
        if (this.verticalposition < -5) {
          this.verticalposition = canvas.height + 5;
          this.sideposition = this.defaultsideposition;
        }
        //アニメーションを壁画する
        ctx.fillStyle = this.ballcolor;
        ctx.beginPath();
        ctx.arc(this.sideposition, this.verticalposition, this.ballsize, 0, 2 * Math.PI, false);
        ctx.fill();
      }
    };

    ballsCreate();
    animationRun();

    // 表示される玉のオブジェクトを作成
    function ballsCreate() {
      for (var i = 0; i < ballsquantity; i++) {
        //玉の大きさを設定
        var ballsize = Math.floor(Math.random() * 3) + ballssize;
        //玉の色を設定
        var ballcolor = ballscolor[~~(Math.random() * 3)];
        //玉の位置を設定
        var sideposition = Math.random() * canvas.width;
        var verticalposition = Math.random() * canvas.height;
        var defaultsideposition = sideposition;
        //玉の移動方向、速度を設定
        var ballspeed = ballsize / ballsspeed;
        var ballangle = (270 + (Math.random() * 30)) * Math.PI / 180;
        var sidemovement = Math.cos(ballangle) * ballspeed * ballssidemove[~~(Math.random() * 2)];
        var verticalmovement = Math.sin(ballangle) * ballspeed;
        //設定した内容にて玉のオブジェクトを生成
        var ball = new Ball(ballsize, ballcolor, sideposition, verticalposition, sidemovement, verticalmovement, defaultsideposition);
        //生成したオブジェクトを配列に追加
        balls.push(ball);
      }
    };

    //表示される玉のアニメーションを表示
    function animationRun() {
      //アニメーション処理を実行する（本メソッドを繰り返し実行）
      requestAnimFrame(animationRun);
      //壁画初期化
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      //壁画実行
      balls.forEach(function (value) {
        value.mural();
      });
    }
  });

};
