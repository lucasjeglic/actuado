document
    .querySelectorAll('.sr-clients-carousel-01 .blaze-slider[data-carousel="true"]')
    .forEach(el => {
        new BlazeSlider(el, {
            all: {
                draggable: true,
                enableAutoplay: el.dataset.autoplay == 'true' ? true : false,
                autoplayInterval: +el.dataset.autoplayspeed * 1000,
                transitionDuration: 300,
                slidesToShow: +el.dataset.slides,
                slidesToScroll: 1
            },
            '(max-width: 767px)': {
                slidesToShow: 3
            },
            '(max-width: 567px)': {
                slidesToShow: 2
            }
        })
    })