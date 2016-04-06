;(function(){
	var adresses = [
		{
			address: 'Россия, Москва, проспект Мира, 119с312',
			text: 'проспект Мира, 119с312'
		},
		{
			address: 'Россия, Москва, улица Стромынка, 20',
			text: 'улица Стромынка, 20'
		},
		{
			address: 'Россия, Москва, Малая Пироговская улица, 1',
			text: 'Малая Пироговская улица, 1'
		},
		{
			address: 'Россия, Москва, 1-й Щипковский переулок, 23',
			text: '1-й Щипковский переулок, 23'
		},
		{
			address: 'Россия, Москва, проспект Вернадского, 78',
			text: 'проспект Вернадского, 78'
		},
		{
			address: 'Россия, Москва, проспект Вернадского, 86',
			text: 'проспект Вернадского, 86'
		},
	];

	function init () {


		var myMap = new ymaps.Map("map", {
			center: [55.76, 37.64],
			zoom: 10
		}, {
			searchControlProvider: 'yandex#search'
		});

		adresses.forEach(function(address){

			var myGeocoder = ymaps.geocode(address.address);
			myGeocoder.then( function(res){
				var coordinates = res.geoObjects.get(0).geometry.getCoordinates();	

				myMap.geoObjects
				.add(new ymaps.Placemark(coordinates, {
					iconContent: address.text
				}, {
					preset: 'islands#blueStretchyIcon',
				}));

			});



		}); 

	}
	
	ymaps.ready(init);

}());
