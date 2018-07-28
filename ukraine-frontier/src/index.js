const { isDeveloper } = require('./Checker');
const { Composer, log } = require('micro-bot');

const bot = new Composer();


bot.start(({ reply }) => reply('Hey there!'));
bot.command('help', ({ reply }) => reply('Help message'));
bot.command('about', ({ reply }) => reply('About message'));

bot.on('message', ( ctx ) => {
	ctx.reply('Кінець тесту.')
		.then(() => {
			ctx.reply('Зачекайте будь ласка.')
		});
	// isDeveloper(ctx)
	// 	.then(() => ctx.telegram.sendMessage(ctx.from.id, 'Зачекайте будь ласка.'))
	// 	.then(() => ctx.telegram.sendMessage(ctx.from.id, 'Кінець тесту.'))
	// 	.catch(err => ctx.telegram.sendMessage(ctx.from.id, `Помилка: ${err.message}`));
});


module.exports = bot;
