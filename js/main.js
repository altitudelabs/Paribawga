$(document).ready(function(){

  // NAV MENU
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

  if ($(window).innerWidth() >= 1024) {
    $('.nav-menu .links').css('display', 'block');
  } else {
    $('.nav-menu .links').css('display', 'none');
  }


});
