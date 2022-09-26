window.addEventListener('DOMContentLoaded', (event) => {
	const tl = gsap.timeline();
	const mainMenu = document.querySelector('.main-menu');
	const mainMenuLinks = document.querySelectorAll('.main-menu a');
	const mainOverlayLinks = document.querySelectorAll('.main-overlay-link');
	const closeBtn = document.querySelector('.close-btn');
	const backDrop = document.querySelector('.menu-overlay-backdrop');

	function activateSubmenu(link) {
		console.log('switchSubmenu');
		const target = link.dataset.target;

		const oldActiveSubmenu = document.querySelector('.submenu.active');
		if (oldActiveSubmenu) {
			oldActiveSubmenu.classList.remove('active');
		}

		const activeSubmenu = document.querySelector(`.submenu[data-submenu="${target}"]`)
		activeSubmenu.classList.add('active');
		console.log('active', activeSubmenu);

		tl.set('.submenu a', {opacity: 0})
		tl.fromTo(`.submenu[data-submenu="${target}"] a`, {y: -80}, {y: 0, duration: .3, ease: 'power1.in', stagger: .05}, '<');
		tl.fromTo(`.submenu[data-submenu="${target}"] a`, {opacity: 0}, {opacity: 1, duration: .3, ease: 'power1.in', stagger: .05}, '<.2');
	}

	function deactivateOverlayLink() {
		const activeOverlayLink = document.querySelector(`.main-overlay-link.active`);
		activeOverlayLink.classList.remove('active');
	}

	function activateOverlayLink(link) {
		const target = link.dataset.target;

		const activeOverlayLink = document.querySelector(`.main-overlay-link[data-target="${target}"]`);
		activeOverlayLink.classList.add('active');
	}

	function closeMenu(link) {
		document.querySelector('body').classList.remove('menu-open');

		tl.to('.menu-overlay', {x: '-100%', duration: .3, ease: 'power2.in'});
		tl.to('.menu-overlay-backdrop', {opacity: 0, duration: .3, ease: 'power2.out'});
	}

	function openMenu(link) {
		const target = link.dataset.target;
		const oldActiveSubmenu = document.querySelector('.submenu.active');
		if (oldActiveSubmenu) {
			oldActiveSubmenu.classList.remove('active');
		}

		const activeSubmenu = document.querySelector(`.submenu[data-submenu="${target}"]`);
		activeSubmenu.classList.add('active');

		document.querySelector('body').classList.add('menu-open');

		tl.to('.submenu a', {opacity: 0});
		tl.fromTo('.menu-overlay-backdrop', {opacity: 0}, {opacity: 3, duration: .35, ease: 'power2.out'});
		tl.to('.menu-overlay', {x: 0, duration: .35, ease: 'power2.out'}, '<');
		tl.fromTo('.main-overlay-link', {opacity: .2}, {opacity: 1, duration: .4, ease: 'power4.in'}, '<');
		tl.fromTo(`.submenu[data-submenu="${target}"] a`, {y: -80}, {y: 0, duration: .3, ease: 'power1.in', stagger: .05}, '<');
		tl.fromTo(`.submenu[data-submenu="${target}"] a`, {opacity: 0}, {opacity: 1, duration: .3, ease: 'power1.in', stagger: .05}, '<.2');
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

	closeBtn.addEventListener('click', (event) => {
		deactivateOverlayLink();
		closeMenu();
	});

	backDrop.addEventListener('click', (event) => {
		deactivateOverlayLink();
		closeMenu();
	});
});
