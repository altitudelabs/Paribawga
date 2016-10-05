$(document).ready(function(){

  /* * * * * * * * * * * *
   *  NAV MENU
   * * * * * * * * * * * */
  var isSubNav = $('.nav-menu').hasClass('hidden')? true: false;

  function showMenu(){
    console.log($(this), $(this).parent(), "show menu");
    if (isSubNav) $('.nav-menu').removeClass('hidden');
    $('.nav-menu .links').css('display', 'block');
    $('.gray-bg').css('visibility', 'visible');
    $(this).one("click", removeMenu);
    $('.nav-menu .title').one("click", removeMenu);
  }

  function removeMenu(){
    console.log($(this), "remove menu");
    if (isSubNav) $('.nav-menu').addClass('hidden');
    $('.nav-menu .links').css('display', 'none');
    $('.gray-bg').css('visibility', 'hidden');
    $(this).one("click", showMenu);
    $('.header .title').one("click", showMenu);
  }

  $('.nav-menu .title').one("click", showMenu);
  $('.header .title').one("click", showMenu);

  $(window).resize($.throttle(250, function(){
    if ($(window).innerWidth() >= 1024) {
      $('.nav-menu .links').css('display', 'block');
      console.log("hey");
    } else {
      $('.nav-menu .links').css('display', 'none');
    }
  }));

  $(window).scroll($.throttle(250, function() {
    var winScrollTop = $(window).scrollTop();
    var winWidth = $(window).innerWidth();

    if (winWidth >= 1024) {
      if (winScrollTop >= 600) { // 1st section-height
        $('.nav-menu').css('color', 'black');
      } else {
        $('.nav-menu').css('color', 'white');
      }
    }
  }));

});
