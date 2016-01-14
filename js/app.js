'use strict';

import 'babel-polyfill';
import API from 'API';
import modal from 'modal';
import calendar from 'calendar/calendar';

import DateHelper from 'date-helper';

const dateHelper = new DateHelper()

const app = ( () => {

	/*
	*	settings
	*/

	let _appSettings = {
	}
	
	function setSettings(settings){
		Object.assign(_appSettings, settings);
	}

	/* ==========================================================================
	 * EVENTS
	 * ========================================================================== */
	
	function events(){
		
		const authTest = document.getElementById('test-auth');
		authTest && authTest.addEventListener('click', function(e){

			e.preventDefault();

		});
		

	}

	/* ==========================================================================
	 * modal form
	 * ========================================================================== */
	
	function modalForm(){

		const modalFormAuth = document.getElementById('modal-form-auth');
		const competitionText = document.getElementById('competition-text');
		const competitionForm = document.getElementById('competition-form');

		function ShowForm(){
			competitionText.style.display = 'none';
			competitionForm.style.display = 'block';	
		}

		//if we already loged in
		API.getCurrentUserAjax()
		.then( 
			(user) => {
				console.log('get user', user);
				ShowForm();	
			},
			(err) => {
				console.error('get user', err);
			}
		);

		//auth click
		modalFormAuth && modalFormAuth.addEventListener('click', function(e){

			e.preventDefault();

			this.disabled = 'disabled';
			this.innerHTML = '<span class="icon icon__preloader"></span> Отправка запроса...';

			API.getCurrentUserAjax()
			.then( 
				(user) => {
					console.log('get user', user);
				},
				(err) => {
					if (err === 'no token' || err.status === 401 || err.status === 403 ){
						return API.auth();
					}else{
						throw new Error(err);
					}				
				}
			)
			.then( 
				() => {
					return API.getCurrentUserAjax();
				}
			)
			.then( 
				(user) => {
					console.log('get user', user);

					return API.inviteToGroup(_appSettings.API.groupId);
				}
			)
			.then(
				(data) => {
					if (data === 'MembershipConfirmed'){
						ShowForm();
					}else{
						throw new Error(data);
					}
				}
			)
			.catch( (err) =>{
				console.error('error', err);
			});
			

		});

		// competition form submit		
		competitionForm && competitionForm.addEventListener('submit', function(e){
			
			e.preventDefault();

			let isValid = true;

			//textarea
			if (!this.elements.message.value){

				this.elements.message.classList.add('error');
				isValid = false;
		
			}else{
		
				this.elements.message.classList.remove('error');
		
			}

			//agree
			//get error label
			let label = this.elements.agree.parentNode.parentNode.querySelector('label.error');
				
			if (!this.elements.agree.checked){

				//add error if it doesnt exist
			 	!label && this.elements.agree.parentNode.insertAdjacentHTML('afterend', '<label class="error">&nbsp;&nbsp;Вы должны принять условия</label>');
				isValid = false;

			}else{
				
				//remove error if it exists
				label && label.parentNode.removeChild(label);
			
			}

			if (isValid){

				alert('Тут будет метод отправки сообщения');

				// API.sendMessage({
				// 	to: 1000001035607,
				// 	body: 'Тестовое сообщение'
				// }, (data) => {
				// 	console.log(data);
				// });

			}
		});

	}

	/*
	*	INIT
	*/
	function init(options){

		setSettings(options);

		events();

		modal.init('js-baz-modal');	

		API.init(_appSettings.API);

		calendar.init(_appSettings.calendar);

		modalForm();

	}

	return{
		init: init
	}


})();

export default app;