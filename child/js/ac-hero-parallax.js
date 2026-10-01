/*
 * Actuado - hero parallax
 *
 * Drifts the hero image slowly as the page scrolls while the text panel beside
 * it stays still. Two speeds against each other is what reads as depth - moving
 * the whole hero would just look like the section lagging behind the page.
 *
 * The image sits in an oversized inner element inside a clipped frame, so it
 * has room to travel without exposing an edge. Desktop only: on a small screen
 * the two halves stack, and there is nothing stationary to move against.
 */
(function () {
	'use strict';

	var BREAKPOINT = 992;
	// How far the image travels, as a proportion of its own overshoot.
	// The frame is inset by 12% top and bottom, so this stays within it.
	var TRAVEL = 18;

	function build(hero) {
		var inner = hero.querySelector('.ac-hero__media-inner');
		if (!inner) return;

		// Starts where the hero actually is rather than at 'top bottom': the
		// hero sits at the top of the page, so a trigger that begins as it
		// enters the viewport is already part-way through on load, and the
		// image appears pre-offset before the visitor has scrolled.
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: hero,
				start: 'top top',
				end: 'bottom top',
				scrub: 0.6,
				invalidateOnRefresh: true
			}
		});

		// The image drifts up more slowly than the page, and eases in very
		// slightly as it goes - a constant rate is what makes parallax feel
		// mechanical.
		tl.fromTo(inner,
			{ yPercent: 0, scale: 1 },
			{ yPercent: -TRAVEL, scale: 1.06, ease: 'none' },
			0
		);
	}

	function start() {
		var heroes = document.querySelectorAll('.ac-hero--parallax');
		if (!heroes.length) return;

		gsap.registerPlugin(ScrollTrigger);

		// matchMedia binds the effect to the breakpoint and reverts it on the
		// way out, so resizing hands the image back to its static position.
		gsap.matchMedia().add(
			'(min-width: ' + BREAKPOINT + 'px) and (prefers-reduced-motion: no-preference)',
			function () {
				Array.prototype.forEach.call(heroes, build);
			}
		);
	}

	// gsap and ScrollTrigger load separately and may still be pending.
	function whenReady(attempt) {
		if (window.gsap && window.ScrollTrigger) return start();
		if (attempt > 120) return;
		requestAnimationFrame(function () { whenReady(attempt + 1); });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () { whenReady(0); });
	} else {
		whenReady(0);
	}
})();
