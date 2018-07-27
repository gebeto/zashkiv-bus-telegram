const path = require('path');
const PImage = require('pureimage');
const Grid = require('../Grid');


const OpenSans = PImage.registerFont(
	path.resolve(__dirname, '../fonts/OpenSans-Bold.ttf'),
	'Open Sans Pro'
);


function createHeader(data) {
	const fontSize = 50;
	const header = new Grid.Item(800, 100, (ctx, w, h) => {
		const fontSize = 50;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = '#ffffff';
		ctx.font = `${fontSize}px 'Open Sans Pro'`;
		const text = `Гравці онлайн: ${data.players.length}/50`;
		const ms = ctx.measureText(text);
		ctx.fillText(text, w / 2 - ms.width / 2, h / 2 + fontSize / 2);
	});

	return header;
}

function createPlayerCell(player) {
	const fontSize = 40;
	const cell = new Grid.Item(800, 100, (ctx, w, h) => {
		ctx.font = `${fontSize}px 'Open Sans Pro'`;
		ctx.strokeRect(0, 0, w - 1, h - 1);
	});

	const nameCell = new Grid.Item(400, 100, (ctx, w, h) => {
		ctx.font = `${fontSize}px 'Open Sans Pro'`;
		ctx.strokeRect(0, 0, w - 1, h - 1);
		ctx.fillStyle = 'black';
		// const text = `${player.account} - Health: ${player.health}`;
		const text = `${player.account}`;
		const ms = ctx.measureText(text);
		ctx.fillText(text, w / 2 - ms.width / 2, h / 2 + fontSize / 2);
	});
	
	const statusCell = new Grid.Item(400, 100, (ctx, w, h) => {
		ctx.strokeRect(0, 0, w - 1, h - 1);
	});


	const healthCell = new Grid.Item(400, 50, (ctx, w, h) => {
		ctx.font = `${fontSize}px 'Open Sans Pro'`;
		ctx.strokeRect(0, 0, w - 1, h - 1);
		ctx.fillStyle = 'black';
		// const text = `${player.account} - Health: ${player.health}`;
		const text = `Health: ${player.health}`;
		const ms = ctx.measureText(text);
		ctx.fillText(text, w / 2 - ms.width / 2, h / 2 + fontSize / 2);
	});
	const armorCell = new Grid.Item(400, 50, (ctx, w, h) => {
		ctx.font = `${fontSize}px 'Open Sans Pro'`;
		ctx.strokeRect(0, 0, w - 1, h - 1);
		ctx.fillStyle = 'black';
		// const text = `${player.account} - Health: ${player.health}`;
		const text = `Armor: ${player.armor}`;
		const ms = ctx.measureText(text);
		ctx.fillText(text, w / 2 - ms.width / 2, h / 2 + fontSize / 2);
	});

	statusCell.push(healthCell);
	statusCell.push(armorCell);
	cell.push(nameCell);
	cell.push(statusCell);

	return cell;
}

function drawStatusNew(data) {
	return new Promise((resolve, reject) => {
		const statusImage = PImage.make(800, 800);
		const ctx = statusImage.getContext('2d');

		const grid = new Grid.Item(800, 800, (ctx, w, h) => {
			ctx.strokeRect(0, 0, w, h);
		});

		grid.push(createHeader(data));

		OpenSans.load(() => {
			const fontSize = 40;

			if (data.players.length) {
				data.players.forEach((player) => {
					grid.push(createPlayerCell(player));
				});
			} else {
				// grid.push(new Grid.Item(800, 100, (ctx, w, h) => {
				// 	ctx.font = `${fontSize}px 'Open Sans Pro'`;
				// 	ctx.strokeRect(0, 0, w - 1, h - 1);
				// 	ctx.fillStyle = 'black';
				// 	const text = 'Немає гравців.';
				// 	const ms = ctx.measureText(text);
				// 	ctx.fillText(text, w / 2 - ms.width / 2, h / 2 + fontSize / 2);
				// }));
			}

			statusImage.width = grid.recalculatedWidth;
			statusImage.height = grid.recalculatedHeight;
			grid.draw(ctx);

			resolve(statusImage);
		});
	});
}

function drawStatus(data) {
	const players = data.players;
	return new Promise((resolve, reject) => {
		const cellHeight = 100;
		const fontSize = 40;
		const statusImageHeight = players.length * cellHeight + 200;
		const statusImageWidth = 600;
		const statusImage = PImage.make(statusImageWidth, statusImageHeight);
		const ctx = statusImage.getContext('2d');

		ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
		ctx.fillRect(0, 0, statusImageWidth, statusImageHeight);

		ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
		const infoTop = players.length * cellHeight + 5;
		ctx.fillRect(0, infoTop, statusImageWidth, 5);

		OpenSans.load(() => {
			ctx.fillStyle = 'rgba(255,255,255,1.0)';
			ctx.font = `${fontSize}px 'Open Sans Pro'`;
			const padding = ((cellHeight - fontSize) / 2);
			players.map((p, index) => {
				ctx.fillText(p.account, padding, (cellHeight * (index + 1)) - padding);
			});

			const strArr = (new Date()).toGMTString().split(" ");
			strArr.pop();
			const str = strArr.join(" ");
			const mt = ctx.measureText(str);
			ctx.fillText(str, statusImageWidth / 2 - mt.width / 2, infoTop + 40);

			ctx.fillText("Online status", padding, infoTop + 100);

			resolve(statusImage);
		});

	});
}

function test(data) {
	const img = PImage.make(100, 100);
	return img;
}


exports.drawStatusNew = drawStatusNew;
exports.drawStatus = drawStatus;
exports.test = test;