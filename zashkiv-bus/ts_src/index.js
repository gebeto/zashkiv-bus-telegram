const { Composer, log } = require('micro-bot')
const fetch = require('node-fetch')

const bot = new Composer()

function google(obj1) {
	const url = "https://maps.googleapis.com/maps/api/geocode/json?";
	const obj = {
		latlng: '49.8635486,24.0514178',
		sensor: false,
		key: 'AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0',
		components: 'administrative_area|country'
	};
	return url + Object.keys(obj).map((key) => {
		return `${key}=${obj[key]}`;
	}).join('&');
}

function googleStatic(lat, long, params = {}) {
	const url = "https://maps.googleapis.com/maps/api/staticmap?";
	const icon = 'icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=bus%257CFF0000';
	const obj = {
		zoom: "16",
		size: "1080x1080",
		markers: `color:red%7C${icon}%7C${lat},${long}`, // color: red | green | blue | yellow
		maptype: 'hybrid', // roadmap | satelite | hybrid
		key: 'AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0',
		...params,
	};
	return url + Object.keys(obj).map((key) => {
		return `${key}=${obj[key]}`;
	}).join('&');
}

function getParams(text) {
	const res = {};
	// var argPattern = new RegExp('-([\\w\\W])+?\\s([\\w\\W])+?\\s?', 'g');
	var argPattern = /-([\w\W])+?\s([\w\W])+\s?/g;
	// console.log(text);
	let params = text.match(argPattern);
	if (params) {
		params.map((p) => {
			const pp = p.replace('-', '').trim().split(' ');
			if (pp.length > 1) {
				res[pp[0]] = pp[1];
			}
		});
	}
	// console.log(params, res);
	return res;
}

// function(name, userDefault) {
// 	var args = process.argv.join(' ');
	
// 	var arg = args.match(argPattern)
// 	if (arg) {
// 		return arg[1];
// 	}
// 	return userDefault;
// }

async function busesResponse(ctx, buses = [], params) {
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
		const states = [
			'Прямує до Львова',
			'Прямує до Зашкова',
			'На платформі',
			'В парку',
		];
		await ctx.telegram.sendPhoto(ctx.from.id, googleStatic(bus.Y, bus.X, params), {
			// caption: `${bus.VehicleName} - ${bus.RouteName}. ${bus.State}`,
			caption: `${bus.VehicleName} - ${bus.RouteName}. ${states[bus.State]}`,
		});
	}
	// console.log('SENDED');
}

// bot.use(log())
bot.start(({ reply }) => reply('Hey there!'))
bot.command('help', ({ reply }) => reply('Help message'))
bot.command('about', ({ reply }) => reply('About message'))
bot.on('message', ( ctx ) => {
	let command = ctx.message.text.toLowerCase().split(' ');
	const params = getParams(ctx.message.text.toLowerCase());
	// return;
	if (command[0] === 'get') {
		ctx.telegram.sendMessage(ctx.from.id, `Зачекайте будь ласка.`);
		fetch('http://82.207.107.126:13541/SimpleRide/LODA/SM.WebApi/api/RouteMonitoring/?code=LODA|1059838')
			.then(res => res.json()).then(json => {
				const j = JSON.parse(json);
				const res = busesResponse(ctx, j, params);
			});
	}
})

module.exports = bot

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