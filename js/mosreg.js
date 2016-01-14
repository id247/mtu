
'use strict'

import app from './app';

const options = {
	groupId: 1000000588054,
	folderId: 2526310,
	server: 'school.mosreg.ru',
	cdn: 'https://ad.csdnevnik.ru/special/staging/calendar/',
	cookieName: 'mosreg_burunduk_token',
	scope: 'Files,SocialEntityMembership',	
	clientId: 'ab3baa5a2b3e45c3a912da8c50b754a7',
	clienSecret: '5c15438b793241559629526e68f7f296',
	redirectUrl: 'https://ad.school.mosreg.ru/promo/burunduki-test/',
	groupLink: 'https://networks.school.mosreg.ru/1000000588054',
	folderLink: 'https://networks.school.mosreg.ru/network.aspx?network=1000000588054&view=files&folder=2526310'
}

const develop = false;

//start the magic
document.addEventListener("DOMContentLoaded", function() {

	app(options, develop);

});  