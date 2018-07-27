const fetch = require('node-fetch');


class PlayCraftFetcher {
	async fetchStatus() {
		const url = 'http://map.playcraft.com.ua:8123/up/world/world/';
		return fetch(url).then((res) => res.json());
	}
}


module.exports = PlayCraftFetcher;