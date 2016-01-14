'use strict';

class DateHelper {

	dateToDMY(date, devider = '.') {
		if (!date) return false;
		const yyyy = date.getFullYear().toString();
		const mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
		const dd  = date.getDate().toString();
		return (dd[1]?dd:"0"+dd[0]) + devider + (mm[1]?mm:"0"+mm[0]) + devider + yyyy; // padding
	}

	dateToYMD(date, devider = '.') {
		if (!date) return false;
		const yyyy = date.getFullYear().toString();
		const mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
		const dd  = date.getDate().toString();
		return yyyy + devider + (mm[1]?mm:"0"+mm[0]) + devider + (dd[1]?dd:"0"+dd[0]); // padding
	}

	DMYToDate(date) {
		if (!date) return false;
		const parseDay = date.split(".");
		return new Date( parseDay[2], parseDay[1] - 1, parseDay[0] );
	}

	DMYToRusDate(date){
		if (!date) return false;
		const parseDay = date.split(".");

		const day = parseInt(parseDay[0]);

		let month;
		
		switch(parseDay[1]){
			case '01': month = 'января'; 	break;
			case '02': month = 'февраля'; 	break;
			case '03': month = 'марта'; 	break;
			case '04': month = 'апреля'; 	break;
			case '05': month = 'мая'; 		break;
			case '06': month = 'июня'; 		break;
			case '07': month = 'июля'; 		break;
			case '08': month = 'августа'; 	break;
			case '09': month = 'сентября'; 	break;
			case '10': month = 'октября'; 	break;
			case '11': month = 'ноября'; 	break;
			case '12': month = 'декабря'; 	break;
		}

		return day + ' ' + month;
	}

}

export default DateHelper;