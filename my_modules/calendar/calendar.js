'use strict';

import DateHelper from 'date-helper';
import calendarTemplate from './hbs/calendar-content.hbs';
import miniCalendarTemplate from './hbs/mini-calendar-content.hbs';

const dateHelper = new DateHelper();

const calendar = ( () => {

	/*
	*	theStore
	*/

	let theStore = {};
	
	let DOM = {};


	let _appSettings = {
		cdn: 'https://ad.csdnevnik.ru/special/staging/calendar/',
		groupLink: '',
		folderLink: ''
	}
	

	/*
	*	FUNC
	*/

	function setSettings(settings){
		Object.assign(_appSettings, settings);
	}

	function setTodayDate(){

		if (_appSettings.develop){
			theStore.today = '18.01.2016';
		}else{
			theStore.today = dateHelper.dateToDMY( new Date() );
		}

		//current day for big calendar
		theStore.currentDate = theStore.today;
			
	}

	function getAllData(callback){

		let url = _appSettings.cdn + 'data/data.json?_v=' + Math.random();

		if (_appSettings.develop){
			//url = '/data/data.json';
		}

		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'text',
			success: (data) => {

				Object.assign(theStore, JSON.parse( data.replace(/\r\n|\r|\n/g,'') ));
				
				callback();
			},
			error: (data) => {
				console.log(data);
			}
		});

	};

	//push all dates to new array to get them quickly
	function getAllDates(){
			
		theStore.dates = [];

		theStore.days.forEach( element => {
		
			theStore.dates.push(element.date);

			if (element.date && ( element.date === theStore.today ) ){
				theStore.currentDateData = element;
			}

		}); 

		//if no current day, set first
		if (!theStore.currentDateData) theStore.currentDateData = theStore.days[theStore.days.length - 1];
	};


	//main calendar DOM
	function getDom(){
		
		
		DOM.calendar = document.getElementById('calendar-calendar');
		DOM.calendarPreloader = document.getElementById('calendar-preloader');
		DOM.calendarNavs = document.querySelectorAll('.js-calendar-nav');
		DOM.calendarDateNavs = document.querySelectorAll('.calendar-date__nav');
		DOM.calendarGridNavs = document.querySelectorAll('.calendar-grid__href');
		DOM.calendarDays = document.querySelectorAll('[data-date]');
		DOM.calendarCurrentDate = document.querySelector('.js-calendar-curent-date');
	
		DOM.datePickerIcon = document.querySelector('.js-datepicker-icon');

		DOM.modalFormOpeners = document.querySelectorAll('.js-modal-form');
	};

	//mini calendar DOM
	function getMiniDom(){
		
		//main calendar
		DOM.mCalendarDate = document.querySelector('.mini-calendar-day__date');
	};

	function setHeight(){
		
		let height = 0;
		[].forEach.call( DOM.calendarDays, (element) => {
			if (element.offsetHeight > height) {
				height = element.offsetHeight;
			};
		});

		//console.log(height);

		document.querySelector('.calendar-days__list').style.height = (height + 35) + 'px';

	};

	function getCalendar(){
		return DOM.calendarList = document.getElementById('calendar-list');
	};

	function getMiniCalendar(){
		return DOM.mCalendarContent = document.getElementById('mini-calendar-content');
	};

	function geterateContent(){
		DOM.calendarList.innerHTML += calendarTemplate(theStore);
	};

	function showMiniDate(){
		console.log(theStore);

		if (!theStore.currentDateData) return;

		let miniDay = theStore.currentDateData;

		miniDay.currentDateText= dateHelper.DMYToRusDate(theStore.currentDateData.date);
		
		DOM.mCalendarContent.innerHTML = miniCalendarTemplate(miniDay);
	};

	function changeDay(newDate){  //animate day

		//convert dates to compare
		const dateCurrentDay = dateHelper.DMYToDate(theStore.currentDate);
		const dateNewDate = dateHelper.DMYToDate(newDate);

		//hide-show last arrows
		function toggleNavArrows(){

			//if first date - hide left arrow
			if (theStore.dates.indexOf( theStore.currentDate ) === theStore.dates.length - 1){
				DOM.calendarDateNavs[0].style.display = 'none';
				DOM.calendarDateNavs[1].style.display = '';
			
			//if last date - hide right arrow
			}else if (theStore.dates.indexOf( theStore.currentDate ) === 0){
				DOM.calendarDateNavs[0].style.display = '';
				DOM.calendarDateNavs[1].style.display = 'none';
			//if middle date - show arrows
			}else{
				DOM.calendarDateNavs[0].style.display = '';
				DOM.calendarDateNavs[1].style.display = '';
			}

		}

		function animateDay(element){
			const elDate = dateHelper.DMYToDate( element.getAttribute('data-date') );

			//go forward
			if (elDate < dateNewDate && dateNewDate > dateCurrentDay){
			
				element.classList.add('gone');
			
			//go back
			} else if (elDate >= dateNewDate && dateNewDate <= dateCurrentDay){

				element.classList.remove('gone');
			
			} else if (elDate >= dateNewDate) {

				element.classList.remove('gone');
			}
			//if equal - do nothing			
		}

		function grigActiveDay(element){
			const elDate = element.getAttribute('href').substr(1);

			//if equal to current
			if (elDate == theStore.currentDate){
			
				element.classList.add('active');
			
			//else
			}else{
				element.classList.remove('active');
			}
		}

		//check if date exists
		if (theStore.dates.indexOf( newDate ) > -1){
						
			theStore.currentDate = newDate;

			[].forEach.call( DOM.calendarDays, (element) => animateDay(element) );

			[].forEach.call( DOM.calendarGridNavs, (element) => grigActiveDay(element) );

			toggleNavArrows();

			DOM.datePickerIcon.classList.remove('active');

			DOM.calendarCurrentDate.innerHTML = dateHelper.DMYToRusDate(theStore.currentDate);
		
		}else{
			console.log('No such date');
		}
	};

	function toggleCalendar(){

		//if calendar opened
		if (DOM.datePickerIcon.classList.contains('active')){

			DOM.datePickerIcon.classList.remove('active');

			changeDay(theStore.currentDate);

		//of closed
		}else{

			DOM.datePickerIcon.classList.add('active');

			[].forEach.call( DOM.calendarDays, (element) => {element.classList.add('gone'); } );

		}
	}

	function showCalendar(){
		DOM.calendarPreloader.classList.add('hidden');
		DOM.calendar.classList.remove('hidden');
	}

	/*
	*	EVENTS
	*/

	function events(){ 

		//calendar arrows clicks
		DOM.calendarNavs && [].forEach.call( DOM.calendarNavs, (element) => {

			element.addEventListener( 'click', function(e){

				e.preventDefault();

				const anchor = this.href.split("#")[1];
				
				let newDate = dateHelper.DMYToDate(theStore.currentDate);

				if (anchor == 'next'){
					newDate.setDate(newDate.getDate() + 1);
				}else if (anchor == 'prev'){
					newDate.setDate(newDate.getDate() - 1);				
				}else{
					newDate = dateHelper.DMYToDate(anchor);
				}

				newDate = dateHelper.dateToDMY(newDate);

				changeDay(newDate);

			});

		});


		DOM.datePickerIcon && DOM.datePickerIcon.addEventListener('click', (e) => {

			e.preventDefault();
			
			toggleCalendar();
		
		});

	};



	/*
	*	INIT
	*/
	function init(settings){

		setSettings(settings);
		setTodayDate();

		//if main calendar page
		if (getCalendar()){

			getAllData( () => {
				getAllDates();
				geterateContent();
				getDom();		

				console.log(theStore.today);
				changeDay(theStore.today);

				showCalendar();

				events();
			});	
		}

		//if mini calendar page
		if (getMiniCalendar()){

			getAllData( () => {
				getAllDates();

				getMiniDom();	

				showMiniDate();

				events();
			});	
		}

	}

	return{
		init: init
	}


})();

export default calendar;