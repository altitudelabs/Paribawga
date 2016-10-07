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
        $('.index #footer').addClass('slide-up-full');
        $('.index #footer').removeClass('hidden');
      } else {
        $('.index .nav-menu').addClass('white');
        $('.index #footer').addClass('hidden');
      }
    } else {
      $('.index #footer').removeClass('hidden');
    }
  }));

  /* * * * * * * * * * * *
  *  ANIMATION
  * * * * * * * * * * * */

  // Friction

  var fricFastElement = $('.frictionFast'),
      fricMedElement = $('.frictionMed'),
      fricSlowElement = $('.frictionSlow');

  // distance = const * delta in the checkScrollSpeed function
  var distanceFast = 5,
      distanceMed = -5, // add (-) just to make it different~
      distanceSlow = 7;

  var checkScrollSpeed = (function(settings){
    settings = settings || {};

    var lastPos, newPos, timer, delta,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    // set back the velocity to 0
    function clear() {
      lastPos = null;
      delta = 0;
      fricFastElement.css("transform", "none");
      fricMedElement.css("transform", "none");
      fricSlowElement.css("transform", "none");
    }

    clear();

    return function(){
      newPos = window.scrollY;
      if ( lastPos != null ){ // && newPos < maxScroll
        delta = newPos -  lastPos;

        var velocityFast = delta * distanceFast,
            velocityMed = delta * distanceMed,
            velocitySlow = delta * distanceSlow;

        fricFastElement.css("transform", "translateY(" + velocityFast.toString() + "px)");
        fricMedElement.css("transform", "translateY(" + velocityMed.toString() + "px)");
        fricSlowElement.css("transform", "translateY(" + velocitySlow.toString() + "px)");

      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
  })();

  window.onscroll = checkScrollSpeed;

  // back-to-top
  $('.back-to-top').click(function(){
    console.log("test");
    $('body, html').animate({
      scrollTop: 0
    }, 600);
    return false;
  });

});
