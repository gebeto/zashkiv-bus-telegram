const { googleStatic, googleStreetByLatLong } = require('./Google');

async function busResponse(ctx, bus, params) {
	const caption = `${bus.VehicleName} - ${bus.RouteName}. ${bus.State}`;
	const sendedPhoto = await ctx.telegram.sendPhoto(ctx.from.id, googleStatic(bus.Y, bus.X, params), {
		caption: `${caption}\n\nЗавантаження вулиці...`,
		parse_mode: null
	});

	try {
		const street = await googleStreetByLatLong(bus.Y, bus.X);
		await ctx.telegram.editMessageCaption(
			ctx.chat.id,
			sendedPhoto.message_id,
			null,
			`${caption}\n\n${street.formatted_address}`,
			{
				parse_mode: null
			}
		);
	} catch(err) {
		await ctx.telegram.editMessageCaption(
			ctx.chat.id,
			sendedPhoto.message_id,
			null,
			caption,
			{
				parse_mode: null
			}
		);
	}

}


exports.busResponse = busResponse;