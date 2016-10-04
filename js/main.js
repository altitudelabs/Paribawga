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

  var firstImageUrl = "images/index/idx_1_burma1.jpg";
  var firstSlideImage = new Image;
  firstSlideImage.onload = function() {
    $('body').removeClass('loading');
  }
  firstSlideImage.src = firstImageUrl;

  $('.header .bxslider').bxSlider({
    pager: false,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    controls: false,
    auto: true,
    autoDelay: 500
  });

});
