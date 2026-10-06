/*
 * Actuado - list reveal
 *
 * Fades the items of a list up in sequence, first to last, the first time the
 * list scrolls into view. Used by any module that marks its list with
 * data-ac-reveal; the attribute's value is the delay between items in seconds.
 *
 *   <ol data-ac-reveal="0.3" class="is-revealing"> ... </ol>
 *
 * By default each item fades up as a whole. An item can instead mark its own
 * parts, so that something inside it - a rule drawn between items - stays put:
 *
 *   data-ac-reveal-fade   fades in where it is
 *   data-ac-reveal-rise   fades in and rises into place
 *
 * With data-ac-reveal-line the hairlines between items draw in as well. The
 * script only animates two custom properties on each item, which the module's
 * CSS uses to scale its own rules:
 *
 *   --ac-reveal-line-out   the rule leaving the item, towards the next one
 *   --ac-reveal-line-in    the rule arriving at the item (centred layouts,
 *                          where each gap is drawn as two halves)
 *
 * With data-ac-reveal-line-only as well, the items themselves stay still and
 * only the rules draw - for a highlight sweeping across text that should not
 * move while it does.
 *
 * Whether a rule is actually visible - screen size, last item of a row, rule
 * switched off - is left entirely to that CSS, so the timing is the same on
 * every screen and nothing here needs to know the layout.
 *
 * Items are pre-hidden in CSS via .is-revealing so nothing flashes in at full
 * opacity before GSAP is ready. That class is only removed once a timeline has
 * actually been built, so if GSAP never loads - or the visitor prefers reduced
 * motion - the list stays visible rather than disappearing.
 */
(function () {
	'use strict';

	var DURATION = 0.6;
	// The rule starts drawing a moment after its item begins to appear.
	var LINE_DELAY = 0.2;

	function build(list) {
		var items = Array.prototype.slice.call(list.children);
		if (!items.length) return;

		var step = parseFloat(list.getAttribute('data-ac-reveal')) || 0.08;
		var line = list.getAttribute('data-ac-reveal-line');
		// Centred, each gap is two half-rules: out of one item, into the next.
		// Each half gets half the time, so together they take one step.
		var lineTime = line === 'center' ? step / 2 : step;
		var lineOnly = list.hasAttribute('data-ac-reveal-line-only');

		var tl = gsap.timeline({
			scrollTrigger: { trigger: list, start: 'top bottom-=10%', once: true }
		});

		items.forEach(function (item, i) {
			var at = i * step;

			var fade = lineOnly ? [] : item.querySelectorAll('[data-ac-reveal-fade]');
			var rise = lineOnly ? [] : item.querySelectorAll('[data-ac-reveal-rise]');
			if (!lineOnly && !fade.length && !rise.length) rise = [item];

			// fromTo rather than from: from applies its start values only when
			// the tween first renders, so a list already past the trigger point
			// could sit at opacity 0 forever.
			if (fade.length) {
				tl.fromTo(fade,
					{ opacity: 0 },
					{ opacity: 1, duration: DURATION, ease: 'power2.out' },
					at
				);
			}
			if (rise.length) {
				tl.fromTo(rise,
					{ opacity: 0, y: 18 },
					{ opacity: 1, y: 0, duration: DURATION, ease: 'power2.out' },
					at
				);
			}

			if (line === null) return;

			tl.fromTo(item,
				{ '--ac-reveal-line-out': 0 },
				{ '--ac-reveal-line-out': 1, duration: lineTime, ease: 'none' },
				at + LINE_DELAY
			);

			// The half arriving at this item picks up where the previous item's
			// outgoing half finished.
			if (line === 'center') {
				tl.fromTo(item,
					{ '--ac-reveal-line-in': 0 },
					{ '--ac-reveal-line-in': 1, duration: lineTime, ease: 'none' },
					Math.max(0, at - step + LINE_DELAY + lineTime)
				);
			}
		});
	}

	function start() {
		var lists = document.querySelectorAll('[data-ac-reveal]');
		if (!lists.length) return;

		gsap.registerPlugin(ScrollTrigger);

		gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
			Array.prototype.forEach.call(lists, function (list) {
				build(list);
				// Hand control to GSAP only now that a timeline exists.
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
