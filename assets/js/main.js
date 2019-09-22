(function ($) {
	"use strict";

	/*------------------------------------------------------------------
	[Table of contents]
	
	custom function
	portfolio gird
	banner slider
	single item slider
	number counter and skill bar animation
	skill bar and number counter
	mega navigation menu init
	countdown timer
	back to top
	insta feed
	video popup
	image popup
	map window opener add class
	Code For Switching Style (FOR DEMO)
	Contact From dynamic
	XpeedStudio multipile Maps
	XpeedStudio Maps
	
	
	
	-------------------------------------------------------------------*/

	/*==========================================================
				custom function
	======================================================================*/
	function xsFunction() {
		var xsContact = $('.xs-contact-form-wraper'),
			xsMap = $('.map-wraper-v2');

		xsMap.css('height', xsContact.outerHeight());
	}

	function email_patern(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

	$(window).on('load', function () {

		// custom xs function init
		xsFunction();

		setTimeout(() => {
			$('#preloader').fadeOut();
		}, 500);

		/*==========================================================
				portfolio gird
		======================================================================*/
		if ($('.xs-portfolio-grid').length > 0) {
			var $portfolioGrid = $('.xs-portfolio-grid'),
				colWidth = function () {
					var w = $portfolioGrid.width(),
						columnNum = 1,
						columnWidth = 0;
					if (w > 1200) {
						columnNum = 3;
					} else if (w > 900) {
						columnNum = 3;
					} else if (w > 600) {
						columnNum = 2;
					} else if (w > 450) {
						columnNum = 2;
					} else if (w > 385) {
						columnNum = 1;
					}
					columnWidth = Math.floor(w / columnNum);
					$portfolioGrid.find('.xs-portfolio-grid-item').each(function () {
						var $item = $(this),
							multiplier_w = $item.attr('class').match(/xs-portfolio-grid-item-w(\d)/),
							multiplier_h = $item.attr('class').match(/xs-portfolio-grid-item-h(\d)/),
							width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
							height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.5;
						$item.css({
							width: width,
							//height: height
						});
					});
					return columnWidth;
				},
				isotope = function () {
					$portfolioGrid.isotope({
						resizable: false,
						itemSelector: '.xs-portfolio-grid-item',
						masonry: {
							columnWidth: colWidth(),
							gutterWidth: 3
						}
					});
				};
			isotope();
			$(window).resize(isotope);
		} // End is_exists

	}); // END load Function 

	$(document).ready(function () {

		// custom xs function init
		xsFunction();

		/*==========================================================
				banner slider
		======================================================================*/
		if ($('.xs-banner-slider').length > 0) {
			var bannerSlider = $(".xs-banner-slider");
			bannerSlider.owlCarousel({
				items: 1,
				loop: true,
				mouseDrag: true,
				touchDrag: true,
				dots: false,
				nav: true,
				navText: ['<i class="fa fa-angle-left xs-round-nav"></i>', '<i class="fa fa-angle-right xs-round-nav"></i>'],
				autoplay: false,
				autoplayTimeout: 5000,
				autoplayHoverPause: true,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',
				responsive: {
					// breakpoint from 0 up
					0: {
						nav: false,
					},
					// breakpoint from 480 up
					480: {
						nav: false,
					},
					// breakpoint from 768 up
					991: {
						nav: true,
					}
				}
			});
		}

		/*==========================================================
					single item slider
		======================================================================*/
		if ($('.xs-single-item-slider').length > 0) {
			var singleItemSlider = $(".xs-single-item-slider");
			singleItemSlider.owlCarousel({
				items: 1,
				loop: true,
				mouseDrag: true,
				touchDrag: true,
				dots: false,
				nav: true,
				navText: ['<i class="fa fa-arrow-left xs-square-nav"></i>', '<i class="fa fa-arrow-right xs-square-nav"></i>'],
				autoplay: true,
				autoplayTimeout: 5000,
				autoplayHoverPause: true,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',
				responsive: {
					// breakpoint from 0 up
					0: {
						nav: false,
					},
					// breakpoint from 480 up
					480: {
						nav: false,
					},
					// breakpoint from 768 up
					768: {
						nav: true,
					}
				}
			});
		}


		/*==========================================================
				number counter and skill bar animation
		=======================================================================*/

		var number_percentage = $(".number-percentage");
		function animateProgressBar() {
			number_percentage.each(function () {
				$(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration"), 10));
				var value = $(this).attr("data-value");
				var duration = $(this).attr("data-animation-duration");
				$(this).closest('.xs-skill-bar').find('.xs-skill-track').animate({
					width: value + '%'
				}, 4500);
			});
		}


		if ($('.waypoint-tigger').length > 0) {
			var waypoint = new Waypoint({
				element: document.getElementsByClassName('waypoint-tigger'),
				handler: function (direction) {
					animateProgressBar();
				}
			});
		}

		/*==========================================================
				skill bar and number counter
		=======================================================================*/

		$.fn.animateNumbers = function (stop, commas, duration, ease) {
			return this.each(function () {
				var $this = $(this);
				var start = parseInt($this.text().replace(/,/g, ""), 10);
				commas = (commas === undefined) ? true : commas;
				$({
					value: start
				}).animate({
					value: stop
				}, {
						duration: duration == undefined ? 500 : duration,
						easing: ease == undefined ? "swing" : ease,
						step: function () {
							$this.text(Math.floor(this.value));
							if (commas) {
								$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
							}
						},
						complete: function () {
							if (parseInt($this.text(), 10) !== stop) {
								$this.text(stop);
								if (commas) {
									$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
								}
							}
						}
					});
			});
		};


		/*==========================================================
				mega navigation menu init
		======================================================================*/
		if ($('.xs-menus').length > 0) {
			$('.xs-menus').xs_nav({
				mobileBreakpoint: 992,
			});
		}

		/*==========================================================
				countdown timer
		======================================================================*/
		$('.xs-countdown-timer[data-countdown]').each(function () {
			var $this = $(this),
				finalDate = $(this).data('countdown');

			$this.countdown(finalDate, function (event) {
				var $this = $(this).html(event.strftime(' '
					+ '<span class="timer-count">%-D <span class="timer-title">Days</span></span>  '
					+ '<span class="timer-count">%H <span class="timer-title">Hours</span></span> '
					+ '<span class="timer-count">%M <span class="timer-title">Minutes</span></span> '
					+ '<span class="timer-count">%S <span class="timer-title">Secods</span></span>'));
			});
		});

		/*==========================================================
				back to top
		======================================================================*/
		$(document).on('click', '.xs-back-to-top', function (event) {
			event.preventDefault();
			/* Act on the event */

			$('html, body').animate({
				scrollTop: 0,
			}, 1000);
		});

		/*=============================================================
						insta feed
		=========================================================================*/
		if ($('.xs-demoFeed').length > 0) {
			$.fn.spectragram.accessData = {
				accessToken: '1764162550.ba4c844.679392a432894982bf6a31ec20d8acb0',
				clientID: '289a98508b934dd49a68144b79209813'
			};
			$('.xs-demoFeed').spectragram('getUserFeed', {
				query: 'natgeo',
				max: 9,
				size: 'small',
			});
		}

		/*=============================================================
						video popup
		=========================================================================*/
		if ($('.xs-video-popup').length > 0) {
			$('.xs-video-popup').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}

		/*=============================================================
						image popup
		=========================================================================*/
		$('.xs-image-popup').magnificPopup({
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
			}

		});

		/*==========================================================
				map window opener add class
		======================================================================*/
		$(document).on('click', '.xs-window-opener', function () {
			// body...
			event.preventDefault();

			var main_wraper = $('.xs-widnow-wraper'),
				active_class = 'active';

			if ($(this).parent().parent().hasClass(active_class)) {
				$(this).parent().parent().removeClass(active_class);
			} else {
				$(this).parent().parent().addClass(active_class);
			}
		});

		/*=====================================================
				Contact From dynamic
		 =====================================================*/
		if ($('#xs-contact-form').length > 0) {
			$('#xs-contact-form').on('submit', function (event) {
				event.preventDefault();

				$('.xpeedStudio_success_message').remove();

				var name = $('#xs-name'),
					email = $('#xs-email'),
					massage = $('#xs-massage'),
					submit = $('#xs-submit'),
					error = false;

				if (name.val() === '') {
					error = true;
					name.parent().addClass('invaild');
					name.focus();
					return false;
				} else {
					name.parent().removeClass('invaild');
				}
				if (!email_patern(email.val().toLowerCase())) {
					error = true;
					email.parent().addClass('invaild');
					email.focus();
					return false;
				} else if (email.val() === '') {
					error = true;
					email.parent().addClass('invaild');
					email.focus();
					return false;
				} else {
					email.parent().removeClass('invaild');
				}
				if (massage.val() === '') {
					error = true;
					massage.parent().addClass('invaild');
					massage.focus();
					return false;
				} else {
					massage.parent().removeClass('invaild');
				}

				if (error === false) {
					$.ajax({
						type: "POST",
						url: "assets/php/contact-form.php",
						data: {
							'name': name.val(),
							'email': email.val(),
							'massage': massage.val()
						},
						success: function (result) {
							submit.after('<p class="xpeedStudio_success_message">' + result + '</p>').fadeIn();
							setTimeout(() => {
								$('.xpeedStudio_success_message').fadeOut();
							}, 3000);
							$('#xs-contact-form')[0].reset();
						}
					});
				}
			});
		}

	}); // end ready function

	$(window).on('scroll', function () {

	}); // END Scroll Function 

	$(window).on('resize', function () {
		// custom xs function init
		xsFunction();
	}); // End Resize

	/*==========================================================
				XpeedStudio multipile Maps
	======================================================================*/

	if (($('#xs-multiple-map-1').length > 0) && ($('#xs-multiple-map-2').length > 0) && ($('#xs-multiple-map-3').length > 0)) {

		var latlng = new google.maps.LatLng(28.561287, -81.444465),
			latlng2 = new google.maps.LatLng(28.507561, -81.482359),
			latlng3 = new google.maps.LatLng(29.125285, -82.048823);

		var myOptions = {
			zoom: 3,
			center: latlng,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: true,
			scaleControl: false,
			draggable: true,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};

		var myOptions2 = {
			zoom: 3,
			center: latlng,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: true,
			scaleControl: false,
			draggable: true,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};

		var myOptions3 = {
			zoom: 3,
			center: latlng,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: true,
			scaleControl: false,
			draggable: true,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};


		var map = new google.maps.Map(document.getElementById("xs-multiple-map-1"), myOptions),
			map2 = new google.maps.Map(document.getElementById("xs-multiple-map-2"), myOptions2),
			map3 = new google.maps.Map(document.getElementById("xs-multiple-map-3"), myOptions3);

		var myMarker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "Barnett Park"
		});

		var myMarker2 = new google.maps.Marker({
			position: latlng2,
			map: map2,
			title: "Bill Fredrick Park at Turkey Lake"
		});

		var myMarker3 = new google.maps.Marker({
			position: latlng3,
			map: map3,
			title: "Dogwood Park"
		});
	}

	/*==========================================================
				XpeedStudio Maps
	======================================================================*/

	if ($('#xs-map').length > 0) {
		// When the window has finished loading create our google map below
		google.maps.event.addDomListener(window, 'load', init);
	}
	function init() {
		// Basic options for a simple Google Map

		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: true,
			scaleControl: false,
			draggable: true,
			disableDefaultUI: true,

			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.6700, -73.9400), // New York

			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": "50" }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "lightness": "30" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "lightness": "40" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "lightness": -25 }, { "saturation": -100 }] }]
		};

		// Get the HTML DOM element that will contain your map 
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('xs-map');

		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6700, -73.9400),
			map: map,
			title: 'Snazzy!'
		});
	}

})(jQuery);

