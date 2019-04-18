const { Composer, log } = require('micro-bot')

const { getParams } = require('./Params');
const { googleStatic } = require('./Google');
const { busResponse } = require('./Responder');
const fetchBusesData = require('./BusesDataFetcher').fetchBusesData;


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
	const busesData = await fetchBusesData();
	const params = getParams(ctx.message.text.toLowerCase());
	const buses = busesData.data.Data;
	buses.forEach(async (bus) => {
		try {
			const res = await busResponse(ctx, bus, params);
			console.log(res);
		} catch(err) {
			await ctx.replyWithMarkdown(err);
		}
	});
	// ctx.telegram.sendMessage(ctx.from.id, `Помилка: ${err.message}`);
});


module.exports = bot;
