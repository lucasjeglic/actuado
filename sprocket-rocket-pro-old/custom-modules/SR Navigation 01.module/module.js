document.addEventListener('DOMContentLoaded', () => {

	const nav = document.querySelector('.header__container');
	const topbar = document.querySelector('.header__top');
	let heights = {
		nav: nav.offsetHeight,
		topbar: topbar ? topbar.offsetHeight : 0
	};

	function toggleElementVisibility (selector, className) {
		const elements = nav.querySelectorAll(selector);
		elements.forEach(el => el.classList.toggle(className));
	}

	function setAriaExpanded (element, value) {
		element.setAttribute('aria-expanded', value.toString());
	}

	function closeAllDropdowns () {
		if (nav.getAttribute('data-layout') === 'mobile') return;
		const dropdowns = nav.querySelectorAll('.header__menu-item--has-submenu');
		dropdowns.forEach(dropdown => {
			const button = dropdown.querySelector('.no-button');
			dropdown.classList.remove('header__menu-item--open');
			if (button) setAriaExpanded(button, false);
		});
	}

	function updateHeaderHeight () {
		heights = {
			nav: nav.offsetHeight != 0 ? nav.offsetHeight : heights.nav,
			topbar: topbar ? topbar.offsetHeight : 0
		};
	}

	function setHeaderHeight () {
		let top = 0;
		const topbarFixed = nav.dataset.topbarFixed === 'false';
		if (!topbarFixed && nav.classList.contains('header-scroll')) {
			console.log('topbarFixed');
			top = heights.nav - heights.topbar;
		} else {
			top = heights.nav;
		}

		console.log(top);

		document.body.style.setProperty('--navHeight', `${top}px`);
	}

	function handleMenuToggle (toggle, menuSelector, openClass, closeClass) {
		toggle.addEventListener('click', () => {
			setHeaderHeight()
			document.body.classList.toggle('nav-open');
			toggleElementVisibility(menuSelector, 'header__menu--show');
			toggleElementVisibility('.header__menu-toggle--open', openClass);
			toggleElementVisibility('.header__menu-toggle--close', closeClass);
		});
	}

	// Desktop menu hover and focus interactions
	const menuParentItems = nav.querySelectorAll('.header__menu-item--has-submenu');
	menuParentItems.forEach(item => {
		const button = item.querySelector('.header__menu-link--toggle');
		item.addEventListener('mouseover', () => {
			if (nav.getAttribute('data-layout') === 'desktop') {
				item.classList.add('header__menu-item--open');
			}
		});

		item.addEventListener('mouseout', () => {
			if (nav.getAttribute('data-layout') === 'desktop') {
				item.classList.remove('header__menu-item--open');
			}
		});
		if (button && nav.getAttribute('data-layout') === 'desktop') {
			button.addEventListener('focus', closeAllDropdowns);
		}

	});

	// Mobile menu interactions
	nav.querySelectorAll('.header__menu-toggle').forEach(toggle => {
		handleMenuToggle(toggle, '.header__menu--mobile', 'header__menu-toggle--show', 'header__menu-toggle--show');
	});

	// Mobile menu - toggle submenus
	nav.querySelectorAll('.header__menu-link--toggle').forEach(toggle => {
		toggle.addEventListener('click', () => {
			const parent = toggle.parentNode;
			const isOpen = parent.classList.toggle('header__menu-item--open');
			setAriaExpanded(toggle, isOpen);
		});
	});

	// Mobile menu - back button
	nav.querySelectorAll('.header__menu-back').forEach(toggle => {
		toggle.addEventListener('click', () => {
			const prevButton = toggle.closest('ul').previousElementSibling;
			prevButton.classList.toggle('header__menu-child-toggle--open');
			const parent = prevButton.parentNode;
			parent.classList.remove('header__menu-item--open');
			setAriaExpanded(prevButton, false);
		});
	});

	// Anchor links for mobile nav
	nav.querySelectorAll('.header__menu-link[href*="#"],.cta-button[href*="#"]').forEach(link => {
		link.addEventListener('click', () => {
			document.body.classList.remove('nav-open');
			toggleElementVisibility('.header__menu--mobile', 'header__menu--show');
			toggleElementVisibility('.header__menu-toggle--close', 'header__menu-toggle--show');
			toggleElementVisibility('.header__menu-toggle--open', 'header__menu-toggle--show');
		});
	});

	// Search interactions
	const search = nav.querySelector('.search');
	if (search) {
		const searchBtn = search.querySelector('.search--icon');
		const searchInput = search.querySelector('.hs-search-field__input');

		searchBtn.addEventListener('click', event => {
			if (search.classList.contains('closed')) {
				event.preventDefault();
				search.classList.remove('closed');
				searchInput.focus();
				searchInput.select();
			} else if (!searchInput.value) {
				event.preventDefault();
				search.classList.add('closed');
			}
		});

		document.addEventListener('click', event => {
			if (!search.contains(event.target)) {
				search.classList.add('closed');
			}
		});
	}

	// Scrolling behavior for sticky nav
	if (nav.dataset.fixed === 'true') {

		const headerTop = nav.querySelector('.header__top');
		const headerTopHeight = headerTop ? headerTop.offsetHeight : 0;
		let previousScrollPosition = 0;

		const handleNavScroll = () => {
			const st = window.scrollY || document.documentElement.scrollTop;
			const isScrollingDown = st > previousScrollPosition;
			previousScrollPosition = st;

			if (search) {
				search.classList.add('closed');
				header.classList.remove('search-open');
			}

			const hasHeaderScroll = nav.classList.contains('header-scroll');
			const belowTopbar = nav.dataset.topbarFixed === 'true' && st < headerTopHeight;
			const shouldScroll = nav.dataset.scroll !== 'false' && st > heights.nav;

			if (belowTopbar) {
				nav.classList.remove('header-scroll', 'scroll-up', 'scroll-down');
				if (nav.dataset.transparent === 'false') {
					document.body.style.paddingTop = '';
				}
			} else if (st < 1) {
				nav.classList.remove('header-scroll', 'scroll-up');
				if (nav.dataset.transparent === 'false') {
					document.body.style.paddingTop = '';
				}
			} else if (shouldScroll || (nav.dataset.scroll === 'false' && st > 0)) {
				nav.classList.add('header-scroll');
				if (nav.dataset.transparent === 'false') {
					document.body.style.paddingTop = `${heights.nav}px`;
				}
			}

			if (st > 0) {
				nav.classList.toggle('scroll-down', isScrollingDown && hasHeaderScroll);
				nav.classList.toggle('scroll-up', !isScrollingDown && hasHeaderScroll);
			}
		};

		window.addEventListener('scroll', handleNavScroll);
		window.addEventListener('resize', updateHeaderHeight);

	}
});