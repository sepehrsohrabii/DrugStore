$(document).ready(function(){
    
  $('.slider').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: $('.carousel-prev'),
    nextArrow: $('.carousel-next'),
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
      
  });