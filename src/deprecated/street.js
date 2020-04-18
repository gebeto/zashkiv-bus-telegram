const fetch = require("node-fetch");

// create your key in https://opencagedata.com/dashboard
const OPENCAGEDATA_KEY = process.env.OPENCAGE_KEY;


function generateUrl(url, params) {
	return url + "?" + Object.keys(params).map((key) => {
		return `${key}=${params[key]}`;
	}).join("&");
}


async function streetByLatLong(lat, long) {
	const url = generateUrl("https://api.opencagedata.com/geocode/v1/json", {
		q: `${lat}+${long}`,
		key: OPENCAGEDATA_KEY,
	});
	const response = await fetch(url).then(r => r.json());
	return response.results[0].formatted;
}


exports.streetByLatLong = streetByLatLong;