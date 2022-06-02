class App {
	constructor() {
		this.body = document.body;
		this.table = document.getElementById('table');
		this.head = document.getElementsByTagName('head')[0];
		this.focusArray = document.querySelectorAll('[data-focus]');
		this.currentItem = document.querySelector('[data-autofocus]') || document.querySelector('.table-body_row');
		this.footerTitle = document.querySelector('.list-table_title').textContent;

		this.initialSetup();
		this.initEvents();
		this.refreshFooterTitle();
	}

	initialSetup() {
		const styleEl = document.createElement('style');
		const styles = `
			body, * {
				cursor: url('src/img/pixel.png'), auto;
				user-select: none;
			}
			body {
				position: relative;
			}
			body::before {
				content: '';
				position: absolute;
				z-index: 1000;
				inset: 0;
			}
		`

		styleEl.innerHTML = styles;
		this.head.appendChild(styleEl);
	}

	initEvents() {
		for (let i = 0; i < this.focusArray.length; i++) {
			if (!!this.focusArray[i].dataset.autofocus) {
				this.navigate(i, true);
			} else if (i === this.focusArray.length && !this.focusArray[i].dataset.autofocus) {
				this.navigate(i, true);
			}

			this.focusArray[i].addEventListener('click', (e) => {
				e.preventDefault();
			})
			this.focusArray[i].addEventListener('auxclick', (e) => {
				e.preventDefault();
			})
			this.focusArray[i].closest('.table-body_row').dataset.focus = i;
		}

		this.body.addEventListener('contextmenu', (e) => {
			e.preventDefault();
		})

		document.body.addEventListener('keydown', (e) => {
			// console.log(e);
			if (e.key === 'ArrowDown') {
				const initialElementIndex = parseInt(this.currentItem.dataset.focus);

				this.navigate(initialElementIndex, false, 'next');
			} else if (e.key === 'ArrowUp') {
				const initialElementIndex = parseInt(this.currentItem.dataset.focus);

				this.navigate(initialElementIndex, false, 'prev');
			} else if (e.key === 'Enter') {
				const link = this.currentItem.querySelector('.table-body_link').href;
				window.open(link, '_blank');
			} else if (e.code === 'BracketRight') {
				alert('Here should be some easter egg)))')
			}
		})
	}

	navigate(currentIndex, initialisation = false, _direction) {
		const currentElement = this.focusArray[currentIndex];
		if (initialisation) {
			currentElement.focused = 'true';
			currentElement.classList.add('focused');

			return;
		}

		let upcomingElement;

		if (_direction === 'down' || _direction === 'next') {
			if (currentIndex === this.focusArray.length - 1) {
				console.log(`the end of the list`);
				return;
			}
			upcomingElement = this.focusArray[currentIndex + 1];

			upcomingElement.focused = 'true';
			upcomingElement.classList.add('focused');

			delete currentElement.focused;
			currentElement.classList.remove('focused');

			this.currentItem = upcomingElement;
		} else if (_direction === 'up' || _direction === 'prev') {
			if (currentIndex === 0) {
				console.log(`the very first item of the list`);
				return;
			}
			upcomingElement = this.focusArray[currentIndex - 1];

			upcomingElement.focused = 'true';
			upcomingElement.classList.add('focused');

			delete currentElement.focused;
			currentElement.classList.remove('focused');

			this.currentItem = upcomingElement;
		}

		this.refreshFooterTitle();
	}


	refreshFooterTitle() {
		document.querySelector('.list-table_title').textContent = this.currentItem.querySelector('a').textContent;
	}
}

new App();