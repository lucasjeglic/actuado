/*
 * Actuado - horizontal timeline
 *
 * Pins the milestone track and moves it sideways as the visitor scrolls down,
 * so moving forward through the page is moving forward through time. A gold
 * line fills across the track and the nearest milestone is highlighted.
 *
 * Desktop only. Below the breakpoint, and under reduced motion, the track
 * stays a normal horizontally scrollable list - the content is never trapped.
 */
(function () {
	'use strict';

	var BREAKPOINT = 992;

	// Publishes the theme container's width and gutter, so the vertical layout
	// can align its viewport with the heading above it. The horizontal layout
	// measures the same values for its own track padding.
	// One refreshInit listener for the whole page. Registering them inside
	// build()/buildVertical() meant matchMedia stacked a new listener on every
	// breakpoint switch, and those fired against triggers that were mid-init.
	var measured = [];
	var listenerBound = false;

	function bindRefresh() {
		if (listenerBound) return;
		listenerBound = true;
		ScrollTrigger.addEventListener('refreshInit', function () {
			measured.forEach(function (fn) { fn(); });
		});
	}

	function onRefresh(fn) {
		if (measured.indexOf(fn) === -1) measured.push(fn);
		bindRefresh();
	}

	function measureContainer(root) {
		var probe = root.querySelector('.content-wrapper');
		if (!probe) return;
		var style = getComputedStyle(probe);
		var width = probe.clientWidth
			- parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
		root.style.setProperty('--ac-container', width + 'px');
	}

	// Cross-fades the image panel to the milestone at `index`. Images are
	// stacked in one box, so only opacity changes - the panel never resizes.
	function makeImageSwitcher(root) {
		var figures = root.querySelectorAll('.ac-htl-media__item');
		if (figures.length < 2) return function () {};

		var current = -1;
		var zTop = 1;

		// The wipe shortens as scroll speed rises, so a fast flick does not
		// leave the panel animating long after the milestones have moved on.
		// getVelocity() is a method on a ScrollTrigger instance, so the caller
		// passes the one driving it; without an instance the wipe just runs at
		// its normal pace.
		function speedFor(st) {
			if (!st || typeof st.getVelocity !== 'function') return 0.65;
			var v = Math.abs(st.getVelocity());
			// ~0.75s when browsing gently, ~0.25s on a hard flick.
			return gsap.utils.clamp(0.25, 0.75, 900 / (v + 900) * 0.75);
		}

		return function (index, st) {
			// Milestones without an image keep the previous one showing.
			var next = null;
			for (var i = 0; i < figures.length; i++) {
				if (parseInt(figures[i].getAttribute('data-index'), 10) <= index) next = figures[i];
			}
			if (!next || next === figures[current]) return;

			var prev = figures[current];
			var forward = !prev || Array.prototype.indexOf.call(figures, next) > current;
			current = Array.prototype.indexOf.call(figures, next);

			var img = next.querySelector('img');
			var wipe = speedFor(st);

			// Every image stays fully opaque and is stacked by z-index, so the
			// panel is never partly transparent. Fading the outgoing image
			// meant a fast scroll could interrupt that fade and leave it
			// stranded half-way, showing the panel's background through it.
			zTop += 1;

			// Scrolling fast queues several switches, and each one interrupts
			// the wipe before it finishes. Killing those tweens outright left
			// images frozen at a partial clip-path, so instead every previous
			// image is completed to fully revealed before the new wipe starts.
			// Whatever is underneath is then always a whole picture.
			gsap.killTweensOf(figures);
			gsap.set(figures, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' });
			gsap.set(next, { zIndex: zTop });

			// The new image wipes over whatever is beneath it, in the direction
			// of travel, and the picture drifts slightly as it settles.
			gsap.fromTo(next,
				{ clipPath: forward
					? 'inset(0% 0% 0% 100%)'
					: 'inset(0% 100% 0% 0%)' },
				{ clipPath: 'inset(0% 0% 0% 0%)',
				  duration: wipe, ease: 'power3.inOut', overwrite: true }
			);

			if (img) {
				gsap.fromTo(img,
					{ scale: 1.12 },
					{ scale: 1, duration: wipe * 2, ease: 'power2.out', overwrite: true }
				);
			}

			Array.prototype.forEach.call(figures, function (f) {
				f.classList.toggle('is-current', f === next);
			});
		};
	}

	function build(root) {
		var viewport = root.querySelector('.ac-htl-viewport');
		var track = root.querySelector('.ac-htl-track');
		var items = root.querySelectorAll('.ac-htl-item');
		var fill = root.querySelector('.ac-htl-line__fill');
		if (!viewport || !track || items.length < 2) return;

		// Measure the theme's own container so the track's gutters match the
		// section padding exactly: the first milestone lines up with the
		// heading, and the last stops on the container's right edge. Guessing
		// these in CSS cannot work, because the container width is a theme
		// setting.
		// One measurement pass, registered once. Two listeners both writing
		// --ac-container fought each other during refresh.
		function measure() {
			var probe = root.querySelector('.content-wrapper');
			if (!probe) return;
			var style = getComputedStyle(probe);
			var width = probe.clientWidth
				- parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
			var gutter = probe.getBoundingClientRect().left + parseFloat(style.paddingLeft);
			root.style.setProperty('--ac-container', width + 'px');
			root.style.setProperty('--ac-gutter', Math.max(0, gutter) + 'px');
		}
		measure();
		onRefresh(measure);

		// How far the track must travel for its right edge to reach the
		// viewport's right edge. Recomputed on refresh so resizes stay correct.
		function distance() {
			var last = items[items.length - 1];
			var gutter = parseFloat(getComputedStyle(root).getPropertyValue('--ac-gutter')) || 0;
			// Travel far enough that the last milestone's right edge lands on
			// the container's right edge - not the viewport's.
			return Math.max(0, last.offsetLeft + last.offsetWidth + gutter - viewport.offsetWidth);
		}

		if (distance() <= 0) return;   // everything already fits

		root.classList.add('is-horizontal');
		gsap.set(track, { force3D: true });

		// Only touch the DOM when the active milestone actually changes, rather
		// than reassigning every class on every scroll frame.
		var switchImage = makeImageSwitcher(root);
		var activeIndex = -1;
		function setActive(progress, st) {
			var i = Math.round(progress * (items.length - 1));
			if (i === activeIndex) return;
			if (items[activeIndex]) items[activeIndex].classList.remove('is-active');
			if (items[i]) items[i].classList.add('is-active');
			activeIndex = i;
			switchImage(i, st);
		}
		setActive(0);

		gsap.to(track, {
			x: function () { return -distance(); },
			ease: 'none',
			scrollTrigger: {
				trigger: root,
				// Centre the section in the viewport so it settles into place
				// from either direction, with the position derived from the
				// content height rather than a fixed offset. Falls back to
				// pinning near the top when the section is taller than the
				// screen, where 'center center' would never be reached.
				start: function () {
					var h = root.offsetHeight;
					if (h >= window.innerHeight) return 'top top';
					return 'top top+=' + Math.round((window.innerHeight - h) / 2);
				},
				// One viewport-height of scroll per milestone feels natural.
				end: function () { return '+=' + distance(); },
				pin: true,
				scrub: 0.5,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate: function (self) {
					setActive(self.progress, self);
					// scaleX is a compositor property; animating width would
					// force a layout pass on every frame and is the usual cause
					// of a juddery scrub.
					if (fill) fill.style.transform = 'scaleX(' + self.progress + ')';
				}
			}
		});
	}

	/* ---- Below the breakpoint: a vertical spine that draws as you scroll ---- */
	function buildVertical(root) {
		measureContainer(root);
		onRefresh(function () { measureContainer(root); });

		var track = root.querySelector('.ac-htl-track');
		var fill = root.querySelector('.ac-htl-line__fill');
		var items = root.querySelectorAll('.ac-htl-item');
		var list = root.querySelector('.ac-htl-items');
		if (!track || !fill) return;

		// The spine should stop at the centre of the last dot rather than the
		// bottom of the list, so measure whatever sits below it.
		function measureTail() {
			if (!list || !items.length) return;
			var last = items[items.length - 1];
			var gap = list.offsetHeight - (last.offsetTop + last.offsetHeight);
			var dot = last.querySelector('.ac-htl-item__dot');
			var below = dot ? last.offsetHeight - dot.offsetTop : 0;
			list.style.setProperty('--ac-last-gap', Math.max(0, gap + below) + 'px');
		}
		measureTail();
		onRefresh(measureTail);

		// Each dot turns gold as the spine passes it and stays gold, so the
		// filled line and the dots tell the same story about how far the
		// reader has come. onEnter/onLeaveBack keeps it correct in both
		// directions without firing on every frame.
		var switchImage = makeImageSwitcher(root);

		Array.prototype.forEach.call(items, function (item, i) {
			var dot = item.querySelector('.ac-htl-item__dot');
			if (!dot) return;
			ScrollTrigger.create({
				trigger: dot,
				start: 'top center',
				onEnter: function (self) {
					item.classList.add('is-active');
					switchImage(i, self);
				},
				onLeaveBack: function (self) {
					item.classList.remove('is-active');
					switchImage(Math.max(0, i - 1), self);
				}
			});
		});

		// Milestones rise into place as they are reached, alternating the
		// direction they come from so the two columns read as a pair.
		// Hides the milestones up front, so none is ever seen in its final
		// position before its reveal begins. Set from JS so the content is
		// only ever hidden when something is there to un-hide it.
		root.classList.add('is-revealing');

		Array.prototype.forEach.call(items, function (item, i) {
			var dot = item.querySelector('.ac-htl-item__dot');
			var parts = item.querySelectorAll(
				'.ac-htl-item__year, .ac-htl-item__title, .ac-htl-item__text'
			);

			var tl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: 'top bottom-=12%',
					once: true,
					// Make the milestone visible the instant its reveal starts,
					// so it fades in rather than appearing then animating.
					onEnter: function () { item.classList.add('is-revealed'); }
				}
			});

			// The dot lands first, then the copy follows it in from the side
			// its column sits on - so the milestone reads as arriving at the
			// line rather than the whole block sliding.
			// fromTo with the default immediateRender is correct now: the start
			// values are applied on creation, but the milestone is hidden until
			// its reveal begins, so that initial state is never seen.
			if (dot) {
				tl.fromTo(dot,
					{ scale: 0, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
				);
			}

			tl.fromTo(parts,
				{ opacity: 0, y: 18, x: (i % 2 === 0) ? -14 : 14 },
				{ opacity: 1, y: 0, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
				dot ? '-=0.2' : 0
			);

			// The image unfolds from the spine outwards - odd milestones sit
			// right of the line so they open left-to-right, even ones mirror it.
			var media = item.querySelector('.ac-htl-item__media');
			if (media) {
				var fromSpine = (i % 2 === 0)
					? 'inset(0% 0% 0% 100%)'
					: 'inset(0% 100% 0% 0%)';
				tl.fromTo(media,
					{ clipPath: fromSpine, opacity: 0 },
					{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
					  duration: 0.75, ease: 'power3.out' },
					'-=0.45'
				);
				tl.fromTo(media.querySelector('img'),
					{ scale: 1.14 },
					{ scale: 1, duration: 1.1, ease: 'power2.out' },
					'<'
				);
			}
		});

		gsap.to(fill, {
			scaleY: 1,
			ease: 'none',
			scrollTrigger: {
				trigger: track,
				start: 'top center',
				end: 'bottom center',
				scrub: 0.4,
				invalidateOnRefresh: true
			}
		});
	}

	function start() {
		var roots = document.querySelectorAll('.ac-timeline-01');
		if (!roots.length) return;

		gsap.registerPlugin(ScrollTrigger);

		// gsap.matchMedia is the supported way to bind animations to a
		// breakpoint: it builds on entering the query and reverts everything on
		// leaving, so resizing or rotating a device swaps layouts cleanly.
		// Reading window.innerWidth once at load could not do that.
		var mm = gsap.matchMedia();

		// A module set to Vertical uses the stacked layout at every width; the
		// rest pin horizontally above the breakpoint.
		function pick(list, fn) { Array.prototype.forEach.call(list, fn); }
		function horizontalRoots() {
			return Array.prototype.filter.call(roots, function (r) {
				return !r.classList.contains('ac-timeline--vertical');
			});
		}
		function verticalRoots(all) {
			return Array.prototype.filter.call(roots, function (r) {
				return all || r.classList.contains('ac-timeline--vertical');
			});
		}

		mm.add('(min-width: ' + BREAKPOINT + 'px) and (prefers-reduced-motion: no-preference)', function () {
			var horiz = horizontalRoots();
			pick(horiz, build);
			pick(verticalRoots(false), buildVertical);

			// Runs when the breakpoint is left: GSAP reverts its own tweens and
			// ScrollTriggers automatically, but the classes are ours to clear.
			return function () {
				pick(horiz, function (root) {
					root.classList.remove('is-horizontal');
					var track = root.querySelector('.ac-htl-track');
					if (track) track.removeAttribute('style');
				});
			};
		});

		mm.add('(max-width: ' + (BREAKPOINT - 1) + 'px) and (prefers-reduced-motion: no-preference)', function () {
			pick(verticalRoots(true), buildVertical);
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

	window.addEventListener('load', function () {
		if (window.ScrollTrigger) ScrollTrigger.refresh();
	});
})();
