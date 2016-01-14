
"use strict";

const modal = ( () => {

	let modalsStore = [];
	let modalOverlay;

	let _openClassSelector = 'js-baz-modal';

	const docBody = document.documentElement || document.body;

	// scroll to top of the opened modal
	function scrollTo(to) {

		to = parseInt(to) - 50;

		const from = (window.pageYOffset || docBody.scrollTop)  - (docBody.clientTop || 0);

		const screenHeight = window.innerHeight || docBody.clientHeight;

		//if scrolled less than 1/2 screen - do nothing
		if (from <= to + screenHeight / 2) {
			return false;
		}

		const time = 300;
		const unit = '';
		
		const start = new Date().getTime();
		const timer = setInterval(function() {
			const step = Math.min(1,(new Date().getTime()-start)/time);

			//firefox fix
			if (document.body.scrollTop > 0){
				document.body.scrollTop = (from+step*(to-from))+unit;
			}else if (document.documentElement.scrollTop > 0){
				document.documentElement.scrollTop = (from+step*(to-from))+unit;
			}

			if( step == 1) clearInterval(timer);
		},25);

		docBody.scrollTop = from;

	}


	function overlayShow(){
		//of no opened modals - show overlay
		if (modalsStore.length == 0){
			modalOverlay.classList.add('baz-modal-overlay--visible');
		}
	}

	function overlayHide(){
		//of no other modals - hide overlay also
		if (modalsStore.length == 0){
			modalOverlay.classList.remove('baz-modal-overlay--visible');
		}
	}

	function modalShow(modal, top){

		//get modal id
		const modalId = modal.id;

		//create and store markup
		const storeId = modalsStore.push( createMarkup(modal) ) - 1;

		//add top to modal
		modalsStore[storeId].currentModal.style.top = ( top.indexOf('px') > -1 ) ? top : top + 'px';
		
		//make modal visible
		setTimeout( () => {
			modalsStore[storeId].currentModal.classList.add('baz-modal--visible');
		}, 10);

		modalsStore[storeId].currentModal.style.width = modalsStore[storeId].modalHtml.offsetWidth + 'px';

	}

	function modalHide(){

		//get curent modal and its id
		const lastModalId = modalsStore.length - 1;
		const lastModal = modalsStore[lastModalId];

		//get placeholder
		const placeholder = document.getElementById('modal-id-' + modalsStore[lastModalId].id);

		//scroll to top on close
		scrollTo( lastModal.currentModal.style.top );

		//make modal unvisible
		lastModal.currentModal.style.top = '';
		lastModal.currentModal.classList.remove('baz-modal--visible');

		//delete stored modal
		modalsStore.splice(lastModalId, 1);

		//after 6ms 
		setTimeout( () => {
			lastModal.currentModal.style.width = '';
			//hide modal content
			lastModal.modalHtml.style.display = '';
			//remove it from modal content block
			//lastModal.modalContent.innerHTML = '';
			//replace placeholder by modal
			placeholder.parentNode.replaceChild(lastModal.modalHtml, placeholder);

			lastModal.currentModal.parentNode.removeChild(lastModal.currentModal);
			
		}, 600);		
		//currentModal.
	}

	function modalOpen(modalId){
		
		const top = (window.pageYOffset || docBody.scrollTop)  - (docBody.clientTop || 0);

		const modal = document.getElementById(modalId);

		if (!modal) return;
		
		overlayShow();
	 
		modalShow(modal, top + 'px');    
	
	}

	function modalClose(){
		
		modalHide();

		overlayHide();
	
	}

	function modalEvents(){

		document.addEventListener('click', function(e){
					
			e = e || window.e;
			var el = e.target || e.srcElement;

			while (el && el.tagName && el.tagName.toLowerCase() !== 'body') {

				if (el.classList.contains(_openClassSelector)){

					e.preventDefault();
				
					var modalId = el.getAttribute('href').slice(1);

					modalOpen(modalId);

					el = false;

				}else{
					el = el.parentNode;
				}

			}

		});

		document.addEventListener('click', function(event){
					
			event = event || window.event;
			var el = event.target || event.srcElement;

			while (el && el.tagName && el.tagName.toLowerCase() !== 'body') {

				if (el.classList.contains('js-baz-modal-close')){

					event.preventDefault();
				
					modalClose();

					el = false;

				}else{
					el = el.parentNode;
				}

			}

		});

	}

	function createMarkup(modal){

		if (!modal) return;

		let modalObj = {id: modal.id};

		let modalCloseLink = document.createElement('a');
		modalCloseLink.classList.add('baz-modal__close');
		modalCloseLink.classList.add('js-baz-modal-close');

		modalObj.modalContent = document.createElement('div');
		modalObj.modalContent.classList.add('baz-modal__content');

		modalObj.currentModal = document.createElement('div');
		modalObj.currentModal.classList.add('baz-modal');
		modalObj.currentModal.appendChild(modalCloseLink);
		modalObj.currentModal.appendChild(modalObj.modalContent);

		document.body.appendChild(modalObj.currentModal);

		//store modal html in variable
		modalObj.modalHtml = modal;

		//display modal
		modalObj.modalHtml.style.display = 'block';

		//placeholder
		modalObj.modalHtml.insertAdjacentHTML('beforebegin', '<div class="baz-modal__placeholder" id="modal-id-' + modal.id + '"></div>');

		//add modal to modal content block
		modalObj.modalContent.appendChild(modalObj.modalHtml);

		return modalObj;
	}

	function createOverlay(){
		modalOverlay = document.createElement('div');
		modalOverlay.classList.add('baz-modal-overlay');
		modalOverlay.classList.add('js-baz-modal-close');
		document.body.appendChild(modalOverlay);
	}

	function setSelector(classSelector){
		if (classSelector){
			_openClassSelector = classSelector;
		}
	}

	function init(classSelector){
		setSelector(classSelector);
		createOverlay();
		modalEvents();
	}

	return{
		init: init
	}

})();

	
export default modal;