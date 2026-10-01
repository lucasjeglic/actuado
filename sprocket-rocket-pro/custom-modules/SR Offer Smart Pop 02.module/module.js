document.addEventListener("DOMContentLoaded", function () {
    const smartPop = document.querySelector('.sr-offer-smart-pop-02');
    let delay = parseInt(smartPop.dataset.timer, 10);
    delay = (delay >= 0) ? delay : 0;
    const tl = gsap.timeline();
    const smartPopId = smartPop.getAttribute('id');

    function openSmartPop () {
        tl.to(smartPop, { 'max-width': '500px', duration: .5 })
            .to(".close-image", { y: -100, duration: .5 }, "-=.5")
            .to(".open-image", { duration: 1, width: 80, y: -40 }, "-=1.25")
            .to(".smart-pop-teaser .smart-pop-teaser-wrapper", { duration: 1, opacity: 0, right: -50, height: 0 }, "-=1.5")
            .to(".smart-pop-form", { duration: 0, padding: '2rem' })
            .to(".smart-pop-form", { duration: .5, opacity: 1, height: "auto", display: 'block' })
            .to(".open-image", { duration: .5, height: 'auto' }, "-=.85")
            .to(".open-image", { duration: .5, opacity: 1 }, "-=.25")
            .to("a.pop-close", { duration: .5, opacity: 1 }, "-=.25")
            .to(smartPop, { duration: .5, delay: 0, bottom: 15 }, "-=1");
    }

    function closeSmartPop () {
        tl.to(".smart-pop-form", { duration: .5, opacity: 0, height: 0 })
            .to(".smart-pop-form", { duration: 0, padding: '0' })
            .to(smartPop, { duration: 0, delay: 0, bottom: 15 }, "-=.5")
            .to(smartPop, { duration: .5, 'max-width': '450px' }, "-=.5")
            .to(".smart-pop-teaser .smart-pop-teaser-wrapper", { duration: .5, opacity: 1, right: 0, height: '100%' })
            .to(".open-image", { duration: .5, opacity: 0 }, "-=1.5")
            .to(".open-image", { duration: .5, height: 1 }, "-=1.5")
            .to(".open-image", { duration: 1, width: 1 }, "-=1.5")
            .to(".close-image", { y: 0, duration: .5 }, "-=.5");
    }

    // Bind openSmartPop to all elements with data-toggle="modal" that match smartPop's ID
    const modalToggles = document.querySelectorAll('[data-toggle="modal"]');
    modalToggles.forEach(function (toggle) {
        const target = toggle.getAttribute('data-target');
        if (target === '#' + smartPopId) {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                openSmartPop();
            });
        }
    });

    smartPop.querySelector('.smart-pop-teaser-wrapper').addEventListener("click", function (e) {
        e.preventDefault();
        openSmartPop();
    });

    smartPop.querySelector('.pop-close').addEventListener("click", function (e) {
        e.preventDefault();
        closeSmartPop();
    });

    // Initial animation with delay
    if (delay >= 0) {
        tl.to(smartPop, { duration: .5, delay: delay, bottom: 15 });
    }
});