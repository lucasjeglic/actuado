document.addEventListener('DOMContentLoaded', function () {
  // Check if GSAP is available first
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  Array.from(document.querySelectorAll('.sr-hero-04')).forEach(function (instance) {
    // Parallax and background animations (if needed)
    if (instance.dataset.parallax === 'true') {
      var coverInner = instance.querySelector('.sr-cover-inner');
      gsap.to(coverInner, {
        scrollTrigger: {
          trigger: instance,
          start: 'bottom bottom',
          end: '60%',
          scrub: true
        },
        y: 30
      });

      var backgroundOption = instance.dataset.backgroundOption;
      if (backgroundOption === 'image' || backgroundOption === 'video') {
        var coverImage = instance.querySelector('.sr-cover-image');
        gsap.to(coverImage, {
          scrollTrigger: {
            trigger: instance,
            start: 'top top',
            end: '250%',
            scrub: true
          },
          y: '80%',
          ease: 'none'
        });
        gsap.to(coverImage, {
          scrollTrigger: {
            trigger: instance,
            start: 'top top',
            end: '50%',
            scrub: true
          },
          opacity: 0.4,
          ease: 'none'
        });
      }
    }

    // Heading animation
    var heading = instance.querySelector('.heading');
    if (heading) {
      gsap.fromTo(heading, {
        opacity: 0,
        y: 50
      }, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    // Description animation
    var description = instance.querySelector('.description');
    if (description) {
      gsap.fromTo(description, {
        opacity: 0,
        y: 50
      }, {
        scrollTrigger: {
          trigger: description,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        delay: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
    }
  });
});
