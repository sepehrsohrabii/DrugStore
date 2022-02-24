// from sample website - START
$(document).ready(function (l) {

    // **************  fixed header
    $(window).scroll(function () {
        if ($(this).scrollTop() > 60) {
            $('header.main-header.js-fixed-header').addClass('fixed');
            $('header.main-header.js-fixed-topbar').addClass('fixed fixed-topbar');
        } else {
            $('header.main-header.js-fixed-header').removeClass('fixed');
            $('header.main-header.js-fixed-topbar').removeClass('fixed fixed-topbar');
        }
    });

    // **************  search
  //  $(".search-area form.search input").keyup(function(){
  //      if ($(this).val().length == 0) {
   //         // Hide the element
   //         $(".search-result").removeClass('open');
   //         $(".close-search-result").removeClass('show');
   //       } else {
   //         // Otherwise show it
   //         $(".search-result").addClass('open');
  //          $(".close-search-result").addClass('show');
  //        }
  //  });
  //  $(".close-search-result").on('click',function(){
   //     $(this).removeClass('show');
  //      $(".search-result").removeClass('open');  
  //  });

  // SEARCH START *************************************
    const url = window.location.href
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search-input')
    var resultsBox = document.getElementById('results-box')
    const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value
    var owl = $('#results-box');
    const sendSearchData = (product) => {
        $.ajax({
            type: 'POST',
            //url: 'search_results/',
            
            url: search_url,
            data: {
                'csrfmiddlewaretoken': csrf,
                'product': product,
            },
            success: (res) => {
                console.log(res)
                var data = res.data
                if (Array.isArray(data)) {
                    owl.trigger('destroy.owl.carousel');
                    resultsBox.innerHTML = ''
                    resultsBox.classList.add('owl-carousel')
                    data.forEach(product => {
                        resultsBox.innerHTML += `
                            <div class="item search-product-item">
                                <a href="/product_detail/${product.id}/${product.slug}">
                                    <div class="row">
                                        <div class="col-4">
                                            <img src="${product.image}">
                                        </div>
                                        <div class="col-8 align-self-center">
                                            <h6>${product.title}</h6>
                                            <p>${product.category}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        `
                    });
                    owl.owlCarousel({
                        rtl: true,
                        stagePadding: 50,
                        loop:true,
                        margin:10,
                        merge:true,
                        dots: false,
                        responsive:{
                            678:{
                                mergeFit:true
                            },
                            1000:{
                                mergeFit:false
                            }
                        }
                        
                    });
                } else {
                    if (searchInput.value.length > 0) {
                        resultsBox.classList.remove('owl-carousel')
                        resultsBox.innerHTML = `<b>${data}</b>`
                        
                    } else {
                        resultsBox.classList.add('not-visible')
                        
                        resultsBox.innerHTML = ''
                        owl.trigger('destroy.owl.carousel');
                    }
                }
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    searchInput.addEventListener('keyup', e=>{
        console.log(e.target.value)
       
        if (resultsBox.classList.contains('not-visible')){
            resultsBox.classList.remove('not-visible')
        }
        sendSearchData(e.target.value)
        
        
    })
    
  // SEARCH END **************************************
  // search result box slider - START
 
  // search result box slider - END

    // **************  category slider
    $(".category-slider").owlCarousel({
        rtl: true,
        margin: 10,
        nav: true,
        navText: ['<i class="mdi mdi mdi-chevron-right"></i>', '<i class="mdi mdi mdi-chevron-left"></i>'],
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                slideBy: 1
            },
            576: {
                items: 3,
                slideBy: 2
            },
            768: {
                items: 4,
                slideBy: 2
            },
            992: {
                items: 6,
                slideBy: 3
            },
            1400: {
                items: 8,
                slideBy: 4
            }
        }
    });

    /* **************  tooltip */
    $('[data-toggle="tooltip"]').tooltip();

    /* **************  product-carousel */
    /* carousel-lg */
    $(".carousel-lg").owlCarousel({
        rtl: true,
        margin: 10,
        nav: true,
        navText: ['<i class="mdi mdi mdi-chevron-right"></i>', '<i class="mdi mdi mdi-chevron-left"></i>'],
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                slideBy: 1
            },
            480: {
                items: 2,
                slideBy: 1
            },
            576: {
                items: 3,
                slideBy: 1
            },
            768: {
                items: 4,
                slideBy: 2
            },
            992: {
                items: 4,
                slideBy: 2
            },
            1200: {
                items: 5,
                slideBy: 3
            },
            1400: {
                items: 6,
                slideBy: 4
            }
        }
    });
    /* carousel-md */
    $(".carousel-md").owlCarousel({
        rtl: true,
        margin: 10,
        nav: true,
        navText: ['<i class="mdi mdi mdi-chevron-right"></i>', '<i class="mdi mdi mdi-chevron-left"></i>'],
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                slideBy: 1
            },
            480: {
                items: 2,
                slideBy: 1
            },
            576: {
                items: 3,
                slideBy: 1
            },
            768: {
                items: 3,
                slideBy: 2
            },
            992: {
                items: 4,
                slideBy: 2
            },
            1200: {
                items: 4,
                slideBy: 3
            },
            1400: {
                items: 5,
                slideBy: 4
            }
        }
    });

    /* ************** suggestion-slider */
    $("#suggestion-slider").owlCarousel({
        rtl: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        loop: true,
        dots: true,
        onInitialized: startProgressBar,
        onTranslate: resetProgressBar,
        onTranslated: startProgressBar
    }); 
    function startProgressBar() {
      // apply keyframe animation
      $(".slide-progress").css({
        width: "100%",
        transition: "width 5000ms"
      });
    }
    function resetProgressBar() {
      $(".slide-progress").css({
        width: 0,
        transition: "width 0s"
      });
    }

    /* ************** product-gallery */
    var e = document;
    $(".product-carousel").owlCarousel({
        rtl: true,
        items: 1,
        loop: false,
        dots: false,
        nav: true,
        navText: ['<i class="mdi mdi mdi-chevron-right"></i>', '<i class="mdi mdi mdi-chevron-left"></i>'],
        URLhashListener: true,
        startPosition: "URLHash",
        onTranslate: function (t) {
            var a = t.item.index,
                e = l(".owl-item").eq(a).find("[data-hash]").attr("data-hash");
            l(".product-thumbnails li").removeClass("active"), l('[href="#' + e + '"]').parent().addClass("active"), l('[data-hash="' + e + '"]').parent().addClass("active")
        }
    });

    /* ************** sidebar-sticky */
    if ($('.container .sticky-sidebar').length) {
        $('.container .sticky-sidebar').theiaStickySidebar();
    }

    /* ************** product-params */
    $(".product-params .sum-more").click(function () {
        var sumaryBox = $(this).parents('.product-params');
        sumaryBox.toggleClass('active');

        $(this).find('i').toggleClass('active');

        $(this).find('.show-more').fadeToggle(0);
        $(this).find('.show-less').fadeToggle(0);

    });

    /* ************** horizontal-menu */
    //$('.ah-tab-wrapper').horizontalmenu({
    //    itemClick : function(item) {
    //        $('.ah-tab-content-wrapper .ah-tab-content').removeAttr('data-ah-tab-active');
    //        $('.ah-tab-content-wrapper .ah-tab-content:eq(' + $(item).index() + ')').attr('data-ah-tab-active', 'true');
    //        return false; //if this finction return true then will be executed http request
    //    }
    //});

    /* ************** shopping */
    $("#btn-checkout-contact-location").click(function () {
        $(".checkout-address").addClass("show");
        $(".checkout-contact-content").addClass("hidden");
    });

    $("#cancel-change-address-btn").click(function () {
        $(".checkout-address").removeClass("show");
        $(".checkout-contact-content").removeClass("hidden");
    });

    /* ************** nice-select */
    if($('.custom-select-ui').length){
        $('.custom-select-ui select').niceSelect();
    }

    /* ************** verify-phone-number */
    if ($("#countdown-verify-end").length) {
        var $countdownOptionEnd = $("#countdown-verify-end");

        $countdownOptionEnd.countdown({
            date: (new Date()).getTime() + 120 * 1000, // 1 minute later
            text: '<span class="day">%s</span><span class="hour">%s</span><span>: %s</span><span>%s</span>',
            end: function () {
                $countdownOptionEnd.html("<a href='' class='btn-link-border'>ارسال مجدد</a>");
            }
        });

        $(".line-number").keyup(function () {
            $(this).next().focus();
        });
    }

    /* ************** back-to-top */
    $(".back-to-top a").click(function() {
        $("body,html").animate({
            scrollTop: 0
        }, 700);
        return false;
    });

    /* ************** responsive-header */
    $('header.main-header button.btn-menu').click(function(){
        $('header.main-header .side-menu').addClass('open');
        $('header.main-header .overlay-side-menu').addClass('show');
    });

    $('header.main-header .overlay-side-menu.show').click(function(){
        $(this).removeClass('show');
        $('header.main-header .side-menu').removeClass('open');
    });
    $('button.btn-menu').on('click', function() {
        $('.overlay-side-menu').fadeIn(200);
        $('header.main-header .side-menu').addClass("open");
    });

    $('.overlay-side-menu').on('click', function() {
        if ($('header.main-header .side-menu').hasClass('open')) {
            $('header.main-header .side-menu').removeClass('open');
        }
        $(this).fadeOut(200);
    });
    $('header.main-header .side-menu li.active').addClass('open').children('ul').show();
    $("header.main-header .side-menu li.sub-menu> a").on('click', function () {
        $(this).removeAttr('href');
        var e = $(this).parent('li');
        if (e.hasClass('open')) {
            e.removeClass('open');
            e.find('li').removeClass('open');
            e.find('ul').slideUp(400);

        } else {
            e.addClass('open');
            e.children('ul').slideDown(400);
            e.siblings('li').children('ul').slideUp(400);
            e.siblings('li').removeClass('open');
        }
    });

    /* ************** favorites product */
    $("ul.gallery-options button.add-favorites").on("click", function () {
        $(this).toggleClass("favorites");
    });

    /* ************** colorswitch */
    if($('#colorswitch-option').length) {
        $('#colorswitch-option button').on('click',function() {
            $('#colorswitch-option ul').toggleClass('show');
        });
        $('#colorswitch-option ul li').on('click',function(){
            $('#colorswitch-option ul li').removeClass('active');
            $(this).addClass('active');
            var colorPath = $(this).attr("data-path");
            $('#colorswitch').attr('href',colorPath);
        });
    }

});
// from sample website -End

