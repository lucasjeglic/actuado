/*
 * Actuado - question list reveal
 *
 * Fades each row up in sequence as the list enters the viewport.
 *
 * The list is pre-hidden in CSS via .is-revealing so nothing flashes in at full
 * opacity before GSAP is ready. That class is only removed once a timeline has
 * actually been built, so if GSAP never loads - or the visitor prefers reduced
 * motion - the rows stay visible rather than disappearing.
 */
(function () {
	'use strict';

	function build(list) {
		var items = list.querySelectorAll('.ac-ql__item');
		if (!items.length) return;

		// fromTo rather than from: from applies its start values immediately,
		// so a list already past the trigger point would never animate and
		// would sit at opacity 0 forever.
		gsap.fromTo(items,
			{ opacity: 0, y: 18 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'power2.out',
				stagger: 0.08,
				scrollTrigger: { trigger: list, start: 'top bottom-=10%', once: true }
			}
		);
	}

	function start() {
		var lists = document.querySelectorAll('.ac-ql__list--animate');
		if (!lists.length) return;

		gsap.registerPlugin(ScrollTrigger);

		gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
			Array.prototype.forEach.call(lists, function (list) {
				build(list);
				// Hand opacity control to GSAP only now that a tween exists.
				list.classList.remove('is-revealing');
			});

			// matchMedia reverts the tweens for us; restoring the class keeps
			// the pre-hidden state consistent if the query re-matches later.
			return function () {
				Array.prototype.forEach.call(lists, function (list) {
					list.classList.add('is-revealing');
				});
			};
		});
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
