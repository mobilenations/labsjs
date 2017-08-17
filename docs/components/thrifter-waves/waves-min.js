$(function(){

  var l = 0;
  function thrifterWaveInViewCheck(){
    var c = $(window).scrollTop();
    $.each($thrifter_wave__inview, function(){
      if($(this).isInViewport() && c >= l){
        $(this).addClass('thrifter-wave-inview--active');
      } else {
        $(this).removeClass('thrifter-wave-inview--active');
      }
    });
    l = c;
  }

  var $thrifter_wave__inview = $('.thrifter-wave-inview');
  $(window).on('resize scroll', thrifterWaveInViewCheck);

  $.fn.isInViewport = function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();

      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  
});


