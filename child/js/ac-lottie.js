/*
 * Actuado - Lottie sizing
 *
 * The dotlottie-wc player has no height of its own and draws into whatever box
 * it is given, so once the file loads the box takes the animation's own
 * proportions. The player redraws itself when its box changes size through its
 * autoResize setting (renderconfig attribute in the markup).
 */
customElements.whenDefined('dotlottie-wc').then(function () {
	document.querySelectorAll('[data-ac-lottie]').forEach(function (el) {
		var player = el.dotLottie;

		function fit() {
			var size = player.animationSize();
			if (size.width && size.height) {
				el.style.aspectRatio = size.width + ' / ' + size.height;
			}
		}

		if (player.isLoaded) fit();
		else player.addEventListener('load', fit);
	});
});
