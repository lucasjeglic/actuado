document.querySelectorAll('.sr-cards-team-04 .blaze-slider.slider-true').forEach(el => {
  new BlazeSlider(el, {
    all: {
      draggable: false,
      enableAutoplay: el.dataset.autoplay == 'true' ? true : false,
      autoplayInterval: +el.dataset.autoplayspeed * 1000,
      transitionDuration: 300,
      slidesToShow: 3
    },
    '(max-width: 992px)': {
      slidesToShow: 2
    },
    '(max-width: 767px)': {
      slidesToShow: 1
    }
  })
})