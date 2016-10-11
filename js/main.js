$(document).ready(function(){

  /* * * * * * * * * * * *
  *  NAV MENU
  * * * * * * * * * * * */
  var navMenu = $('.nav-menu'),
      grayBg = $('.gray-bg'),
      navTitle = $('.nav-menu .title'),
      navLinks = $('.nav-menu .links'),
      navLi = $('.nav-menu ul li');
  var headerTitle = $('.header .title');
  var isSubNav = $('.nav-menu').hasClass('hidden')? true: false;

  function showMenu(){
    console.log($(this), $(this).parent(), "show menu");
    if (isSubNav) navMenu.removeClass('hidden');
    navLinks.css('display', 'block');
    grayBg.css('visibility', 'visible');
    $(this).one("click", removeMenu);
    navTitle.one("click", removeMenu);

    var winWidth = $(window).innerWidth();

    if (winWidth < 1200) {
      navLi.click(removeMenu);
    } else {
      navLi.off('click');
    }
  }

  function removeMenu(){
    console.log($(this), "remove menu");
    if (isSubNav) navMenu.addClass('hidden');
    navLinks.css('display', 'none');
    grayBg.css('visibility', 'hidden');
    navTitle.one("click", showMenu);
    headerTitle.one("click", showMenu);
  }

  navTitle.one("click", showMenu);
  headerTitle.one("click", showMenu);

  $(window).resize($.throttle(250, function(){
    var winWidth = $(window).innerWidth();
    removeMenu();

    if (winWidth >= 1200) {
      navLinks.css('display', 'block');
      navLi.off('click');
    }
  }));

  // index page nav-menu and footer
  var idxNavMenu = $('.index .nav-menu'),
      idxFooter = $('.index #footer');
  $(window).scroll($.throttle(250, function() {
    var winScrollTop = $(window).scrollTop();
    var winWidth = $(window).innerWidth();

    if (winWidth >= 1024) {
      if (winScrollTop >= 600) { // 1st section-height
        idxNavMenu.removeClass('white');
        idxFooter.addClass('slide-up-full');
        idxFooter.removeClass('hidden');
      } else {
        idxNavMenu.addClass('white');
        idxFooter.addClass('hidden');
      }
    } else {
      idxFooter.removeClass('hidden');
    }
  }));

  /* * * * * * * * * * * *
  *  ANIMATION
  * * * * * * * * * * * */

  // Friction

  var element = $('.friction');
  var lastPos, newPos = 0;
  var deltaPosVar = [1, 2, 3];


  function friction() {
    requestAnimationFrame(friction);
    var winScrollTop = $(window).scrollTop();
    var variable = 2;
    lastPos = newPos;
    newPos = winScrollTop;
    var speed = newPos - lastPos;

    var maxDeltaPos = variable * speed;

    TweenLite.to(element, 1, {y: maxDeltaPos});
  }

  friction();

  // back-to-top

  var backToTop = $('.back-to-top');

  backToTop.click(function(){
    console.log("test");
    $('body, html').animate({
      scrollTop: 0
    }, 600);
    return false;
  });

});
