/*
 * Actuado - type-on-scroll headings
 *
 * Types any element carrying .ac-animate-words into view, once, the first time
 * it is scrolled to. Shared by the Actuado modules so the behaviour only lives
 * in one place.
 *
 * Usage: add .ac-animate-words to an element, and optionally
 *        data-type-duration="1300" to override the speed in milliseconds.
 *
 * Typing is GSAP's own TextPlugin. The heading is split into a visible half
 * and a hidden remainder so the finished text's line breaks are reserved from
 * the first character - TextPlugin alone would rewrap the heading as it grows.
 * Font readiness is handled with the native document.fonts.ready promise.
 *
 * Degrades safely, so the text is never left invisible: without
 * IntersectionObserver, or when the visitor prefers reduced motion, the class
 * is removed and the heading renders as plain static text.
 */
(function () {
	'use strict';

	var SELECTOR = '.ac-animate-words';
	var DEFAULT_DURATION = 1500;   // ms for a whole line

	function typeInto(root, onDone) {
		var full = root.textContent.replace(/\s+/g, ' ').trim();
		if (!full) return;

		// The whole heading stays in the DOM at full size, so line breaks are
		// decided once, up front. TextPlugin types into the visible half while
		// the hidden half holds the remaining space, so nothing reflows.
		root.textContent = '';

		var shown = document.createElement('span');
		shown.className = 'ac-typed__shown';
		shown.setAttribute('aria-hidden', 'true');

		var rest = document.createElement('span');
		rest.className = 'ac-typed__rest';
		rest.setAttribute('aria-hidden', 'true');
		rest.textContent = full;

		var caret = document.createElement('span');
		caret.className = 'ac-caret';
		caret.setAttribute('aria-hidden', 'true');

		// Screen readers get the whole heading at once, rather than hearing it
		// announced character by character as it types.
		var sr = document.createElement('span');
		sr.className = 'ac-sr-only';
		sr.textContent = full;

		root.appendChild(sr);
		root.appendChild(shown);
		root.appendChild(caret);
		root.appendChild(rest);

		var total = parseInt(root.getAttribute('data-type-duration'), 10);
		if (!total || isNaN(total)) total = DEFAULT_DURATION;

		root.classList.add('is-typing');

		gsap.to(shown, {
			text: { value: full, delimiter: '' },
			duration: total / 1000,
			ease: 'none',
			// The hidden remainder shrinks as the visible half grows, so the
			// two together always occupy the finished heading's exact space.
			onUpdate: function () {
				rest.textContent = full.slice(shown.textContent.length);
			},
			onComplete: function () {
				shown.textContent = full;
				rest.textContent = '';
				root.classList.remove('is-typing');
				root.classList.add('is-done');
				if (onDone) onDone();
			}
		});
	}

	function observe(root, start) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				io.disconnect();               // once only
				root.classList.add('is-typing');
				start();
			});
		}, { threshold: 0.35 });
		io.observe(root);
	}

	function setup(root) {
		if (root.dataset.acTyped) return;      // never initialise twice
		root.dataset.acTyped = '1';

		function begin() {
			observe(root, function () { typeInto(root); });
		}

		// Wait for web fonts before measuring, so the space reserved for the
		// heading matches the real typeface rather than the fallback.
		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(begin);
		} else {
			begin();
		}
	}

	function init() {
		var els = document.querySelectorAll(SELECTOR);
		if (!els.length) return;

		// Typing needs gsap and TextPlugin; without them the heading is left
		// as plain static text rather than being emptied and never refilled.
		if (!window.gsap || !window.TextPlugin) {
			Array.prototype.forEach.call(els, function (el) {
				el.classList.remove('ac-animate-words');
			});
			return;
		}
		gsap.registerPlugin(TextPlugin);

		var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var supported = 'IntersectionObserver' in window;

		if (reduced || !supported) {
			Array.prototype.forEach.call(els, function (el) {
				el.classList.remove('ac-animate-words');
			});
			return;
		}

		Array.prototype.forEach.call(els, setup);
	}

	// gsap and TextPlugin load separately and may still be pending.
	function whenReady(attempt) {
		if (window.gsap && window.TextPlugin) return init();
		if (attempt > 120) return init();   // give up and leave the text as-is
		requestAnimationFrame(function () { whenReady(attempt + 1); });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () { whenReady(0); });
	} else {
		whenReady(0);
	}
})();
