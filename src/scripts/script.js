$(document).ready(function(){
  new WOW().init();
  $('.your-class').slick({
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    pauseOnFocus: false,
    pauseOnHover: false,
  });
});

$(function() {
 var flag=0;
  // ナビゲーションのリンクを指定
 var navLink = $('#gnav div li a');
 var navLink1 = $('#main-header div li a');
 var flag = false;
 var pagetop = $('.fixed-real');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      if (flag == false) {
        flag = true;
        pagetop.stop().animate({
          'top' : '0px'
        },200)
      }
    } else {
      if(flag) {
        flag = false;
        pagetop.stop().animate({
          'top' : '-100px'
        },200)
      }
    }
  });

  // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
  var contentsArr = new Array();
  for (var i = 0; i < navLink.length; i++) {
     // コンテンツのIDを取得
    var targetContents = navLink.eq(i).attr('href');
    // ページ内リンクでないナビゲーションが含まれている場合は除外する
    if(targetContents.charAt(0) == '#') {
       // ページ上部からコンテンツの開始位置までの距離を取得
          var targetContentsTop = $(targetContents).offset().top;
       // ページ上部からコンテンツの終了位置までの距離を取得
          var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
       // 配列に格納
          contentsArr[i] = [targetContentsTop, targetContentsBottom]
    }
  };

// 現在地をチェックする
  function currentCheck() {
     // 現在のスクロール位置を取得
      var windowScrolltop = $(window).scrollTop();
      for (var i = 0; i < contentsArr.length; i++) {
         // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
        if(contentsArr[i][0] <= windowScrolltop -10 && contentsArr[i][1] >= windowScrolltop) {
              // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
             navLink.removeClass('effect');
             navLink.eq(i).addClass('effect');
              i == contentsArr.length;
          }
     };
  }

 // ページ読み込み時とスクロール時に、現在地をチェックする
  $(window).on('load scroll', function() {
    currentCheck();
    if (contentsArr[1][0] <= windowScrolltop -10 && contentsArr[1][1] >= windowScrolltop && flag==0) {
      var num = 0;
      var tgt = 200;
      var speed = 10;
      setInterval(function(){
        if(num <= tgt){
          document.getElementById("count").innerText = num;
          num++;
        }
      },speed);
      flag=1;
    }
  });

// ナビゲーションをクリックした時のスムーズスクロール
  navLink.click(function() {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top
     }, 300);
      return false;
 })

  navLink1.click(function() {
    $('html,header').animate({
      scrollTop: $($(this).attr('href')).offset().top
     }, 300);
    return false;
 })
});