$(document).ready(function(){
  $('.slider-1').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: $('.carousel-prev-1'),
    nextArrow: $('.carousel-next-1'),
    responsive: [
        {
            breakpoint: 1696,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: true,

            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});

$('.slider-2').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: $('.carousel-prev-2'),
    nextArrow: $('.carousel-next-2'),
    responsive: [
        {
            breakpoint: 1696,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,

            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});

$('.slider-3').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: $('.carousel-prev-3'),
    nextArrow: $('.carousel-next-3'),
    responsive: [
        {
            breakpoint: 1696,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,

            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});
$('.slider-4').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: $('.carousel-prev-4'),
    nextArrow: $('.carousel-next-4'),
    responsive: [
        {
            breakpoint: 1696,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,

            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});

$('.slider-5').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: $('.carousel-prev-5'),
    nextArrow: $('.carousel-next-5'),
    responsive: [
        {
            breakpoint: 1696,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,

            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});
      
  });

  ///////////Back to top دکمه
  //Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$(function() {
    $('.dropdown-menu').on('click', function(event) {
      event.stopPropagation();
    });
  });

// Shop Page Start ************************************
//range price

$('.slider').each(function(e) {

    var slider = $(this),
        width = slider.width(),
        handle,
        handleObj;

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 ' + width + ' 83');

    slider.html(svg);
    slider.append($('<div>').addClass('active').html(svg.cloneNode(true)));
    

    
    slider.slider({
        range: true,
        values: [min_price,max_price],
        min: 0,
        step: 5,
        minRange: 1000,
        max: 5000000,
        create(event, ui) {
            slider.find('.ui-slider-handle').append($('<div />'));
            $(slider.data('value-0')).html(slider.slider('values', 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،'));
            $(slider.data('value-1')).html(slider.slider('values', 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،'));
            $(slider.data('range')).html((slider.slider('values', 1) - slider.slider('values', 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،'));
            
            setCSSVars(slider);

        },
        start(event, ui) {

            $('body').addClass('ui-slider-active');

            handle = $(ui.handle).data('index', ui.handleIndex);
            handleObj = slider.find('.ui-slider-handle');

        },
        change(event, ui) {
            setCSSVars(slider);
        },
        slide(event, ui) {

            let min = slider.slider('option', 'min'),
                minRange = slider.slider('option', 'minRange'),
                max = slider.slider('option', 'max');

            if(ui.handleIndex == 0) {
                if((ui.values[0] + minRange) >= ui.values[1]) {
                    slider.slider('values', 1, ui.values[0] + minRange);
                }
                if(ui.values[0] > max - minRange) {
                    return false;
                }
            } else if(ui.handleIndex == 1) {
                if((ui.values[1] - minRange) <= ui.values[0]) {
                    slider.slider('values', 0, ui.values[1] - minRange);
                }
                if(ui.values[1] < min + minRange) {
                    return false;
                }
            }

            $(slider.data('value-0')).html(ui.values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،'));
            $(slider.data('value-1')).html(ui.values[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،'));
            $(slider.data('range')).html((slider.slider('values', 1) - slider.slider('values', 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،'));
            $( "#input-first" ).val(ui.values[0]);
            $( "#input-second" ).val(ui.values[1]);
            setCSSVars(slider);
            

        },
        stop(event, ui) {

            $('body').removeClass('ui-slider-active');

            let duration = .6,
                ease = Elastic.easeOut.config(1.08, .44);

            TweenMax.to(handle, duration, {
                '--y': 0,
                ease: ease
            });

            TweenMax.to(svgPath, duration, {
                y: 42,
                ease: ease
            });

            handle = null;
            $("#shop-filter").submit();
        }
    });

    var svgPath = new Proxy({
        x: null,
        y: null,
        b: null,
        a: null
    }, {
        set(target, key, value) {
            target[key] = value;
            if(target.x !== null && target.y !== null && target.b !== null && target.a !== null) {
                slider.find('svg').html(getPath([target.x, target.y], target.b, target.a, width));
            }
            return true;
        },
        get(target, key) {
            return target[key];
        }
    });

    svgPath.x = width / 2;
    svgPath.y = 42;
    svgPath.b = 0;
    svgPath.a = width;

    $(document).on('mousemove touchmove', e => {
        if(handle) {

            let laziness = 4,
                max = 24,
                edge = 52,
                other = handleObj.eq(handle.data('index') == 0 ? 1 : 0),
                currentLeft = handle.position().left,
                otherLeft = other.position().left,
                handleWidth = handle.outerWidth(),
                handleHalf = handleWidth / 2,
                y = e.pageY - handle.offset().top - handle.outerHeight() / 2,
                moveY = (y - laziness >= 0) ? y - laziness : (y + laziness <= 0) ? y + laziness : 0,
                modify = 1;

            moveY = (moveY > max) ? max : (moveY < -max) ? -max : moveY;
            modify = handle.data('index') == 0 ? ((currentLeft + handleHalf <= edge ? (currentLeft + handleHalf) / edge : 1) * (otherLeft - currentLeft - handleWidth <= edge ? (otherLeft - currentLeft - handleWidth) / edge : 1)) : ((currentLeft - (otherLeft + handleHalf * 2) <= edge ? (currentLeft - (otherLeft + handleWidth)) / edge : 1) * (slider.outerWidth() - (currentLeft + handleHalf) <= edge ? (slider.outerWidth() - (currentLeft + handleHalf)) / edge : 1));
            modify = modify > 1 ? 1 : modify < 0 ? 0 : modify;

            if(handle.data('index') == 0) {
                svgPath.b = currentLeft / 2  * modify;
                svgPath.a = otherLeft;
            } else {
                svgPath.b = otherLeft + handleHalf;
                svgPath.a = (slider.outerWidth() - currentLeft) / 2 + currentLeft + handleHalf + ((slider.outerWidth() - currentLeft) / 2) * (1 - modify);
            }

            svgPath.x = currentLeft + handleHalf;
            svgPath.y = moveY * modify + 42;

            handle.css('--y', moveY * modify);

        }
    });

});

function getPoint(point, i, a, smoothing) {
    let cp = (current, previous, next, reverse) => {
            let p = previous || current,
                n = next || current,
                o = {
                    length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                    angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                },
                angle = o.angle + (reverse ? Math.PI : 0),
                length = o.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, before, after, width) {
    let smoothing = .16,
        points = [
            [0, 42],
            [before <= 0 ? 0 : before, 42],
            update,
            [after >= width ? width : after, 42],
            [width, 42]
        ],
        d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
    return `<path d="${d}" />`;
}

function setCSSVars(slider) {
    let handle = slider.find('.ui-slider-handle');
    slider.css({
        '--l': handle.eq(0).position().left + handle.eq(0).outerWidth() / 2,
        '--r': slider.outerWidth() - (handle.eq(1).position().left + handle.eq(1).outerWidth() / 2)
    });
}


//document.getElementById('checkbox1').addEventListener('change', (e) => {
//    this.checkboxValue = e.target.checked ? 'on' : 'off';
//    console.log(this.checkboxValue)
//  })

  
// Shop Page End **************************************

// Shiping page start *********************************
function wayss() {
    var waw_ch = document.querySelector('input[name=way]:checked').id;
    document.querySelector('.cc').setAttribute('action', '/way_selected/' + waw_ch);
    document.getElementById('shipping-data-form').submit();
};
// shipping page end **********************************

