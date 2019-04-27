const fetch = require('node-fetch');


async function fetchBusesData() {
	const response = await fetch('http://82.207.107.126:13541/tms/loda/api/389C2151-C5E9-4D47-8B94-5F643CA0AFEB/GetRouteInfo?routeId=1059838');
	const json = await response.json();
	return json.Data;
}


exports.fetchBusesData = fetchBusesData;


/*
{
	"Exception": null
	"$id": "1",
	"Data": [
		{
			"$id": "2",
			"Angle": -5.943510254110893,
			"EndPoint": "",
			"IterationEnd": null,
			"IterationStart": null,
			"RouteCode": null,
			"RouteId": 1059838,
			"RouteName": "165, Львів АС-2 - Зашків - Завадів",
			"StartPoint": "",
			"State": 2,
			"TimeToPoint": -5041,
			"VehicleId": 37665,
			"VehicleName": "ВС 1090 АА",
			"X": 23.9313508,
			"Y": 49.8258818,
			"LowFloor": false,
			"ActualOnDate": "2019-04-27T12:37:59"
		},
		{
			"$id": "3",
			"Angle": -142.40372885287175,
			"EndPoint": "",
			"IterationEnd": null,
			"IterationStart": null,
			"RouteCode": null,
			"RouteId": 1059838,
			"RouteName": "165, Львів АС-2 - Зашків - Завадів",
			"StartPoint": "",
			"State": 0,
			"TimeToPoint": -1464,
			"VehicleId": 42632,
			"VehicleName": "ВС 1759 АА",
			"X": 24.0154166,
			"Y": 49.8427933,
			"LowFloor": false,
			"ActualOnDate": "2019-04-27T12:38:41"
		}
	]
}
*/