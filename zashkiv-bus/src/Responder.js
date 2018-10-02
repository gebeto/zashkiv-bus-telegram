const { googleStatic, googleStreetByLatLong } = require('./Google');

function busResponse(ctx, bus, params) {
	const caption = `${bus.VehicleName} - ${bus.RouteName}. ${bus.State}`
	ctx.telegram.sendPhoto(ctx.from.id, googleStatic(bus.Y, bus.X, params), {
		caption: `${caption}\n\nЗавантаження вулиці...`,
		parse_mode: null
	})

	.then((res) => {
		setTimeout(() => {
			googleStreetByLatLong(bus.Y, bus.X).then((street) => {
				ctx.telegram.editMessageCaption(ctx.chat.id, res.message_id, null, `${caption}\n\n${street.formatted_address}`, {
					parse_mode: null
				});
			}).catch(err => {
				ctx.telegram.editMessageCaption(ctx.chat.id, res.message_id, null, caption, {
					parse_mode: null
				});						
			});
		}, 3000);
	});
}

function busesResponse(ctx, buses = [], params) {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < buses.length; i++) {
			const bus = buses[i];
			busResponse(ctx, bus, params)
		}
	});
}


exports.busesResponse = busesResponse;