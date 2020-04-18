function checkDeveloper(bot, msg, next) {
	if (msg.from.username === "gebeto") {
		return next(ctx);
	} else {
		bot.sendMessage(msg.chat.id, "Бот знаходиться на етапі розробки, на даному етапі тільки розробник може ним користуватися.")
	}
}


exports.checkDeveloper = checkDeveloper;