// Page Scroll
var sections = $('section')
nav = $('nav[role="navigation"]');

$(window).on('scroll', function () {
	var cur_pos = $(this).scrollTop();
	sections.each(function () {
		var top = $(this).offset().top - 276
		bottom = top + $(this).outerHeight();
		if (cur_pos >= top && cur_pos <= bottom) {
			nav.find('a').removeClass('active');
			nav.find('a[href="/#' + $(this).attr('id') + '"]').addClass('active');
		}
	});
});
nav.find('a').on('click',
	function (e) {
		e.preventDefault(); {
			var $el = $(this)
			id = $el.attr('href');
			id = id.substring(1);
			$('html, body').animate({
				scrollTop: $(id).offset().top
			}, 1000);
			return false;
		}
	});



	
	/*==========================================================
				Lea added galery carousel
	======================================================================*/

	var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}

	/*==========================================================
				Lea added show pic on button
	======================================================================*/

function showPicture() {
	var sourceOfPicture = document.getElementById('bigpic').src;
	var img = document.getElementById('bigpic');
	img.src = sourceOfPicture.replace('90x90', '225x225');
	img.style.display = "block";
  } 

  	/*==========================================================
				Lea added show gallery carousel when clicking the button on activities
	======================================================================*/

  $(document).ready(function() {

	$('a.btn-gallery').on('click', function(event) {
		event.preventDefault();
		
		var gallery = $(this).attr('href');
    
		$(gallery).magnificPopup({
      delegate: 'a',
			type:'image',
			gallery: {
				enabled: true
			}
		}).magnificPopup('open');
	});
	
});

