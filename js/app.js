'use strict';

import 'babel-polyfill';

const app = ( () => {

	/* ==========================================================================
	 * EVENTS
	 * ========================================================================== */
	
	function events(){
		
		const programmsOpeners = document.querySelectorAll('.js-programms-opener');
		
		[].forEach.call( programmsOpeners, (element) => {

			element && element.addEventListener('click', function(e){

				e.preventDefault();

				console.log(element.parentNode);
				console.log(element.parentNode.querySelector('.programms-page__table-inner'));

				element.parentNode.parentNode
						.querySelector('.programms-page__table-inner')
						.classList
						.add('visible');

				element.classList.add('hidden');

			});

		});		

	}

	/*
	*	INIT
	*/
	function init(options){

		events();

	}

	return{
		init: init
	}


})();

export default app;