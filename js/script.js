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


// Rest-type-switcher табы home-page

var tabs = document.querySelectorAll('.rest-type-switcher__tabs .rest-type-switcher__tab-item a');
var restType = document.querySelectorAll('.rest-type-switcher__type .rest-type-switcher__type-item');

function changeTab(event) {
  event.preventDefault();
  for (var i=0; i<tabs.length; i++) {
    tabs[i].parentNode.classList.remove('rest-type-switcher__is-active');
  }
  event.target.parentNode.classList.add('rest-type-switcher__is-active');
  for (var i=0; i<tabs.length; i++) {
    restType[i].classList.remove('rest-type-switcher__is-active');
  }

var link = event.target.getAttribute('href');
document.querySelector(link).classList.add('rest-type-switcher__is-active');
}

for (var i=0; i<tabs.length; i++) {
  tabs[i].addEventListener('click', changeTab);
};


// Sales-offers owl-carousel
  $('#sales-offers').owlCarousel({
    items: 1,
    nav: false
  });

  // Cards carousel
  $('#cards-owl').owlCarousel({
    responsive: {
      768: {
        items: 2,
        nav: false
      }
    }
  });


