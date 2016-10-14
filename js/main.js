$(document).ready(function(){

  $(this).scrollTop(0);

  //detect IE
  var ms_ie = false;
  var userAgent = window.navigator.userAgent;
  var old_ie = userAgent.indexOf('MSIE ');
  var new_ie = userAgent.indexOf('Trident/');

  if ((old_ie > -1) || (new_ie > -1)) {
      ms_ie = true;
  }

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

  // index page nav-menu and footer
  var idxNavMenu = $('.index .nav-menu'),
      idxFooter = $('.index #footer');

  navMenu.css('background-color', 'white');
  idxNavMenu.css('background-color', 'transparent');

  function showMenu(){
    console.log($(this), $(this).parent(), "show menu");
    if (isSubNav) navMenu.removeClass('hidden');
    navLinks.css('display', 'block');
    grayBg.css('visibility', 'visible');
    navMenu.css('background-color', 'transparent');
    $(this).off('click').on('click', removeMenu);
    navTitle.off('click').on('click', removeMenu);

    var winWidth = $(window).innerWidth();

    if (winWidth < 1200) {
      console.log(winWidth);
      navLi.off('click').on('click', removeMenu);
    } else {
      console.log(winWidth);
      navLi.off('click');
    }
  }

  function removeMenu(){
    console.log($(this), "remove menu");
    if (isSubNav) navMenu.addClass('hidden');
    navLinks.css('display', 'none');
    grayBg.css('visibility', 'hidden');
    navTitle.off('click').on('click', showMenu);
    headerTitle.off('click').on('click', showMenu);
  }

  navTitle.on("click", showMenu);
  headerTitle.on("click", showMenu);


  /* * * * * * * * * * * *
  *  EXPAND/SHRINK text function
  * * * * * * * * * * * */

  function shrinkText(element, maxLength){

    var linkElement = $(element).find('a.read-more');

    console.log(linkElement, linkElement.length);
    if (linkElement.length) return;

    var fullText = element.text();
    if (fullText.length <= maxLength) return;

    var shownText = fullText.substr(0, maxLength);
    var hiddenText = fullText.substr(maxLength, fullText.length);

    element.html(shownText
                  + '<br><a class="read-more">Read more</a>'
                  + '<span class="more-text" style="display: none">' + hiddenText + '</span>');

    $(element).find('a.read-more').click(function(e){
      e.preventDefault();
      expandText(element);
    });
  }

  function expandText(element) {

    var readMore = $(element).find('a.read-more');
    $(readMore).hide();
    $(readMore).parent().find('.more-text').show();
  }

  function shrinkSectionText(section) {
    var itemDescs = $(section).find('.text');
    $(itemDescs).each(function(){
      shrinkText($(this), 200);
    });
  }

  function expandSectionText(section){
    var itemDescs = $(section).find('.text');
    $(itemDescs).each(function(){
      expandText($(this));
    });
  }


  /* * * * * * * * * * * *
  *  COLLECTION
  * * * * * * * * * * * */

  // variables
  var collectionImg1 = $('#collection-section .image1'),
      collectionImg2 = $('#collection-section .image2'),
      collectionImg3 = $('#collection-section .image3'),
      collectionImg4 = $('#collection-section .image4'),
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
    }];

  var slideCollectionSection = $.throttle(1000, (function() {
    var categoryIndex = 0;
    var nextCategoryIndex = 1;

    // build initial structure for mobile and transition
    (function(){
      var container = $('#collection-section .mobile-transition-only');
      var content = "";

      for (var i = 1; i < COLLECTION_DATA.length; ++i) {
        var data = COLLECTION_DATA[i];
        content+='<div class="image-and-description-box">'
        + '<div class="row">'
        + '<img class="image1 frictionMed" src="' + data.images[0] + '"/>'
        + '</div>'
        + '<div class="row">'
        + '<div class="content-text frictionSlow">'
        + '<div class="name">' + data.title + '</div>'
        + '<p class="text">' + data.desc + '</p>'
        + '</div>'
        + '</div>'
        + '</div>';
      }
      container.html(content);

      var winWidth = $(window).innerWidth();
      if (winWidth < 1200) shrinkSectionText('#collection-section');

    })();

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
    }
  ];

  var slideProjectsSection = $.throttle(1000, (function() {
    var categoryIndex = 0;
    var nextCategoryIndex = 1;
    // build initial structure for mobile and transition
    (function(){
      var container = $('#projects-section .mobile-transition-only');
      var content = "";

      for (var i = 1; i < PROJECTS_DATA.length; ++i) {
        var data = PROJECTS_DATA[i];
        content+='<div class="image-and-description-box">'
                  + '<div class="column">'
                    + '<img class="image1 frictionMed" src="' + data.images[0] + '"/>'
                  + '</div>'
                  + '<div class="column">'
                    + '<div class="content-text frictionSlow">'
                      + '<div class="name">' + data.title + '</div>'
                      + '<p class="text">' + data.desc + '</p>'
                      + '<br>'
                      + '<p class="explore-link"><a href="./views/projects.html">explore more</a></p>'
                    + '</div>'
                  + '</div>'
                + '</div>';
      }
      container.html(content);
    })();

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
  *  PRESS
  * * * * * * * * * * * */

  // variables
  var pressImg = $('#press-section .image'),
      pressDate = $('#press-section .date'),
      pressDesc = $('#press-section .text'),
      grid;

  // data
  var PRESS_DATA = [
    {
      "date": "4 October 2016",
      "desc" : "Paribawga launches at the Myanmar Furniture Fair 2016.",
      "image": "images/press/press1.jpg",
      "pdf": "/images/press/press1.pdf"
    },
    {
      "date": "4 October 2016",
      "desc" : "Travel and Leisure Asia: Paribawga mentioned in “Road to Rangoon”  for its work on Yangon dining hotspot, Rau Ram.",
      "image": "images/press/press2.jpg",
      "pdf": "/images/press/press2.pdf"
    }
  ];

  var rowPressSection = $.throttle(1000, (function() {
    var rowIndex = 0, currRowIdxShown = 0;
    var length = PRESS_DATA.length;
    var maxRow = Math.floor(length / 3);
    var itemBox;

    function showRow(endRow, display = "inline-block"){

      console.log("showRow", endRow);

      for (var i = 0; i < (endRow + 1) * 3; ++i) {
        $(itemBox[i]).css('display', display);
      }

      for (var i = (endRow + 1) * 3; i < length; ++i) {
        $(itemBox[i]).css('display', 'none');
      }
    }

    function init() {
      itemBox = $('#press-section .grid-item');
      rowIndex = 0;
      currRowIdxShown = 0;

      var winWidth = $(window).innerWidth();
      if (winWidth < 1200) {
        showRow(maxRow); // show all items
      } else {
        showRow(rowIndex); // only show the first row
      }
    }

    // build initial structure
    (function(){
      var container = $('#press-section .images-descriptions-container .grid');
      var content = "";

      for (var i = 0; i < PRESS_DATA.length; ++i) {
        var data = PRESS_DATA[i];

        content+='<div class="image-and-description-box grid-item one-fourth">'
          + '<div class="date frictionSlow">' + data.date + '</div>'
          + '<img class="image frictionFast" src="' + data.image + '" alt="press"' + i.toString() + '/>'
          + '<div class="content-text frictionSlow">'
          + '<p class="text">' + data.desc + '</p>'
          + '<br>'
          + '<p class="explore-link">'
          + '<a href="' + data.pdf + '">Explore more</a>'
          + '</p>'
          + '</div>'
          + '</div>';

      }
      container.html(content);

      init();
    })();

    return function(e, isNext, winWidth) {

      if (isNext) {
        rowIndex++;
        if (rowIndex > maxRow) {
          rowIndex = maxRow;
          return;
        }

        if (currRowIdxShown < rowIndex) {
          showRow(rowIndex);
          var row = [];

          for (var i = rowIndex * 3; i < (rowIndex + 1) * 3; ++i) {
            if (i >= length) break;

            row.push(itemBox[i]);
          }

          if (!ms_ie) {

            var pressTL = new TimelineLite();

            pressTL
            .set(row, {overflow: "hidden", autoAlpha: 0})
            .fromTo(row, 1, {height: 0}, {height: 450})
            .fromTo(row, 1, {x: -1000}, {x: 0, autoAlpha: 1})
            .set(row, {clearProps: "overflow"});
            currRowIdxShown = rowIndex;
          }
        }

        return;
      }

      init();
    }
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

    if (target === '#press-section') {
      return rowPressSection.apply(this, [e, isNext, 0]);
    }
  });

  /* * * * * * * * * * * *
  *  LEVEL
  * * * * * * * * * * * */

  var level = $('.level');

  function updateLevel(currScroll){
    var currSection = $.makeArray($('.section-container'))
      .reduce(function(prev, current) {
        var target = $(current).data('target');

        if ($(current).offset().top <= currScroll) {
          return target;
        }
        return prev;
      }, 'zero');

      //console.log(currSection);
      $(level).find('div').css('display', 'none');

      var levelDiv = $(level).find("." + currSection);
      levelDiv.css('display', 'block');
  }

  /* * * * * * * * * * * *
  *  WINDOW RESIZE & SCROLL
  * * * * * * * * * * * */

  $(window).resize($.throttle(250, function(e){
    var winWidth = $(window).innerWidth();
    removeMenu();

    if (winWidth >= 1200) {
      // nav menu
      navLinks.css('display', 'block');
      navLi.off('click');

      // collection text
      expandSectionText($('#collection-section'));
    } else {
      shrinkSectionText($('#collection-section'));
    }

    // press
    rowPressSection.apply(this, [e, false, winWidth]);


  }));

  $(window).scroll($.throttle(250, function() {
      var winScrollTop = $(window).scrollTop();
      var winWidth = $(window).innerWidth();

      // nav menu
      if (winWidth >= 1024) {
        if (winScrollTop >= $(window).height()) { // 1st section-height
          idxNavMenu.removeClass('white');
          idxFooter.addClass('activate');
        } else {
          idxNavMenu.addClass('white');
          idxFooter.removeClass('activate');
        }
      } else {
        idxFooter.addClass('activate');
      }

      if (winScrollTop >= $(window).height()) {
        idxNavMenu.css('background-color', 'white');
      } else {
        idxNavMenu.css('background-color', 'transparent');
      }

      // level
      updateLevel(winScrollTop);
    }));


  /* * * * * * * * * * * *
  *  ANIMATIONS
  * * * * * * * * * * * */

  // header
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
      aboutusSection = $('#aboutus-section'),
      idxPage = $('body'),
      scrollTag = $('.scroll-tag'),
      downTag = $('.down-tag');

  var urlHash = window.location.hash;
  var locationHash = location.pathname.split('/').slice(-1)[0];

  if (locationHash == "" || locationHash == "index.html") { // if main page

    if ( ms_ie ) {
        $(taglineImg).css('opacity', '1');
    } else {

      // if not IE, perform header animations
      if (urlHash == "" || urlHash == "#top") {

        headerTL
        .set(idxPage, {overflow: 'hidden'})
        .set(idxNavMenu, {autoAlpha: 0})
        .staggerTo(pathChildren, .05, {autoAlpha: 1, strokeDashoffset: 0}, .05)
        .fromTo(idxNavMenu, 1, {y: -200}, {y: 0, autoAlpha: 1}, '-=.5')
        .from(scrollTag, 1, {x: -200}, '-=1')
        .from(downTag, 1, {x: 200}, '-=1')
        .set(idxPage, {overflow: 'auto'})
        .set(idxNavMenu, {clearProps: "x"}); // reset position
      } else {
        $(taglineImg).css('opacity', '1');

        $('body, html').animate({
          scrollTop: $(urlHash).position().top+'px'
        }, 1000);
      }
    }
  }

  // scroll

  var linkHash = $('a[href^="#"]');
  console.log(linkHash);

  linkHash.click(function(e){
    e.preventDefault();
    var section = $(this).attr('href');

    $('body, html').animate({
      scrollTop: $(section).position().top+'px'
    }, 600);
  });

  // Friction

  var fricElements = [$('.frictionFast'),
                      $('.frictionMed'),
                      $('.frictionSlow')];
  var durationVars = [.5, .75, 1]; // in seconds
  var deltaPosVars = [1, 1, 1];
  var lastPos, newPos = 0;

  function friction(){
    requestAnimationFrame(friction);
    var winScrollTop = $(window).scrollTop();
    lastPos = newPos;
    newPos = winScrollTop;
    var speed = newPos - lastPos;

    for (var i = 0; i < fricElements.length; ++i) {
      var maxDeltaPos = deltaPosVars[i] * speed;
      TweenLite.to(fricElements[i], durationVars[i], {y: maxDeltaPos});
    }
  }

  friction();

});
