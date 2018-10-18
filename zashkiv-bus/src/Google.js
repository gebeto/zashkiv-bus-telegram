const fetch = require('node-fetch');

// function google(obj1) {
// 	const url = "https://maps.googleapis.com/maps/api/geocode/json?";
// 	const obj = {
// 		latlng: '49.8635486,24.0514178',
// 		sensor: false,
// 		key: 'AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0',
// 		components: 'administrative_area|country'
// 	};
// 	return url + Object.keys(obj).map((key) => {
// 		return `${key}=${obj[key]}`;
// 	}).join('&');
// }

function generateUrl(url, params) {
	return url + Object.keys(params).map((key) => {
		return `${key}=${params[key]}`;
	}).join('&');
}

function googleStatic(lat, long, params = {}) {
	// const url = "https://maps.googleapis.com/maps/api/staticmap?";
	// const icon = 'icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=bus%257CFF0000';
	// const obj = Object.assign({
	// 	zoom: "16",
	// 	size: "1080x1080",
	// 	markers: `color:red%7C${icon}%7C${lat},${long}`, // color: red | green | blue | yellow
	// 	maptype: 'hybrid', // roadmap | satelite | hybrid
	// 	key: 'AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0'
	// }, params);
	// return url + Object.keys(obj).map((key) => {
	// 	return `${key}=${obj[key]}`;
	// }).join('&');

	const icon = 'icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=bus%257CFF0000';
	return generateUrl("https://maps.googleapis.com/maps/api/staticmap?", Object.assign({
		zoom: "16",
		size: "1080x1080",
		markers: `color:red%7C${icon}%7C${lat},${long}`, // color: red | green | blue | yellow
		maptype: 'hybrid', // roadmap | satelite | hybrid
		key: 'AIzaSyDZGXkPJwVsHo5L1POrsukqkpk0yuGLp4s'
	}, params))
}

function googleStreetByLatLong(lat, long) {
	// const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false&key=AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0`;
	const url = generateUrl('https://maps.googleapis.com/maps/api/geocode/json?', {
		latlng: `${lat},${long}`,
		sensor: false,
		language: 'uk',
		key: 'AIzaSyDZGXkPJwVsHo5L1POrsukqkpk0yuGLp4s',
	});
	return fetch(url).then(r => r.json()).then(r => r.results[0]);
}


module.exports = {
	googleStatic: googleStatic,
	googleStreetByLatLong: googleStreetByLatLong,
	// google: google,
};
