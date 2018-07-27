// const { Composer, log } = require('micro-bot')
// const fetch = require('node-fetch')
import { Composer, log } from 'micro-bot';
import fetch from 'node-fetch';

import { Replyable } from './interfaces/Replyable';
import { BusData } from './interfaces/BusData';

const bot = new Composer()

// function google(obj1) {
// 	const url = "https://maps.googleapis.com/maps/api/geocode/json?";
// 	const obj = {
// 		latlng: '49.8635486,24.0514178',
// 		sensor: false,
// 		key: 'AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0',
// 		components: 'administrative_area|country'
// 	};
// 	return url + Object.keys(obj).map((key) => {
// 		return `${key}=${obj[key]}`;
// 	}).join('&');
// }

function googleStatic(lat: number, long: number, params: any = {}) {
	const url: string = "https://maps.googleapis.com/maps/api/staticmap?";
	const icon: string = 'icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=bus%257CFF0000';
	const obj = {
		zoom: "16",
		size: "1080x1080",
		markers: `color:red%7C${icon}%7C${lat},${long}`, // color: red | green | blue | yellow
		maptype: 'hybrid', // roadmap | satelite | hybrid
		key: 'AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0',
		...params,
	};
	return url + Object.keys(obj).map((key) => {
		return `${key}=${obj[key]}`;
	}).join('&');
}

function getParams(text: string) {
	const res: any = {};
	var argPattern: RegExp = /-([\w\W])+?\s([\w\W])+\s?/g;
	let params = text.match(argPattern);
	if (params) {
		params.map((p) => {
			const pp: string[] = p.replace('-', '').trim().split(' ');
			if (pp.length > 1) {
				res[pp[0]] = pp[1];
			}
		});
	}
	return res;
}

async function busesResponse(ctx: any, buses: BusData[] = [], params: any) {
	// console.log('SENDING');
	for (let i = 0; i < buses.length; i++) {
		const bus: BusData = buses[i];

		// Send location
		// await ctx.telegram.sendMessage(ctx.from.id, `${bus.VehicleName} - ${bus.RouteName}. Стан: ${bus.State}`);
		// await ctx.telegram.sendLocation(ctx.from.id, bus.Y, bus.X);

		// Send image location
		/*
		0 - 
		1 - 
		2 - на платформі
		3 - в парку
		*/
		const states = [
			'Прямує до Львова',
			'Прямує до Зашкова',
			'На платформі',
			'В парку',
		];
		await ctx.telegram.sendPhoto(ctx.from.id, googleStatic(bus.Y, bus.X, params), {
			// caption: `${bus.VehicleName} - ${bus.RouteName}. ${bus.State}`,
			caption: `${bus.VehicleName} - ${bus.RouteName}. ${states[bus.State]}`,
		});
	}
	// console.log('SENDED');
}

// bot.use(log())
bot.start(({ reply }: Replyable) => reply('Hey there!'))
bot.command('help', ({ reply }: Replyable) => reply('Help message'))
bot.command('about', ({ reply }: Replyable) => reply('About message'))

bot.on('message', ( ctx: any ) => {
	let command = ctx.message.text.toLowerCase().split(' ');
	const params = getParams(ctx.message.text.toLowerCase());
	// return;
	if (command[0] === 'get') {
		ctx.telegram.sendMessage(ctx.from.id, `Зачекайте будь ласка.`);
		fetch('http://82.207.107.126:13541/SimpleRide/LODA/SM.WebApi/api/RouteMonitoring/?code=LODA|1059838')
			.then(res => res.json()).then(json => {
				const j = JSON.parse(json);
				const res = busesResponse(ctx, j, params);
			});
	}
})

export default bot;

// https://maps.googleapis.com/maps/api/geocode/json?latlng=49.8635486,24.0514178&sensor=false&key=AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0
// function getGoogleApiUrl() {
// 	https://maps.googleapis.com/maps/api/geocode/json?latlng=49.8635486,24.0514178&sensor=false&key=AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0&components=administrative_area:TX|country:US
// 	https://maps.googleapis.com/maps/api/geocode/json?latlng=49.8635486,24.0514178&sensor=false&key=AIzaSyCAUNuYW4lBjQtErPjmWBewNjK4oVLccp0
// }