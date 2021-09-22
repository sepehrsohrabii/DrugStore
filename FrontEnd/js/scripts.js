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


      
  });

  ///////////Back to top دکمه
  //Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}