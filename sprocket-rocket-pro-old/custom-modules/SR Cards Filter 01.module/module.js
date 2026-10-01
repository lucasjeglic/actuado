document.addEventListener("DOMContentLoaded", function () {
	const moduleInstances = document.querySelectorAll('.sr-cards-filter-01');

	moduleInstances.forEach(function (instance) {
		const container = instance.querySelector('.isotope.items');
		const items = Array.from(container.querySelectorAll('.item'));

		// Function to set equal height for items
		function setEqualHeight (items) {
			let maxHeight = 0;
			items.forEach(item => {
				item.style.height = 'auto';
				const itemHeight = item.offsetHeight;
				if (itemHeight > maxHeight) {
					maxHeight = itemHeight;
				}
			});
			items.forEach(item => {
				item.style.height = maxHeight + 'px';
			});
		}

		setEqualHeight(items);

		let iso = new Isotope(container, {
			itemSelector: '.item',
			filter: '',
			percentPosition: true,
			layoutMode: 'masonry',
		});

		if (instance.querySelector('.filter-option')) {
		const filters = instance.querySelectorAll('.filter-option select');
		filters.forEach((filter) => {
			filter.addEventListener('change', function () {
				let selector = '';
				filters.forEach((option) => {
					if (option.value) {
						selector += option.value;
					}
				});
				Array.from(instance.querySelectorAll('.items')).forEach((item) => {
					item.classList.remove('hideitems');
				});
				Array.from(instance.querySelectorAll('.load-more-button')).forEach((item) => {
					item.remove();
				});
				iso.arrange({ filter: selector });
				setEqualHeight(items);
			});
		});
	}

		const loadMoreBtn = instance.querySelector('.load-more-button');
		if (loadMoreBtn) {
			loadMoreBtn.addEventListener('click', function (e) {
				e.preventDefault();
				Array.from(instance.querySelectorAll('.items')).forEach((element) => {
					element.classList.remove('hideitems');
				});
				loadMoreBtn.remove();
				iso.layout();
				setEqualHeight(items);
			});
		}
	});
});