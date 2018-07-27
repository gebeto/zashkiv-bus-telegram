const shedule = require('./Shedule');
const { Composer, log } = require('micro-bot');
const bot = new Composer();


// bot.use(log())
bot.start(({ reply }) => reply('Hey there!'));
bot.command('help', ({ reply }) => reply('Help message'));
bot.command('about', ({ reply }) => reply('About message'));


bot.on('message', (ctx) => {
	let command = ctx.message.text.split(' ');

	const groupName = command[0];
	const groupNameNew = groupName.replace(/([a-zа-я]+)-(\d+)([a-zа-я])/i, (full, g1, g2, g3) => {
		return `${g1.toUpperCase()}-${g2}${g3}`;
	});
	
	shedule
		.get(groupNameNew)
		.then((bufferStream) => {
			ctx.telegram.sendPhoto(
				ctx.from.id,
				{
					source: bufferStream.buffer
				}
			);
		})
		.catch(err => console.log('Err', err));
	
	return ctx.telegram.sendMessage(ctx.from.id, `Зачекай кілька секунд.. Шукаю розклад для ${groupNameNew}`);
});


module.exports = bot;
