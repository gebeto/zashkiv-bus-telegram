const fetch = require('node-fetch');
const FormData = require('form-data');
const TypeaheadData = require('./TypeaheadData');
const iconv = require('iconv');

const fs = require('fs');


class TypeaheadDataFetcher {

	constructor(dataContainer) {
		this.dataContainer = dataContainer;
	}

	uriEncode(params) {
		return Object.keys(params).map((key) => `${decodeURI(key)}=${decodeURI(params[key])}`).join('&');
	}

	async fetch() {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		const formData = new FormData();
		formData.append('is_ajax', 'true');
		formData.append('plugin', 'helper');
		formData.append('action', 'getPoint');

		const resp = await fetch('https://dpsu.gov.ua', {
			method: "POST",
			body: formData
		});

		const data = await resp.text();

		// const w = fs.createWriteStream('f.json')
		// w.write(data);

		// console.log(data);
		const json = JSON.parse(data.replace(/\s/ig, ' '));
		return ;
	}
}


module.exports = TypeaheadDataFetcher;


const dc = new TypeaheadData();
const t = new TypeaheadDataFetcher(dc);
t
	.fetch()
	.then(data => {
		console.log(data);
	})
	.catch(console.log);