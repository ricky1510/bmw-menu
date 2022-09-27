window.addEventListener('DOMContentLoaded', (event) => {
	const mainTimeline = gsap.timeline();
	const altTimeline = gsap.timeline();
	const mainMenu = document.querySelector('.main-menu');
	const mainMenuLinks = document.querySelectorAll('.main-menu a');
	const mainOverlayLinks = document.querySelectorAll('.main-overlay-link');
	const closeBtn = document.querySelector('.close-btn');
	const backDrop = document.querySelector('.menu-overlay-backdrop');
	const toggleMenu = document.querySelector('.toggle-menu');

	function activateSubmenu(link) {
		const target = link.dataset.target;

		const oldActiveSubmenu = document.querySelector('.submenu.active');
		if (oldActiveSubmenu) {
			oldActiveSubmenu.classList.remove('active');
			altTimeline.to(oldActiveSubmenu, {height: 0, duration: .2, ease: 'power1.in'});
		}

		const activeSubmenu = document.querySelector(`.submenu[data-submenu="${target}"]`)
		activeSubmenu.classList.add('active');

		const scrollHeight = document.querySelector(`.submenu[data-submenu="${target}"]`).scrollHeight;
		mainTimeline.set('.submenu a', {opacity: 0});
		console.log('activate submenu');
		mainTimeline.fromTo(`.submenu[data-submenu="${target}"]`, {height: 0}, {height: scrollHeight, duration: .2, ease: 'power1.in'});
		mainTimeline.fromTo(`.submenu[data-submenu="${target}"] a`, {y: -80}, {y: 0, duration: .3, ease: 'power1.in', stagger: .05});
		mainTimeline.fromTo(`.submenu[data-submenu="${target}"] a`, {opacity: 0}, {opacity: 1, duration: .3, ease: 'power1.in', stagger: .05}, '<.2');
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

	function openMenu() {
		document.querySelector('body').classList.add('menu-open');

		mainTimeline.fromTo('.menu-overlay-backdrop', {opacity: 0}, {opacity: 3, duration: .6, ease: 'power2.out'});
		mainTimeline.to('.menu-overlay', {x: 0, duration: .35, ease: 'power2.out'}, '<');
		mainTimeline.fromTo('.main-overlay-link', {opacity: .2}, {opacity: 1, duration: .4, ease: 'power4.in'}, '<');
	}

	mainMenuLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();

			const link = event.target;

			activateOverlayLink(link);
			openMenu();
			activateSubmenu(link);
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
