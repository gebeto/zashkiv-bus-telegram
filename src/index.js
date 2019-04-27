const { Composer } = require("micro-bot")
const { getParams } = require("./Params");
const { fetchBusesData, checkDeveloper } = require("./utils");

const bot = new Composer()


// bot.use(checkDeveloper);
bot.start(({ reply }) => reply("Hey there!"));
bot.command("help", ({ reply }) => reply("Help message"));
bot.command("about", ({ reply }) => reply("About message"));

bot.on("message", async ( ctx ) => {
	const replyMessage = await ctx.replyWithMarkdown("Зачекайте будь ласка.");
	const buses = await fetchBusesData();
	const params = getParams(ctx.message.text.toLowerCase());
	buses.forEach((bus) => {
		ctx.replyWithVenue(bus.Y, bus.X, bus.VehicleName, bus.RouteName);
	});
});


module.exports = bot;
