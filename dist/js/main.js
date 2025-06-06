$(document).ready(function () {
	AOS.init({
		startEvent: 'DOMContentLoaded',
		duration: 850,
		offset: 85,
		delay: 50,
		once: false,
		easing: 'ease-out',
		disable: 'mobile',
	})

	// popup
	$(document).on('click', '.mfp-link', function () {
		var a = $(this)

		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Error. Not valid url',
			},
			callbacks: {
				open: function () {
					setTimeout(function () {
						$('.mfp-wrap').addClass('not_delay')
						$('.mfp-popup').addClass('not_delay')
					}, 700)
				},
			},

			callbacks: {
				open: function () {
					document.documentElement.style.overflow = 'hidden'
				},

				close: function () {
					document.documentElement.style.overflow = ''
				},
			},
		})
		return false
	})

	$(document).on('click', '.reviews-popup', function (e) {
		const target = $(e.target)
		if (
			!target.is('reviews-popup-image') &&
			target.closest('.reviews-popup-image').length === 0
		) {
			$.magnificPopup.close()
		}
	})

	// jquery form styler
	$('.ui-select').styler()

	// validate
	$.validator.messages.required = 'Пожалуйста, введите данные'

	jQuery.validator.addMethod(
		'lettersonly',
		function (value, element) {
			return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value)
		},
		'Поле может состоять из букв и пробелов, без цифр'
	)

	jQuery.validator.addMethod(
		'phone',
		function (value, element) {
			if (value.startsWith('+375')) {
				return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value)
			} else if (value.startsWith('+7')) {
				return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value)
			} else {
				return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(
					value
				)
			}
		},
		'Введите полный номер'
	)

	// imask
	let phone = document.querySelectorAll('.phone-mask')

	if (phone.length) {
		phone.forEach(element => {
			IMask(element, {
				mask: [
					{
						mask: '+{375} (00) 000 00 00',
						startsWith: '375',
						overwrite: true,
						lazy: false,
						placeholderChar: '_',
					},
					{
						mask: '+{7} (000) 000 00 00',
						startsWith: '7',
						overwrite: true,
						lazy: false,
						placeholderChar: '_',
					},
					{
						mask: '+0000000000000',
						startsWith: '',
						country: 'unknown',
					},
				],

				dispatch: function (appended, dynamicMasked) {
					var number = (dynamicMasked.value + appended).replace(/\D/g, '')

					return dynamicMasked.compiledMasks.find(function (m) {
						return number.indexOf(m.startsWith) === 0
					})
				},
			})
		})
	}

	const popularSlider = document.querySelector('.popular-slider')
	const categorySlider = document.querySelector('.category-slider')
	const trustSlider = document.querySelector('.trust-slider')

	if (popularSlider) {
		new Splide(popularSlider, {
			perPage: 3,
			gap: 8,
			pagination: false,
			type: 'loop',

			breakpoints: {
				1200: {
					focus: 'center',
					// trimSpace: false,
					start: 2,
				},

				1024: {
					start: 1,
				},

				745: {
					fixedWidth: '210px',
					gap: 5,
				},
			},
		}).mount()
	}

	if (categorySlider) {
		new Splide(categorySlider, {
			perPage: 4,
			gap: 8,
			pagination: false,
			type: 'loop',

			breakpoints: {
				1200: {
					focus: 'center',
					// trimSpace: false,
					start: 2,
					perPage: 3,
				},

				1024: {
					start: 1,
				},

				745: {
					fixedWidth: '210px',
				},
			},
		}).mount()
	}

	if (trustSlider) {
		new Splide(trustSlider, {
			drag: false,
			gap: 0,
			arrows: false,
			pagination: false,
			perPage: 4,

			breakpoints: {
				1024: {
					type: 'loop',
					drag: 'free',
					focus: 'center',
					fixedWidth: '480px',
					autoScroll: {
						speed: 1,
					},
				},

				745: {
					fixedWidth: '150px',
				},
			},
		}).mount(window.splide.Extensions)
	}

	const container = document.querySelector('.header-search-container')
	if (container) {
		const searchInput = document.querySelector('.header-search input')
		const headerContainer = document.querySelector('.header-container')
		const containerBottom = document.querySelector('.header-bottom')

		// при скролле чтобы инпут оставался в шапке т.к у нас fixed на шапке стоит
		window.addEventListener('scroll', () => {
			const top = containerBottom.getBoundingClientRect().top
			container.style.top = `${+top}px`
		})

		function updateSearchContainer() {
			const nav = document.querySelector('.header-nav ul').firstElementChild
			const location = document.querySelector('.header-location')
			const headerTop = document.querySelector('.header-top')

			const navCoord = nav.getBoundingClientRect().right
			const headerContainerCoord = headerContainer.getBoundingClientRect().right

			const containerCoord = container.getBoundingClientRect().left
			const locationCoord = location.getBoundingClientRect().left

			const headerTopCoord = headerTop.getBoundingClientRect().bottom

			if (window.innerWidth >= 1520) {
				const width = locationCoord - navCoord

				container.style.position = 'fixed'
				container.style.zIndex = '12'
				container.style.left = navCoord + 'px'
				container.style.width = width - 1 + 'px'
				container.style.top = '1px'
			} else if (window.innerWidth < 1520) {
				const width = headerContainerCoord - containerCoord

				container.style.position = 'fixed'
				container.style.zIndex = '12'
				container.style.top = `${headerTopCoord}px`
				container.style.width = width - 1 + 'px'
			} else {
				resetStyles()
			}
		}

		document.addEventListener('click', event => {
			if (
				!searchInput.contains(event.target) &&
				!container.contains(event.target)
			) {
				resetStyles()
			}
		})

		function resetStyles() {
			container.style.position = ''
			container.style.left = ''
			container.style.width = ''
			container.style.top = ''
			container.style.zIndex = ''
		}

		searchInput.addEventListener('focus', () => {
			updateSearchContainer()
			window.addEventListener('resize', updateSearchContainer)
		})

		searchInput.addEventListener('blur', () => {
			window.removeEventListener('resize', updateSearchContainer)
		})

		// если текст в инпуте есть или его нет, то в зависимости от этого добавляется класс\убирается
		searchInput.addEventListener('input', () => {
			if (searchInput.value !== '') {
				searchInput.classList.add('not-empty')
			} else {
				searchInput.classList.remove('not-empty')
			}
		})

		const nav = document.querySelector('.header-nav')
		const navMenu = nav.querySelectorAll('.header-nav-1')
		function updateNavMenu() {
			const headerContainerCoord = headerContainer.getBoundingClientRect().width

			const headerContainerLeft = headerContainer.getBoundingClientRect().left
			const navCoord = nav.getBoundingClientRect().left

			const searchInputCoord = searchInput.getBoundingClientRect().right

			const headerContainerBottom = searchInput.getBoundingClientRect().bottom
			const bottom = containerBottom.getBoundingClientRect().bottom
			const left = nav.getBoundingClientRect().left

			navMenu.forEach(element => {
				window.addEventListener('scroll', () => {
					const top = containerBottom.getBoundingClientRect().bottom
					element.style.top = `${top}px`
				})
				if (window.innerWidth >= 1520) {
					element.style.position = 'fixed'
					element.style.width = searchInputCoord - navCoord + 2 + 'px'
					element.style.top = bottom + 'px'
					element.style.left = left + -1 + 'px'
				} else {
					element.style.position = 'fixed'
					element.style.width = headerContainerCoord + 'px'
					element.style.left = headerContainerLeft + 'px'
					element.style.top = headerContainerBottom + 'px'
				}
			})
		}

		window.addEventListener('resize', updateNavMenu)
		updateNavMenu()
	}

	const btnMenus = document.querySelectorAll('.header-nav .header-nav-control')
	const menus = document.querySelectorAll('.header-nav .menu')

	if (menus.length) {
		// добавление стрелочек, если есть подкатегория
		menus.forEach(element => {
			const li = element.querySelectorAll('li')

			li.forEach(item => {
				if (item.querySelector('ul')) {
					const span = document.createElement('span')
					span.classList.add('open-category')
					item.appendChild(span)
				}
			})
		})

		// открытие меню в адаптиве на стрелочки
		menus.forEach(element => {
			const open = element.querySelectorAll('.open-category')

			open.forEach(item => {
				item.addEventListener('click', e => {
					const parent = e.target.closest('li')
					const list = parent.querySelector('ul')
					const close = parent.querySelector('button')

					if (list) {
						list.classList.add('active')
					}

					if (close) {
						close.addEventListener('click', e => {
							const menu = e.target.closest('.menu')
							menu.classList.remove('active')
						})
					}
				})
			})
		})
	}

	if (btnMenus.length) {
		btnMenus.forEach(element => {
			element.addEventListener('click', e => {
				const parent = e.target.closest('li')
				const menu = parent.querySelector('.menu')

				if (menu) {
					menu.classList.toggle('active')
				}
			})
		})
	}

	// открытие\закрытие бургера
	$('.header-burger, .header-top-burger, .burger-back.close button').on(
		'click',
		function () {
			$(this).toggleClass('active')
			$('.burger').toggleClass('active')
			$('html').toggleClass('active')
		}
	)

	$('.burger-back.close button').on('click', function () {
		$('.header-burger, .header-top-burger, .burger, html').removeClass('active')
	})

	// открытие\закрытие корзины
	$('.header-cart, .cart-close').on('click', function () {
		$('.cart-wrapper').toggleClass('active')
		$('html').toggleClass('active')
	})

	// открытие\закрытие фильтров
	$('.category-page-filter, .close-filter').on('click', function () {
		$('.category-filter-wrapper').toggleClass('active')
		$('html').toggleClass('active')
	})

	const burgerLinks = document.querySelectorAll('.burger-nav-list li')

	if (burgerLinks.length) {
		burgerLinks.forEach(el => {
			if (el.querySelector('ul')) {
				const span = document.createElement('span')
				span.classList.add('open-category')
				el.appendChild(span)
			}
		})
	}

	const burgerCatalog = document.querySelectorAll('.burger-nav .open-category')
	const burgerBack = document.querySelectorAll('.burger-back.back')

	if (burgerCatalog.length) {
		burgerCatalog.forEach(el => {
			el.addEventListener('click', e => {
				const parent = e.target.closest('li')
				const menu = parent.querySelector('ul')

				menu.classList.add('active')
			})
		})
	}

	if (burgerBack.length) {
		burgerBack.forEach(el => {
			el.addEventListener('click', e => {
				const menu = e.target.closest('ul')

				menu.classList.remove('active')
			})
		})
	}

	const closeCategory = document.querySelector('.close-category')

	if (closeCategory) {
		closeCategory.addEventListener('click', () => {
			const menu = closeCategory.closest('ul')

			menu.classList.remove('active')
		})
	}

	const deleteOrder = document.querySelectorAll('.cart-item-remove')

	if (deleteOrder.length) {
		deleteOrder.forEach(element => {
			element.addEventListener('click', () => {
				const item = element.closest('.cart-item')

				item.remove()
			})
		})
	}

	const allFilter = document.querySelectorAll('.category-filter-type')

	if (allFilter.length) {
		allFilter.forEach(element => {
			const btn = element.querySelector('.category-filter-title')

			btn.addEventListener('click', e => {
				element.classList.toggle('active')
			})
		})
	}

	const btnView1 = document.querySelector('.view-1')
	const btnView2 = document.querySelector('.view-2')

	if (btnView1) {
		btnView1.addEventListener('click', () => {
			const columns = document.querySelectorAll(
				'.category-page-items .col-ss-12'
			)

			columns.forEach(element => {
				const card = document.querySelectorAll('.popular-card')
				card.forEach(element => {
					element.classList.remove('active')
				})

				element.classList.add('col-md-4')
				element.classList.add('col-sm-6')
				element.classList.remove('col-ss-12')
			})

			btnView1.classList.add('active')
			btnView2.classList.remove('active')
		})
	}

	if (btnView2) {
		btnView2.addEventListener('click', () => {
			const columns = document.querySelectorAll(
				'.category-page-items .col-md-4'
			)

			console.log('zxc')

			columns.forEach(element => {
				const card = document.querySelectorAll('.popular-card')
				card.forEach(element => {
					element.classList.add('active')
				})

				element.classList.add('col-ss-12')
				element.classList.remove('col-md-4')
				element.classList.remove('col-sm-6')
			})

			btnView2.classList.add('active')
			btnView1.classList.remove('active')
		})
	}
})
