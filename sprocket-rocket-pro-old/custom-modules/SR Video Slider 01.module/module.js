document
    .querySelectorAll('.sr-video-slider-01 .blaze-slider')
    .forEach(el => {
        const slider = new BlazeSlider(el, {
            all: {
                draggable: false,
                enableAutoplay: el.dataset.autoplay == 'true' ? true : false,
                autoplayInterval: +el.dataset.autoplayspeed * 1000,
                transitionDuration: 300,
                slidesToShow: 3,
                slidesToScroll: 1
            },
            '(max-width: 767px)': {
                slidesToShow: 1
            }
        });

        // Add keyboard navigation
        el.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    slider.prev();
                    updateFocusableSlides(el);
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    slider.next();
                    updateFocusableSlides(el);
                    break;
            }
        });

        // Make the slider container focusable but remove outline
        el.setAttribute('tabindex', '0');
        el.style.outline = 'none';
        
        // Initial setup of focusable slides
        updateFocusableSlides(el);

        setTimeout(() => {
            equalHeight(el.querySelectorAll('.slide-image'))
        }, 100)
        window.addEventListener("resize", function () {
            equalHeight(el.querySelectorAll('.slide-image'))
        });
    })


var trigger = document.querySelectorAll('[data-theVideo]');

trigger.forEach(function (element) {
    element.addEventListener("click", function () {
        var theModal = this.getAttribute("data-target");
        var videoSRC = this.getAttribute("data-theVideo");
        var modalElement = document.querySelector(theModal);
        modalElement.removeAttribute('aria-hidden');
        modalElement.setAttribute('tabindex', '0');
        modalElement.addEventListener('hidden.bs.modal', function () {
            modalElement.setAttribute('aria-hidden', 'true');
            modalElement.setAttribute('tabindex', '-1');
            modalElement.querySelector('video').pause();
        }, { once: true });

        document.querySelector(theModal + " video").pause();
        document.querySelector(theModal + " video source").setAttribute('src', videoSRC);
        document.querySelector(theModal + " video").load();
        document.querySelector(theModal + " video").play();
    });
});



var slides = document.querySelectorAll(".video-slide");

slides.forEach(function (slide) {
    slide.addEventListener("mouseenter", function () {
        var video = slide.querySelector("video");
        var videoSRC = video.getAttribute("data-src");

        if (!video.src) {
            fetchVideoAndPlay(video, videoSRC);
        } else {
            playVideo(video);
        }
    });

    slide.addEventListener("mouseleave", function () {
        var video = slide.querySelector("video");
        video.pause();
    });
});

function fetchVideoAndPlay (video, videoSRC) {
    fetch(videoSRC)
        .then(function (response) {
            return response.blob();
        })
        .then(function (blob) {
            var objectURL = URL.createObjectURL(blob);
            video.src = objectURL;
            video.load();
            video.closest('.video-slide').classList.add("loaded");
            playVideo(video);
        })
        .catch(function (error) {
            console.error("Error fetching video:", error);
        });
}

function playVideo (video) {
    var playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(function (error) {
            video.play();
        });
    }
}

// Add this new function to manage focusable slides
function updateFocusableSlides(sliderEl) {
    // Remove tabindex from all slides first
    sliderEl.querySelectorAll('.video-slide').forEach(slide => {
        slide.setAttribute('tabindex', '-1');
        slide.style.outline = 'none';
    });

    // Add tabindex to visible slides
    const visibleSlides = sliderEl.querySelectorAll('.video-slide:not(.blaze-hidden)');
    visibleSlides.forEach(slide => {
        slide.setAttribute('tabindex', '0');
    });
}