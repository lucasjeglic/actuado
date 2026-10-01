window.addEventListener('load', () => {
	tooltip();
	renderCoordinates();
});
window.addEventListener('resize', function() {
	tooltip();
	renderCoordinates();
});

function tooltip() {
	if (window.innerWidth >= 576) {
		[...document.querySelectorAll('.dot')].forEach(dot => {
			dot.addEventListener('mouseenter', function() {
				[...document.querySelectorAll('.dot-card-wrapper')].forEach(tooltip => {
					tooltip.classList.remove('dot-card-wrapper--active');
				});
				showTooltip(dot);
			});
		});

		[...document.querySelectorAll('.dot-card-wrapper')].forEach(tooltip => {
			tooltip.addEventListener('mouseleave', function() {
				const getSiblings = function (elem) {
					return Array.prototype.filter.call(tooltip.parentNode.children, function (sibling) {
						return sibling !== tooltip;
					});
				};
				getSiblings().forEach(tooltip => tooltip.classList.remove('dot-card-wrapper--active'));
				tooltip.classList.remove('dot-card-wrapper--active');
			});
		});
	}
}

function renderCoordinates() {
	const pointersContainer = document.querySelector('.dots-container');
	const mapImage = document.querySelector(".map");
	const mapWidth = mapImage.clientWidth;
	const mapHeight = mapImage.clientHeight;
	const dots = document.querySelectorAll('.dot');
	const dotTooltip = document.querySelectorAll('.dot-card-wrapper');
	const latLong = [];

	[...dots].forEach(dot => {
		const coordinates = { lat: dot.dataset.lat, lon: dot.dataset.lon };

		latLong.push(coordinates);
	});

	latLong.forEach(({ lat, lon }, i) => {
		const x = (parseFloat(lon) + 180) * (mapWidth / 360);
		const y = Math.round(((-1 * parseFloat(lat)) + 90) * (mapHeight / 180));

		renderPointer(x, y, i);
	});
}

function renderPointer(x, y, i) {
	document.querySelectorAll('.dot')[i].style.left = `${x}px`;
	document.querySelectorAll('.dot')[i].style.top = `${y}px`;
}

function showTooltip(dot) {
	const mapWidth = document.querySelector(".map").clientWidth;
	const dotX = dot.style.left;
	const dotY = dot.style.top;
	const TOOLTIP_WIDTH = 320;
	const TOOLTIP_MARGIN = 30;
	const index = dot.dataset.index;

	document.querySelector(`.dot-card-wrapper[data-index="${index}"]`).style.left = `${dotX}`;
	document.querySelector(`.dot-card-wrapper[data-index="${index}"]`).style.top = `${dotY}`;

	if (TOOLTIP_WIDTH + parseInt(dotX) > mapWidth) {
		const transform = `translateX(-${TOOLTIP_WIDTH + TOOLTIP_MARGIN}px) translateY(calc(-50% + 4px))`;

		document.querySelector(`.dot-card-wrapper[data-index="${index}"]`).classList.add('dot-card-wrapper--active-right');
		document.querySelector(`.dot-card-wrapper[data-index="${index}"]`).style.transform = transform;
	} else {
		const transform = `translateX(${TOOLTIP_MARGIN}px) translateY(calc(-50% + 4px))`;

		document.querySelector(`.dot-card-wrapper[data-index="${index}"]`).style.transform = transform;
	}

	document.querySelector(`.dot-card-wrapper[data-index="${index}"]`).classList.add('dot-card-wrapper--active');
}