window.addEventListener('DOMContentLoaded', (event) => {
	const mainTimeline = gsap.timeline();
	const mainMenu = document.querySelector('.main-menu');
	const mainMenuLinks = document.querySelectorAll('.main-menu a');
	const mainOverlayLinks = document.querySelectorAll('.main-overlay-link');
	const closeBtn = document.querySelector('.close-btn');
	const backDrop = document.querySelector('.menu-overlay-backdrop');
	const toggleMenu = document.querySelector('.toggle-menu');

	mainTimeline.set('.submenu', {opacity: 0});

	function activateSubmenu(link) {
		const target = link.dataset.target;
		const scrollHeight = document.querySelector(`.submenu[data-submenu="${target}"]`).scrollHeight;

		const menuToggleVisible = getComputedStyle(toggleMenu).getPropertyValue('display') !== 'none'
		if (menuToggleVisible) {
			mainTimeline.to('.submenu', {height: 0, y: 0, opacity: .3});
			mainTimeline.fromTo(`.submenu[data-submenu="${target}"]`, {height: 0, y: 40, opacity: 0}, {height: scrollHeight, y: 0, opacity: 1, duration: .5, ease: 'power1.out'}, '<');
		} else {
			mainTimeline.set('.submenu', {y: 40, opacity: 0});
			mainTimeline.fromTo(`.submenu[data-submenu="${target}"]`, {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: .5, ease: 'power1.out'}, '<');
		}

	}

	function deactivateOverlayLink() {
		const activeOverlayLink = document.querySelector(`.main-overlay-link.active`);
		if (activeOverlayLink) {
			activeOverlayLink.classList.remove('active');
		}
	}

	function activateOverlayLink(link) {
		const target = link.dataset.target;

		const activeOverlayLink = document.querySelector(`.main-overlay-link[data-target="${target}"]`);
		activeOverlayLink.classList.add('active');
	}

	function closeMenu(link) {
		document.querySelector('body').classList.remove('menu-open');

		mainTimeline.to('.menu-overlay', {x: '-100%', duration: .3, ease: 'power2.in'});
		mainTimeline.to('.menu-overlay-backdrop', {opacity: 0, duration: .3, ease: 'power2.out'});
	}

	function openMenu(link) {
		document.querySelector('body').classList.add('menu-open');
		let target;
		let scrollHeight;
		if (link) {
			target = link.dataset.target;
			scrollHeight = document.querySelector(`.submenu[data-submenu="${target}"]`).scrollHeight;
		}

		mainTimeline.set('.submenu', {y: 20, opacity: 0});
		mainTimeline.fromTo('.menu-overlay-backdrop', {opacity: 0}, {opacity: 3, duration: .6, ease: 'power2.out'});
		mainTimeline.to('.menu-overlay', {x: 0, duration: .35, ease: 'power1.out'}, '<');
		mainTimeline.fromTo('.main-overlay-link span', {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', stagger: .2});
		mainTimeline.fromTo('.main-overlay-li', {borderBottom: '1px solid rgba(244, 244, 244, 0)'}, {borderBottom: '1px solid rgba(244, 244, 244, 1)', duration: 1.4, ease: 'power4.out', stagger: .2}, '<');
		if (link) {
			mainTimeline.fromTo(`.submenu[data-submenu="${target}"]`, {y: 60, opacity: 0}, {y: 0, opacity: 1, duration: .5, ease: 'power1.out'}, '<+1');
		}
		mainTimeline.fromTo('.menu-title, .close-btn', {opacity: 0}, {opacity: 1, duration: .3, ease: 'power2.out'}, '<+=.3')
	}

	mainMenuLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();

			const link = event.target;

			activateOverlayLink(link);
			openMenu(link);
		});
	});

	mainOverlayLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();

			const link = event.target;

			deactivateOverlayLink();
			activateOverlayLink(link);
			activateSubmenu(link);
		});
	});

	toggleMenu.addEventListener('click', () => {
		openMenu();
	});

	closeBtn.addEventListener('click', (event) => {
		deactivateOverlayLink();
		closeMenu();
	});

	backDrop.addEventListener('click', (event) => {
		deactivateOverlayLink();
		closeMenu();
	});
});
