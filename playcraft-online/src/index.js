const utils = require('./utils');
const { Composer, log } = require('micro-bot');
const PlayCraft = require('./PlayCraft/');

const bot = new Composer();
const playcraft = new PlayCraft.Fetcher();

bot.start(({ reply }) => reply('Hey there!'));
bot.command('help', ({ reply }) => reply('Help message'));
bot.command('about', ({ reply }) => reply('About message'));

bot.command('status', (ctx) => {
	playcraft
		.fetchStatus()
		.then(PlayCraft.Drawer.drawStatusNew)
		// .then(PlayCraft.Drawer.test)
		.then(utils.convertImageToStream)
		.then((fileStream) => {
			ctx.telegram.sendPhoto(ctx.from.id, { source: fileStream.buffer });
		})
		.catch((err) => {
			console.log(err);
		});
	ctx.telegram.sendMessage(ctx.from.id, 'Будь ласка, зачекайте');
});


module.exports = bot;