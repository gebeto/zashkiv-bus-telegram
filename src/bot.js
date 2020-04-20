// const TelegramBot = require('node-telegram-bot-api');
const fetch = require("node-fetch");
const HTML = require("node-html-parser");

const { getParams } = require("./parameters");
const { fetchBusesData } = require("./bus");
const { checkDeveloper } = require("./utils");

const Telegraf = require('telegraf');

// const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
// const bot = new TelegramBot(process.env.BOT_TOKEN);
// bot.setWebHook(process.env.NOW_URL);
const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.telegram.setWebhook(process.env.WEBHOOK_URL)
// 	.then(res => console.log('WebHook is setted:', res))
// 	.catch(err => console.error(err));

// bot.use(checkDeveloper);
bot.start(({ reply }) => reply("Hey there!"));
bot.command("help", ({ reply }) => reply("Help message"));
bot.command("about", ({ reply }) => reply("About message"));

// bot.command("list", async ({ reply }) => {
// 	const page = await fetch("http://bus.com.ua/cgi-bin/tablo.pl?as=460280").then(res => res.text());
// 	const root = HTML.parse(page);
// 	const bs = root.querySelectorAll('td');
// 	console.log(bs);
// 	const data = bs.map(item => item.text);
// 	console.log(data);
// 	// console.log(data);
// 	return reply(data);
// });

bot.on("message", async ( ctx ) => {
	try {
		const replyMessage = await ctx.reply("Зачекайте будь ласка.");
		const buses = await fetchBusesData();
		if (buses && buses.length) {
			buses.forEach((bus) => {
				ctx.replyWithVenue(bus.Y, bus.X, bus.VehicleName, bus.RouteName);
			});
		} else {
			ctx.reply('Вибачте, нажаль жодного автобуса не знайдено :(');
		}
	} catch(e) {
		console.log('Error:', e);
	}
});


module.exports = bot;