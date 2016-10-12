$(document).ready(function(){

  $(this).scrollTop(0);

  var indexPage = $('.index');

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
        idxFooter.addClass('activate');
      } else {
        idxNavMenu.addClass('white');
        idxFooter.removeClass('activate');
      }
    } else {
      idxFooter.addClass('activate');
    }
  }));

  /* * * * * * * * * * * *
  *  ANIMATIONS
  * * * * * * * * * * * */

  // header animations
  var path = $('#stroke');
  var pathChildren = path.children();

  pathChildren.each(function(idx, element){
    element.style.strokeDasharray = element.style.strokeDashoffset =
      element.getTotalLength();
  });

  var headerTL = new TimelineLite();
  var header = $('.header'),
      taglineImg = $('.cover-tagline .img'),
      scrollTag = $('.scroll-tag'),
      downTag = $('.down-tag'),
      aboutusSection = $('#aboutus-section');

  headerTL
    .staggerTo(pathChildren, .05, {autoAlpha: 1, strokeDashoffset: 0}, .05)
    //.to(header, 1, {top: '10%', right: '10%', bottom: '10%', left: '10%', ease: Circ.easeOut})
    .fromTo(idxNavMenu, 1, {y: -200, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=.05')
    .from(scrollTag, 1, {x: -200}, '-=1')
    .from(downTag, 1, {x: 200}, '-=1')
    .set(taglineImg, {autoAlpha: 1}, '-=1')
    .set(indexPage, {overflow: 'auto'})
    .set(idxNavMenu, {clearProps: "x"}); // reset position


  scrollTag.add(downTag).click(function(){
    $('body, html').animate({
      scrollTop: aboutusSection.position().top+'px'
    }, 600);
    return false;
  });

  // Friction

  var fricElements = [$('.frictionFast'),
                        $('.frictionMed'),
                        $('.frictionSlow')];
  var durationVars = [2, 1.5, 1]; // in seconds
  var deltaPosVars = [1.5, -1, .5];
  var lastPos, newPos = 0;

  function friction() {
    requestAnimationFrame(friction);
    var winScrollTop = $(window).scrollTop();
    lastPos = newPos;
    newPos = winScrollTop;
    var speed = newPos - lastPos;

    for (var i = 0; i < fricElements.length; ++i){
      var maxDeltaPos = deltaPosVars[i] * speed;
      TweenLite.to(fricElements[i], durationVars[i], {y: maxDeltaPos});
    }
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

  /* * * * * * * * * * * *
  *  COLLECTION
  * * * * * * * * * * * */

  // variables
  var collectionImg1 = $('#collection-section .image1'),
      collectionImg2 = $('#collection-section .image2'),
      collectionImg3 = $('#collection-section .image2'),
      collectionImg4 = $('#collection-section .image2'),
      collectionTitle = $('#collection-section .name'),
      collectionDesc  = $('#collection-section .text'),
      collectionContainer = $('#collection-section .images-descriptions-container');

  // data
  var COLLECTION_DATA = [
    {
      "title": "the burma collection",
      "desc" : "The first Paribawga Collection is a line of furniture and accessories that draws upon the culture, geography and history of Myanmar, but with a contemporary twist. Our designs reflect both local tradition and global modernity, but our craftsmanship, and careful sourcing of materials, roots us strongly in Southeast Asia. Innovative textures such as burnt finishes conjure the moods of monsoon season and the lush complexity of the rainforest, while simple silhouettes reflect our commitment to thoughtful design that fits seamlessly into contemporary life.",
      "images": [
        "images/collection/1_1.jpg",
        "images/collection/1_2.jpg",
        "images/collection/1_3.jpg",
        "images/collection/1_4.jpg"
      ]
    },
    {
      "title": "the new collection",
      "desc" : "This is a new collection.",
      "images": [
        "images/collection/collection_1.jpg",
        "images/collection/collection_2.jpg",
        "images/collection/collection_3.jpg",
        "images/collection/collection_4.jpg"
      ]
    }
  ];

  var slideCollectionSection = $.throttle(1000, (function() {
    var categoryIndex = 0;
    var nextCategoryIndex = 1;
    var updateIndex = function(isNext) {
      if (isNext) {
        categoryIndex++;
        if (categoryIndex >= COLLECTION_DATA.length) {
          categoryIndex = 0;
        }
      } else {
        categoryIndex--;
        if (categoryIndex < 0) {
          categoryIndex = COLLECTION_DATA.length - 1;
        }
      }
      nextCategoryIndex = categoryIndex + 1;
      if (nextCategoryIndex >= COLLECTION_DATA.length) {
        nextCategoryIndex = 0;
      }
    }

    return function(e, isNext) {
      updateIndex(isNext);
      var title = COLLECTION_DATA[categoryIndex].title;
      var desc = COLLECTION_DATA[categoryIndex].desc;
      var imgs = [];
      $(COLLECTION_DATA[categoryIndex].images).each(function(idx, element){
        imgs.push(element);
      });

      function updateData(){
        collectionTitle.text(title);
        collectionDesc.text(desc);
        collectionImg1.attr("src", imgs[0]);
        collectionImg2.attr("src", imgs[1]);
        collectionImg3.attr("src", imgs[2]);
        collectionImg4.attr("src", imgs[3]);
      }

      if (isNext) {
        x = 1000;
      } else {
        x = -1000;
      }

      TweenMax.from(collectionContainer, 1, {
        x: x,
        ease: Power2.easeOut,
        onUpdate: updateData
      });

    };
  })());

  /* * * * * * * * * * * *
  *  PROJECTS
  * * * * * * * * * * * */

  // variables
  var projectsImg1 = $('#projects-section .image1'),
      projectsImg2 = $('#projects-section .image2'),
      projectsTitle = $('#projects-section .name'),
      projectsDesc  = $('#projects-section .text'),
      projectsContainer = $('#projects-section .images-descriptions-container');

  // data
  var PROJECTS_DATA = [
    {
      "title": "rau ram",
      "desc" : "We design, make, and install furniture and accessories for indoor and outdoor environments, including hospitality, retail, and cultural projects. Whether providing a single piece of furniture, an installation, or outfitting an entire restaurant, we pride ourselves on high-quality materials, flexibility, innovation, and the opportunity to bring beautiful Myanmar-made craftsmanship to the rest of the world.",
      "images": [
        "images/index/4_projects1.jpg",
        "images/index/4_projects2.jpg"
      ]
    },
    {
      "title": "the new project",
      "desc" : "This is a new project.",
      "images": [
        "images/collection/collection_1.jpg",
        "images/collection/collection_2.jpg"
      ]
    }
  ];

  var slideProjectsSection = $.throttle(1000, (function() {
    var categoryIndex = 0;
    var nextCategoryIndex = 1;
    var updateIndex = function(isNext) {
      if (isNext) {
        categoryIndex++;
        if (categoryIndex >= PROJECTS_DATA.length) {
          categoryIndex = 0;
        }
      } else {
        categoryIndex--;
        if (categoryIndex < 0) {
          categoryIndex = PROJECTS_DATA.length - 1;
        }
      }
      nextCategoryIndex = categoryIndex + 1;
      if (nextCategoryIndex >= PROJECTS_DATA.length) {
        nextCategoryIndex = 0;
      }
    }

    return function(e, isNext) {
      updateIndex(isNext);
      var title = PROJECTS_DATA[categoryIndex].title;
      var desc = PROJECTS_DATA[categoryIndex].desc;
      var imgs = [];
      $(PROJECTS_DATA[categoryIndex].images).each(function(idx, element){
        imgs.push(element);
      });

      function updateData(){
        projectsTitle.text(title);
        projectsDesc.text(desc);
        projectsImg1.attr("src", imgs[0]);
        projectsImg2.attr("src", imgs[1]);
      }

      if (isNext) {
        x = 1000;
      } else {
        x = -1000;
      }

      TweenMax.from(projectsContainer, 1, {
        x: x,
        ease: Power2.easeOut,
        onUpdate: updateData
      });

    };
  })());

  /* * * * * * * * * * * *
  *  MORE TAG
  * * * * * * * * * * * */

  var moreTag = $('.more-tag'),
      isNext = true;

  moreTag.click(function(e){

    var target = $(this).data('target');

    if (e.target.id === "more-left") {
      console.log("left");
      isNext = false;
    } else {
      console.log("right");
      isNext = true;
    }

    if (target === '#collection-section') {
      return slideCollectionSection.apply(this, [e, isNext]);
    }

    if (target === '#projects-section') {
      return slideProjectsSection.apply(this, [e, isNext]);
    }
  });

});