/*==========================================================
	Pedro added scroll effects for the navigation menu
======================================================================*/

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navigation");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= 10) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

/*=========================================================
Pedro added submit form code
===========================================================*/

$(document).ready(function() {
	$('#joinus-form').submit(function(e) {
	  var name    = document.getElementById('inputName')
	  var email   = document.getElementById('inputEmail')
	  var typeSelect   = document.getElementById('inputType')
	  var message = document.getElementById('inputMessage')

	  var type = typeSelect.options[typeSelect.selectedIndex]


	  console.log(type)
  
	  if (!name.value || !email.value || !message.value || !type.value) {
		alertify.error("Por favor preencha todos os campos");
		return false;
	  } else {
		var result = $('#joinus-form').serialize();
		result._captcha = "false"
		$.ajax({
		  method: 'POST',
		  url: 'https://formsubmit.co/somosnos@somosnos.pt',
		  data: result,
		  datatype: 'json'
		});
		e.preventDefault();
		$(this).get(0).reset();
		alertify.success("Mensagem enviada");
	  }
	});
  });



  $(document).ready(function() {
	$('a.donate').on('click', function(event) {
		alertify.alert('Efectue uma doação!', '<p>Muito obrigado pelo seu apoio!</p><p>Qualquer ajuda é muito bem vinda.</p><p>A Associação não tem fins lucrativos e por ser uma IPSS, as contribuições podem ser deduzidas, nos termos da legislação aplicável, em sede de impostos.</p><br /> <br /><p>Informação para transferência:</p><p><b>Banco:</b> BCP</p><p><b>IBAN:</b> PT50003300004534211621005</p><p><b>BIC/SWIFT:</b> BCOMPTPL</p><br /><br />Por favor envie-nos um comprovativo da sua doação para: somosnos@somosnos.pt');
	});
});


  