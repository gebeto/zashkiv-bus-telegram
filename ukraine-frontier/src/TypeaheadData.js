const TypeaheadDataFetcher = require('./TypeaheadDataFetcher');


class TypeaheadData {
	constructor() {
		this.data = [];
	}

	update(data) {
		this.data = data;
	}
}


module.exports = TypeaheadData;