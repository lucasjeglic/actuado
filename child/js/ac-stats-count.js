/*
 * Actuado - stat count-up
 *
 * Counts each stat from zero to its value the first time it scrolls into view.
 * Values are written as ordinary text in the editor, so the number is parsed
 * out of whatever is there and any prefix or suffix is preserved:
 *
 *   "180+"     -> counts 0-180, keeps the +
 *   "31%"      -> counts 0-31, keeps the %
 *   "12 yrs"   -> counts 0-12, keeps " yrs"
 *   "EUR 2.4M" -> counts 0-2.4 with one decimal, keeps "EUR " and "M"
 *   "Diamond"  -> no number, so it just fades in
 *
 * Values are only hidden once the script has confirmed it can run, so the
 * stats are always readable if it does not.
 */
(function () {
	'use strict';

	function parse(text) {
		// First number in the string, decimals and thousands separators included.
		var m = String(text).match(/-?[\d][\d.,]*/);
		if (!m) return null;

		var raw = m[0];
		// Treat commas as thousands separators, the dot as the decimal point.
		var num = parseFloat(raw.replace(/,/g, ''));
		if (isNaN(num)) return null;

		var dot = raw.indexOf('.');
		return {
			value: num,
			decimals: dot === -1 ? 0 : raw.length - dot - 1,
			prefix: String(text).slice(0, m.index),
			suffix: String(text).slice(m.index + raw.length)
		};
	}

	function format(n, decimals) {
		return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	function build(el) {
		var parsed = parse(el.getAttribute('data-value') || el.textContent);

		var tl = gsap.timeline({
			scrollTrigger: { trigger: el, start: 'top bottom-=10%', once: true },
			onStart: function () { el.classList.add('is-counted'); }
		});

		// A value with no number cannot count, so it types itself in instead -
		// the same idea as the counter, assembling the value rather than just
		// fading it in. TextPlugin is GSAP's own typewriter, so the typing
		// itself is one declarative tween.
		if (!parsed) {
			var full = (el.textContent || '').trim();

			// Without TextPlugin a text tween would silently do nothing and
			// leave the value blank, so fall back to a plain fade.
			if (!window.TextPlugin) {
				tl.fromTo(el,
					{ opacity: 0, y: 14 },
					{ opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
				);
				return;
			}

			tl.fromTo(el,
				{ opacity: 0, y: 14 },
				{ opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
			);

			tl.fromTo(el,
				{ text: '' },
				{
					text: full,
					duration: Math.max(0.6, full.length * 0.09),
					ease: 'none',
					// The caret is bound to this tween rather than added up
					// front, so it appears exactly when typing starts and
					// clears when it finishes.
					onStart: function () { el.classList.add('is-typing'); },
					onComplete: function () { el.classList.remove('is-typing'); }
				},
				0.15
			);
			return;
		}

		var counter = { n: 0 };
		tl.fromTo(el,
			{ opacity: 0, y: 14 },
			{ opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
		);
		tl.to(counter, {
			n: parsed.value,
			duration: 1.4,
			ease: 'power2.out',
			onUpdate: function () {
				el.textContent = parsed.prefix + format(counter.n, parsed.decimals) + parsed.suffix;
			}
		}, 0);
	}

	function start() {
		var groups = document.querySelectorAll('.ac-stats--count');
		if (!groups.length) return;

		gsap.registerPlugin(ScrollTrigger);
		if (window.TextPlugin) gsap.registerPlugin(TextPlugin);

		gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
			Array.prototype.forEach.call(groups, function (group) {
				group.classList.add('is-ready');
				Array.prototype.forEach.call(
					group.querySelectorAll('.ac-stat__value'), build
				);
			});

			return function () {
				Array.prototype.forEach.call(groups, function (group) {
					group.classList.remove('is-ready');
				});
			};
		});
	}

	// gsap and ScrollTrigger load separately and may still be pending.
	function whenReady(attempt) {
		// TextPlugin is optional - the typing falls back to a fade without it -
		// so only gsap and ScrollTrigger are required to proceed.
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
