/*
 * Actuado - points scroll sequence
 *
 * Pins a service block and opens each of its points in turn as the visitor
 * scrolls, then releases. Scrubbed, so the sequence follows scroll position
 * and reverses exactly on the way back up.
 *
 * Opt in with .ac-points-sequence on the module root. Desktop only: below the
 * breakpoint, and under reduced motion, the points stay the normal tap
 * accordion handled by ac-expandable-points.js.
 */
(function () {
	'use strict';

	var BREAKPOINT = 992;
	var STEP = 0.2;        // viewport-heights of scroll per point

	function build(root) {
		var list = root.querySelector('.ac-service-points');
		if (!list) return;

		var panels = [];
		Array.prototype.forEach.call(
			list.querySelectorAll('.ac-service-point--expandable'),
			function (li) {
				var toggle = li.querySelector('.ac-service-point__toggle');
				var panel = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
				if (panel) panels.push({ toggle: toggle, panel: panel });
			}
		);
		if (panels.length < 2) return;

		// Scroll drives the points, so they are no longer buttons.
		panels.forEach(function (p) {
			p.panel.hidden = false;
			p.toggle.setAttribute('tabindex', '-1');
			p.toggle.setAttribute('aria-disabled', 'true');
			gsap.set(p.panel, { height: 0, overflow: 'hidden' });
		});
		root.classList.add('is-sequenced');

		var row = root.querySelector('.ac-service-row') || root;

		var tl = gsap.timeline({
			defaults: { duration: 1, ease: 'power2.inOut' },
			scrollTrigger: {
				trigger: root,
				start: 'top top+=80',
				end: '+=' + Math.round(window.innerHeight * STEP * (panels.length + 1)),
				pin: row,
				scrub: 0.4,
				anticipatePin: 1,
				invalidateOnRefresh: true
			}
		});

		function state(p, open) {
			p.toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		}

		// One step per point: open it, and close whichever was open before.
		// A final step closes the last point, so the block ends as it started.
		panels.forEach(function (p, i) {
			var prev = panels[i - 1];

			if (prev) {
				tl.to(prev.panel, {
					height: 0,
					onStart: function () { state(prev, false); },
					onReverseComplete: function () { state(prev, true); }
				}, i);
			}

			tl.to(p.panel, {
				// A function value is re-measured on refresh, so the height is
				// always right after a resize or a late-loading font.
				height: function () { return p.panel.firstElementChild.offsetHeight; },
				onStart: function () { state(p, true); },
				onReverseComplete: function () { state(p, false); }
			}, i);
		});

		var last = panels[panels.length - 1];
		tl.to(last.panel, {
			height: 0,
			onStart: function () { state(last, false); },
			onReverseComplete: function () { state(last, true); }
		}, panels.length);
	}

	function start() {
		var roots = document.querySelectorAll('.ac-points-sequence');
		if (!roots.length) return;

		gsap.registerPlugin(ScrollTrigger);

		// gsap.matchMedia binds the sequence to the breakpoint and reverts it
		// on leaving, so resizing or rotating hands the points back to the tap
		// accordion instead of leaving them in a half-sequenced state.
		gsap.matchMedia().add(
			'(min-width: ' + BREAKPOINT + 'px) and (prefers-reduced-motion: no-preference)',
			function () {
				Array.prototype.forEach.call(roots, build);

				return function () {
					Array.prototype.forEach.call(roots, function (root) {
						root.classList.remove('is-sequenced');
					});
				};
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

	// Fonts change line wrapping, and so the measured panel heights.
	window.addEventListener('load', function () {
		if (window.ScrollTrigger) ScrollTrigger.refresh();
	});
})();
