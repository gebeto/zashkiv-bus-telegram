const fetch = require('node-fetch');
const GOOGLE_KEY = 'AIzaSyB1N7ggop_WpUaxKjVyqftwIuwA-vgJWv8';


function generateUrl(url, params) {
	return url + Object.keys(params).map((key) => {
		return `${key}=${params[key]}`;
	}).join('&');
}


function googleStatic(lat, long, params = {}) {
	// const icon = 'icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=bus%257CFF0000';
	const icon = '';
	return generateUrl("https://maps.googleapis.com/maps/api/staticmap?", {
		zoom: "16",
		size: "1080x1080",
		markers: encodeURI(`color:red|${lat},${long}`), // color: red | green | blue | yellow
		maptype: 'hybrid', // roadmap | satelite | hybrid
		key: GOOGLE_KEY,
		params,
	})
}


function googleStreetByLatLong(lat, long) {
	// const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false&key=AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0`;
	const url = generateUrl('https://maps.googleapis.com/maps/api/geocode/json?', {
		latlng: `${lat},${long}`,
		sensor: false,
		language: 'uk',
		key: GOOGLE_KEY,
	});
	return fetch(url).then(r => r.json()).then(r => r.results[0]);
}


module.exports = {
	googleStatic: googleStatic,
	googleStreetByLatLong: googleStreetByLatLong,
	// google: google,
};
