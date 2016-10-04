$(document).ready(function(){

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
