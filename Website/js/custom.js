(function ($) {
  "use strict";

  $(document).ready(function() {
    $('select').niceSelect();
  });

$(document).ready(function() {
  $('select').niceSelect();
});

var review = $('.client_review_part');
if (review.length) {
  review.owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    nav: false,
    smartSpeed: 2000,
  });
}

//------- Mailchimp js --------//  
function mailChimp() {
  $('#mc_embed_signup').find('form').ajaxChimp();
}
mailChimp();


}(jQuery));