 $(document).ready(function(){

$('#gallery-thumbs').owlCarousel({
  items:3,
  loop:true,
  center:true,
  responsive: {
    768: {
      items:4,
    },
    1200: {
      items:5,
    },
  },
});

var mainImgUrl = $('#gallery-start-photo').attr('href');

$('#gallery-main-pict').html('<img src="'+mainImgUrl+'" alt="" />');

$('#gallery-thumbs a').on('click', function(e){
  e.preventDefault();
  var imageUrl = $(this).attr('href');
  $('#gallery-main-pict').html('<img src="'+imageUrl+'" alt="" />');
})

});