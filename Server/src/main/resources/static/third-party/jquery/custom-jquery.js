(function ($) {
    "use strict";

// Animsition Loading
jQuery(window).on("load", function() {     
    function handlePreloader() {
	  var preloader = $('.animsition-preloader');
	  if(preloader.length){
	  preloader.delay(200).fadeOut(500);
	  }
    }
    handlePreloader(); 
});

// Header Sticky
$(window).on('scroll',function() {
	var stickytop = $('#header.sticky-top .bg-transparent');
	var stickytopslide = $('#header.sticky-top-slide');
	
	if ($(this).scrollTop() > 1){  
		stickytop.addClass("sticky-on-top");
		stickytop.find(".logo img").attr('src',stickytop.find('.logo img').data('sticky-logo'));
	}
	else {
		stickytop.removeClass("sticky-on-top");
		stickytop.find(".logo img").attr('src',stickytop.find('.logo img').data('default-logo'));
	}
	
	if ($(this).scrollTop() > 200){  
		stickytopslide.find(".primary-menu").addClass("sticky-on");
		stickytopslide.find(".logo img").attr('src',stickytopslide.find('.logo img').data('sticky-logo'));
	}
	else{
		stickytopslide.find(".primary-menu").removeClass("sticky-on");
		stickytopslide.find(".logo img").attr('src',stickytopslide.find('.logo img').data('default-logo'));
	}
});

// Smooth Scroll
if($("body").hasClass("side-header")){
$('.smooth-scroll').on('click', function() {
	event.preventDefault();
    var sectionTo = $(this).attr('href');
	$('html, body').stop().animate({
      scrollTop: $(sectionTo).offset().top}, 1500, 'easeInOutExpo');
});
   }else {
$('.smooth-scroll').on('click', function() {
	event.preventDefault();
    var sectionTo = $(this).attr('href');
	$('html, body').stop().animate({
      scrollTop: $(sectionTo).offset().top - 50}, 1500, 'easeInOutExpo');
});
}

// sections background image from data background
var pageSection = $(".bg-img, section");
pageSection.each(function(indx) {

	if ($(this).attr("data-background")) {
		$(this).css("background-image", "url(" + $(this).data("background") + ")");
	}
});

// Mobile Menu
$('.navbar-toggler').on('click', function() {
	$(this).toggleClass('show');
});
$(".navbar-nav a").on('click', function() {
    $(".navbar-collapse, .navbar-toggler").removeClass("show");
});

// Overlay Menu & Side Open Menu
$('.navbar-side-open .collapse, .navbar-overlay .collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
    e.preventDefault();
}),
$('.navbar-side-open [data-toggle="collapse"], .navbar-overlay [data-toggle="collapse"]').on('click', function(e) {
   e.preventDefault();
   $($(this).data('target')).toggleClass('show');
})

// Owl Carousel
$(".owl-carousel").each(function (index) {
    var a = $(this);
	$(this).owlCarousel({
		autoplay: a.data('autoplay'),
		center: a.data('center'),
		autoplayTimeout: a.data('autoplaytimeout'),
		autoplayHoverPause: a.data('autoplayhoverpause'),
		loop: a.data('loop'),
		speed: a.data('speed'),
		nav: a.data('nav'),
		dots: a.data('dots'),
		autoHeight: a.data('autoheight'),
		autoWidth: a.data('autowidth'),
		margin: a.data('margin'),
		stagePadding: a.data('stagepadding'),
		slideBy: a.data('slideby'),
		lazyLoad: a.data('lazyload'),
		navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		animateOut: a.data('animateout'),
		animateIn: a.data('animatein'),
		video: a.data('video'),
		items: a.data('items'),
		responsive:{
        0:{items: a.data('items-xs'),},
        576:{items: a.data('items-sm'),},
		768:{items: a.data('items-md'),},
        992:{items: a.data('items-lg'),}
        }
    });
});

// Text Rotator Animation
$(".text-rotator").each(function () {
    $(this).Morphext({
		speed: 3000, // Overrides default 2000
	});
});

// Typed Text Animation
$(".typed").each(function() {
var typed = new Typed('.typed', {
    stringsElement: '.typed-strings',
	loop: true,
	typeSpeed: 100,
    backSpeed: 50,
	backDelay: 1500,
});
});

// WOW Animation
$(".wow").each(function() {
 if ($(window).width() > 767) {
   var wow = new WOW({
     boxClass: 'wow',
     animateClass: 'animated',
     offset: 0,
     mobile: false,
     live: true
   });
  new WOW().init();
 }
});

// YTPlayer Background
$(".player").each(function () {
    $(this).mb_YTPlayer();
});

// Tooltips
$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

// Utf Popup Gallery Modal 
$('.utf-popup-gallery-item').each(function() {
$(this).magnificPopup({
	delegate: '.utf-popup-link:visible',
    mainClass: "mfp-fade",
	closeBtnInside: true,
	midClick: true,
	gallery: {
      enabled: true,
    },	
});
});

// Popup Youtube Video, Popup Viemo Video, Popup Gmaps
$('.popup-youtube, .popup-vimeo, .popup-gmaps').each(function() {
$(this).magnificPopup({
        type: 'iframe',
		mainClass: 'mfp-fade',
});
});

// Portfolio Filter
$(window).on('load', function () {
$(".utf-portfolio-filter-item").each(function() {
    var e = $(this);
	var $grid = e.isotope({
        layoutMode: "masonry",
    });
	$(".utf-portfolio-filter-menu").find("a").on("click", function() {
        var filterValue = $(this).attr("data-filter");
        return $(".utf-portfolio-filter-menu").find("a").removeClass("active"), $(this).addClass("active"), 
		$grid.isotope({
          filter: filterValue
        }), !1
    });
	});
});

// Parallax Background
$(".parallax").each(function () {
$(this).parallaxie({
	speed: 0.5,
});
});

// Counter
$(".counter").each(function () {
    $(this).appear(function () {
        $(this).countTo({
			speed: 1800,
		});
    });
});

// Scroll Back to Top
$(function () {
  $(window).on('scroll', function(){
	if ($(this).scrollTop() > 400) {
		$('#back-to-top').fadeIn();
	} else {
		$('#back-to-top').fadeOut();
	}
  });
});

$('#back-to-top').on("click", function() {
	$('html, body').animate({scrollTop:0}, 'slow');
	return false;
});

})(jQuery)