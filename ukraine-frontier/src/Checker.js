
async function isDeveloper(ctx) {
	if (ctx.from.username !== 'gebeto') {
		throw new Error('Бот знаходиться на етапі розробки, на даному етапі тільки розробник може ним користуватися.');
	}
}


exports.isDeveloper = isDeveloper;