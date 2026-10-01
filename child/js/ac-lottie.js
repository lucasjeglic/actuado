/*
 * Actuado - Lottie sizing
 *
 * The dotlottie-wc player is an empty box until its file loads: it has no
 * height of its own, and it draws the animation onto a canvas the size of that
 * box. So the box is given the animation's own proportions once the file has
 * loaded, which lets the animation fill the full width of its column with the
 * height following from it.
 *
 * The player does not redraw on its own when its box changes size, so it is
 * told to whenever that happens - after the proportions are set, and when the
 * column resizes with the window.
 */
(function () {
	'use strict';

	function fit(el) {
		var player = el.dotLottie;
		if (!player) return;

		var size = player.animationSize();
		if (size && size.width && size.height) {
			el.style.aspectRatio = size.width + ' / ' + size.height;
		}
		player.resize();
	}

	function watch(el, attempt) {
		var player = el.dotLottie;

		// The instance is created when the element connects, which can be
		// after this script runs if the player's own script is still loading.
		if (!player) {
			if (attempt > 120) return;
			requestAnimationFrame(function () { watch(el, attempt + 1); });
			return;
		}

		if (player.isLoaded) {
			fit(el);
		} else {
			player.addEventListener('load', function () { fit(el); });
		}

		if (window.ResizeObserver) {
			new ResizeObserver(function () {
				if (el.dotLottie && el.dotLottie.isLoaded) el.dotLottie.resize();
			}).observe(el);
		}
	}

	function start() {
		var players = document.querySelectorAll('[data-ac-lottie]');
		Array.prototype.forEach.call(players, function (el) { watch(el, 0); });
	}

	// The player is a custom element defined by a separately loaded module
	// script, so wait for the definition before reading its instance.
	function whenDefined() {
		if (window.customElements && customElements.whenDefined) {
			customElements.whenDefined('dotlottie-wc').then(start);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', whenDefined);
	} else {
		whenDefined();
	}
})();
