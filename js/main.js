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

    var winWidth = $(window).innerWidth();
    if (winWidth < 1200) {
      $('.nav-menu ul li').click(removeMenu);
    } else {
      $('.nav-menu ul li').off('click');
    }
  }

  function removeMenu(){
    console.log($(this), "remove menu");
    if (isSubNav) $('.nav-menu').addClass('hidden');
    $('.nav-menu .links').css('display', 'none');
    $('.gray-bg').css('visibility', 'hidden');
    $('.nav-menu .title').one("click", showMenu);
    $('.header .title').one("click", showMenu);
  }

  $('.nav-menu .title').one("click", showMenu);
  $('.header .title').one("click", showMenu);

  $(window).resize($.throttle(250, function(){
    var winWidth = $(window).innerWidth();
    removeMenu();

    if (winWidth >= 1200) {
      $('.nav-menu .links').css('display', 'block');
      $('.nav-menu ul li').off('click');
    }
  }));

  $(window).scroll($.throttle(250, function() {
    var winScrollTop = $(window).scrollTop();
    var winWidth = $(window).innerWidth();

    if (winWidth >= 1024) {
      if (winScrollTop >= 600) { // 1st section-height
        $('.index .nav-menu').removeClass('white');
        $('.index #footer').removeClass('hidden');
      } else {
        $('.index .nav-menu').addClass('white');
        $('.index #footer').addClass('hidden');
      }
    } else {
      $('#footer').removeClass('hidden');
    }
  }));

});
