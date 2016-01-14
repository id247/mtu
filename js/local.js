'use strict'

import app from './app';

const appSettings = {

	API: {
		groupId: 32880,
		folderId: 82619,
		server: 'staging.x.dnevnik.ru',
		cookieName: 'local_calendar_token',
		scope: 'Files,SocialEntityMembership',	
		clientId: '5123975fe9eb415390fb7aa316a15e4e',
		clienSecret: '367159aba7ba4a1e8b2483ebfea22435',
		modalRedirectUrl: '//localhost:9000/oauth.html',
		redirectUrl: '//localhost:9000/',
		develop: true
	},

	calendar: {
		cdn: '',
		groupLink: 'https://groups.dnevnik.ru/group.aspx?group=316373',
		folderLink: 'https://groups.dnevnik.ru/group.aspx?group=316373&view=files&folder=2631891',
		develop: true
	}
}

//start the magic
document.addEventListener("DOMContentLoaded", () => {

	app.init(appSettings);

});   