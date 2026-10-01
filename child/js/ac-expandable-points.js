/*
 * Actuado - expandable points
 *
 * Turns a list of points into an accordion: clicking a point rotates its gold
 * rule from a plus into a minus and reveals the detail below it.
 *
 * Markup contract (rendered by the module):
 *   li.ac-service-point--expandable
 *     button.ac-service-point__toggle[aria-expanded][aria-controls]
 *     div.ac-service-point__detail[hidden]
 *       div.ac-service-point__detail-inner
 *
 * Uses GSAP, which the theme already bundles. height:auto is the case GSAP
 * handles properly - it measures the natural height, tweens to it, then hands
 * the element back to the document so it can reflow freely. It also makes
 * mid-flight clicks safe: starting a new tween overwrites the running one
 * instead of fighting it, which a hand-rolled transition does not do.
 */
(function () {
	'use strict';

	var DURATION = 0.42;
	var EASE = 'power2.out';

	function close(toggle, panel, reduced) {
		toggle.setAttribute('aria-expanded', 'false');

		if (reduced || !window.gsap) {
			panel.hidden = true;
			return;
		}

		gsap.to(panel, {
			height: 0,
			duration: DURATION,
			ease: EASE,
			overwrite: true,
			onComplete: function () { panel.hidden = true; }
		});
	}

	function expand(toggle, panel, reduced) {
		toggle.setAttribute('aria-expanded', 'true');
		panel.hidden = false;

		if (reduced || !window.gsap) {
			panel.style.height = '';
			return;
		}

		gsap.fromTo(panel,
			{ height: 0 },
			{
				height: 'auto',
				duration: DURATION,
				ease: EASE,
				overwrite: true,
				// Clearing the inline height lets the panel resize with the
				// viewport once it is open.
				onComplete: function () { gsap.set(panel, { height: 'auto' }); }
			}
		);
	}

	function setup(toggle) {
		var panel = document.getElementById(toggle.getAttribute('aria-controls'));
		if (!panel) return;

		// Skip only when the scroll sequence actually took over. .ac-points-sequence
		// is server-rendered and present at every screen size, whereas
		// .is-sequenced is added by the sequence script once it has confirmed it
		// can run - so checking the former disabled tapping on mobile, where the
		// sequence never starts.
		if (toggle.closest('.is-sequenced')) return;

		var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Only one point may be open per list, so sibling accordions in other
		// placements on the same page are left alone.
		var group = toggle.closest('.ac-service-points') || document;

		toggle.addEventListener('click', function () {
			// Re-checked here too: the sequence script may have taken over
			// after this listener was attached.
			if (toggle.closest('.is-sequenced')) return;

			var open = toggle.getAttribute('aria-expanded') === 'true';

			if (!open) {
				var others = group.querySelectorAll('.ac-service-point__toggle[aria-expanded="true"]');
				Array.prototype.forEach.call(others, function (other) {
					if (other === toggle) return;
					var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
					if (otherPanel) close(other, otherPanel, reduced);
				});
			}

			if (open) {
				close(toggle, panel, reduced);
			} else {
				expand(toggle, panel, reduced);
			}
		});
	}

	function init() {
		var toggles = document.querySelectorAll('.ac-service-point__toggle');
		if (!toggles.length) return;
		Array.prototype.forEach.call(toggles, setup);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
