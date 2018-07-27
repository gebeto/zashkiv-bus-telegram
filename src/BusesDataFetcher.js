const fetch = require('node-fetch');

class BusesData {
	constructor(json) {
		// console.log(typeof json);
		if (typeof json === 'string') {
			this.data = JSON.parse(json);
		} else if (typeof json === 'object') {
			this.data = json;
		} else {
			this.data = {};
		}
	}
}

function fetchBusesData() {
	// http://82.207.107.126:13541/tms/loda/api/389C2151-C5E9-4D47-8B94-5F643CA0AFEB/GetRouteInfo?routeId=1059838
	// return fetch('http://82.207.107.126:13541/SimpleRide/LODA/SM.WebApi/api/RouteMonitoring/?code=LODA|1059838')
	return fetch('http://82.207.107.126:13541/tms/loda/api/389C2151-C5E9-4D47-8B94-5F643CA0AFEB/GetRouteInfo?routeId=1059838')
		.then(res => res.json()).then(res => {
			const result = new BusesData(res);
			if (result.data.length === 0) {
				throw new Error('Список автобусів пустий!');
			}
			return result;
		});
}

exports.fetchBusesData = fetchBusesData;

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
// }]
