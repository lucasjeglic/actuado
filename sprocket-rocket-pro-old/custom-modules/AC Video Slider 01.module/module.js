document
    .querySelectorAll('.sr-video-slider-01 .blaze-slider')
    .forEach(el => {
        new BlazeSlider(el, {
            all: {
                draggable: false,
				arrows: el.dataset.arrows == 'true' ? true : false,
				pagination: el.dataset.pagination == 'true' ? true : false,
                enableAutoplay: el.dataset.autoplay == 'true' ? true : false,
                autoplayInterval: +el.dataset.autoplayspeed * 1000,
                transitionDuration: 300,
                slidesToShow: 3,
                slidesToScroll: 1
            },
            '(max-width: 767px)': {
                slidesToShow: 1
            }
        })
        setTimeout(() => {

            equalHeight(el.querySelectorAll('.slide-image'))
        }, 100)
        window.addEventListener("resize", function () {
            equalHeight(el.querySelectorAll('.slide-image'))
        });
    })


var trigger = document.querySelectorAll('[data-theVideo');

trigger.forEach(function (element) {
    element.addEventListener("click", function () {
        var theModal = this.getAttribute("data-target");
        var videoSRC = this.getAttribute("data-theVideo");

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

