;(function(){
	var adresses = [
		{	
			id: 1,
			address: 'Россия, Москва, проспект Мира, 119с312',
			text: 'проспект Мира, 119, стр. 312'
		},
		{
			id: 2,
			address: 'Россия, Москва, улица Стромынка, 20',
			text: 'улица Стромынка, 20'
		},
		{
			id: 3,
			address: 'Россия, Москва, Малая Пироговская улица, 1',
			text: 'Малая Пироговская улица, 1'
		},
		{
			id: 4,
			address: 'Россия, Москва, 1-й Щипковский переулок, 23',
			text: '1-й Щипковский переулок, 23'
		},
		{
			id: 5,
			address: 'Россия, Москва, проспект Вернадского, 78',
			text: 'проспект Вернадского, 78'
		},
		{
			id: 6,
			address: 'Россия, Москва, проспект Вернадского, 86',
			text: 'проспект Вернадского, 86'
		},
		{
			id: 7,
			address: 'Россия, Москва, 5-я улица Соколиной Горы, д. 22',
			text: '5-я улица Соколиной Горы, 22'
		},
		{
			id: 8,
			address: 'Россия, Москва, ул. Усачёва, д. 64, стр. 1',
			text: 'улица Усачёва, 64, стр. 1'
		},
	];

	function init () {


		var myMap = new ymaps.Map("map", {
			center: [55.74992784468093,37.62192133862306],
			zoom: 11
		}, {
			searchControlProvider: 'yandex#search'
		});

		adresses.forEach(function(address){

			var myGeocoder = ymaps.geocode(address.address);
			myGeocoder.then( function(res){
				var coordinates = res.geoObjects.get(0).geometry.getCoordinates();	

    			// Создание метки с круглой активной областью.
   				var squareLayout = ymaps.templateLayoutFactory.createClass(
   					'<div class="placemark placemark--' + address.id + '">' +
   						'<div class="placemark__text">' +
   							address.text + 
   						'</div>' +
   					'</div>'
   				);


				var placemark = new ymaps.Placemark(coordinates, {
					//balloonContent: '<div style="background: #ccc;">' + address.text + '</div>',
					iconContent: address.text
				}, {
					//preset: 'islands#blueStretchyIcon',
					//iconLayout: 'default#imageWithContent',
					iconLayout: squareLayout,
					// coordinates: [
     //                	[-25, -25], [25, 25]
     //           		]
					//iconColor: '#cccccc',
              		//iconImageHref: 'https://yastatic.net/doccenter/images/tech-ru/maps/doc/freeze/bjl7EvAhU4kpV8XkyJJ0vKHbRiA.png',
              		//iconContentSize: [300, 20]
              		//balloonLayout: "default#imageWithContent",
              		//balloonShadow: false
				});

				myMap.geoObjects.add(placemark);

				//placemark.balloon.open();

			});



		}); 

	}
	
	ymaps.ready(init);

}());
