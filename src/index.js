const { Composer, log } = require('micro-bot')

const { getParams } = require('./Params');
const { googleStatic } = require('./Google');
const { busesResponse } = require('./Responder');
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

bot.on('message', ( ctx ) => {
	ctx.replyWithMarkdown('Зачекайте будь ласка.')
		// .then((res) => {
		// 	checkDeveloper(ctx)
		// })
		.then(fetchBusesData)
		.then(busesData => {
			const params = getParams(ctx.message.text.toLowerCase());
			busesResponse(ctx, busesData.data.Data, params)
		})
		.catch(err => {
			ctx.telegram.sendMessage(ctx.from.id, `Помилка: ${err.message}`);
		});
});


module.exports = bot;
