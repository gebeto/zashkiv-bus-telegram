const fetch = require("node-fetch");

const BUS_INFO_URL = "http://82.207.107.126:13541/tms/loda/api/389C2151-C5E9-4D47-8B94-5F643CA0AFEB/GetRouteInfo?routeId=1059838";


async function fetchBusesData() {
	const response = await fetch(BUS_INFO_URL);
	const json = await response.json();
	return json.Data;
}


function checkDeveloper(ctx, next) {
	if (ctx.from.username === "gebeto") {
		return next(ctx);
	} else {
		ctx.reply("Бот знаходиться на етапі розробки, на даному етапі тільки розробник може ним користуватися.")
	}
}


exports.checkDeveloper = checkDeveloper;
exports.fetchBusesData = fetchBusesData;