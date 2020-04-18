const fetch = require("node-fetch");
const { Composer } = require("micro-bot")
const { getParams } = require("./Params");
const { fetchBusesData, checkDeveloper } = require("./utils");
const { parse } = require("node-html-parser");

const bot = new Composer()


// bot.use(checkDeveloper);
bot.start(({ reply }) => reply("Hey there!"));
bot.command("help", ({ reply }) => reply("Help message"));
bot.command("about", ({ reply }) => reply("About message"));

// bot.command("list", async ({ reply }) => {
// 	const page = await fetch("http://bus.com.ua/cgi-bin/tablo.pl?as=460280").then(res => res.text());
// 	const root = parse(page);
// 	const bs = root.querySelectorAll('td');
// 	console.log(bs);
// 	const data = bs.map(item => item.text);
// 	console.log(data);
// 	// console.log(data);
// 	return reply(data);
// });

bot.on("message", async ( ctx ) => {
	const replyMessage = await ctx.replyWithMarkdown("Зачекайте будь ласка.");
	const buses = await fetchBusesData();
	const params = getParams(ctx.message.text.toLowerCase());
	if (buses && buses.length) {
		buses.forEach((bus) => {
			ctx.replyWithVenue(bus.Y, bus.X, bus.VehicleName, bus.RouteName);
		});
	} else {
		ctx.reply('Вибачте, нажаль жодного автобуса не знайдено :(');
	}
});


module.exports = bot;
