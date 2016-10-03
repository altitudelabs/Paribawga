$(document).ready(function(){

  function showMenu(){
    $('.nav-menu .links').css('display', 'block');
    $('.gray-bg').css('visibility', 'visible');
    $(this).one("click", removeMenu);
  }

  function removeMenu(){
    $('.nav-menu .links').css('display', 'none');
    $('.gray-bg').css('visibility', 'hidden');
    $(this).one("click", showMenu);
  }

  $('.nav-menu .title').one("click", showMenu);

  if ($(window).innerWidth() >= 1024) {
    $('.nav-menu .links').css('display', 'block');
  } else {
    $('.nav-menu .links').css('display', 'none');
  }
});