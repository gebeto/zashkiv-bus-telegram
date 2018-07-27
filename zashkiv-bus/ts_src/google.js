
export async function busesResponse(ctx, buses = [], params) {
	// console.log('SENDING');
	for (let i = 0; i < buses.length; i++) {
		const bus = buses[i];

		// Send location
		// await ctx.telegram.sendMessage(ctx.from.id, `${bus.VehicleName} - ${bus.RouteName}. Стан: ${bus.State}`);
		// await ctx.telegram.sendLocation(ctx.from.id, bus.Y, bus.X);

		// Send image location
		/*
		0 - 
		1 - 
		2 - на платформі
		3 - в парку
		*/
		// const states = [
		// 	'Прямує до Львова',
		// 	'Прямує до Зашкова',
		// 	'На платформі',
		// 	'В парку',
		// ];
		await ctx.telegram.sendPhoto(ctx.from.id, googleStatic(bus.Y, bus.X, params), {
			// caption: `${bus.VehicleName} - ${bus.RouteName}. ${bus.State}`,
			caption: `${bus.VehicleName} - ${bus.RouteName}. ${bus.State}`,
		});
	}
	// console.log('SENDED');
}


// https://maps.googleapis.com/maps/api/geocode/json?latlng=49.8635486,24.0514178&sensor=false&key=AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0
// function getGoogleApiUrl() {
// 	https://maps.googleapis.com/maps/api/geocode/json?latlng=49.8635486,24.0514178&sensor=false&key=AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0&components=administrative_area:TX|country:US
// 	https://maps.googleapis.com/maps/api/geocode/json?latlng=49.8635486,24.0514178&sensor=false&key=AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0
// }


// [{
// 	"Angle": 50.273394890841558,
// 	"EndPoint": "",
// 	"IterationEnd": null,
// 	"IterationStart": null,
// 	"RouteCode": null,
// 	"RouteId": 1059838,
// 	"RouteName": "165, Львів АС-2 - Зашків - Завадів",
// 	"StartPoint": "",
// 	"State": 1,
// 	"TimeToPoint": 5040,
// 	"VehicleId": 42632,
// 	"VehicleName": "ВС 1759 АА",
// 	"X": 24.057065,
// 	"Y": 49.8694366,
// 	"LowFloor": false,
// 	"ActualOnDate": "2018-03-20T15:45:56"
// }, {
// 	"Angle": -140.81747497677552,
// 	"EndPoint": "",
// 	"IterationEnd": null,
// 	"IterationStart": null,
// 	"RouteCode": null,
// 	"RouteId": 1059838,
// 	"RouteName": "165, Львів АС-2 - Зашків - Завадів",
// 	"StartPoint": "",
// 	"State": 1,
// 	"TimeToPoint": 2870,
// 	"VehicleId": 42640,
// 	"VehicleName": "ВС 1528 АА",
// 	"X": 24.060351,
// 	"Y": 49.8737053,
// 	"LowFloor": false,
// 	"ActualOnDate": "2018-03-20T15:45:52"
// }]