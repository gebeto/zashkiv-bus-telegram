const { Composer, log } = require('micro-bot')

const { getParams } = require('./Params');
const { googleStatic } = require('./Google');
const { busResponse } = require('./Responder');
const { fetchBusesData } = require('./BusesDataFetcher');


const bot = new Composer()


function checkDeveloper(ctx) {
	if (ctx.from.username !== 'gebeto') {
		throw new Error('Бот знаходиться на етапі розробки, на даному етапі тільки розробник може ним користуватися.');
	}
}


// bot.use(log());
bot.start(({ reply }) => reply('Hey there!'));
bot.command('help', ({ reply }) => reply('Help message'));
bot.command('about', ({ reply }) => reply('About message'));

bot.on('message', async ( ctx ) => {
	const replyMessage = await ctx.replyWithMarkdown('Зачекайте будь ласка.');
	const buses = await fetchBusesData();
	const params = getParams(ctx.message.text.toLowerCase());
	buses.forEach((bus) => {
		ctx.replyWithVenue(bus.Y, bus.X, bus.VehicleName, bus.RouteName, {
			// foursquare_type: "bus_line"
			foursquare_id: "4bf58dd8d48988d12b951735"
			// foursquare_type: "food"
		});
	});
	// ctx.telegram.sendMessage(ctx.from.id, `Помилка: ${err.message}`);
});


module.exports = bot;
