'use strict'

const cookies = ( () => {

	// Create cookie
	function createCookie(name, value, days) {
		let expires;
		
		if (days === undefined) days = 10;

		if (days){
		
			const date = new Date();
		
			date.setTime(date.getTime()+(days*24*60*60*1000));
		
			expires = "; expires="+date.toGMTString();
		
		}else {
		
			expires = "";
		
		}
		
		document.cookie = name+"="+value+expires+"; path=/";
	}

	// Read cookie
	function readCookie(name){

		const nameEQ = name + "=";
		const ca = document.cookie.split(';');


		
		for(var i=0;i < ca.length;i++) {
			
			let c = ca[i];
			
			while (c.charAt(0) === ' ') {
				c = c.substring(1,c.length);
			}
			
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length,c.length);
			}

		}
		return null;
	}

	// Erase cookie
	function eraseCookie(name){
		createCookie(name,"",-1);
	}

	// Main function
	function cookie(name, value, days){
		if (value === ''){
			eraseCookie(name);
		}else if (!value){
			return readCookie(name);
		}else{
			createCookie(name, value, days);
		}
	}

	return{
		cookie: cookie
	}

})();


export default cookies;
