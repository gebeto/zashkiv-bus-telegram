function getParams(text) {
	const res = {};
	// var argPattern = new RegExp("-([\\w\\W])+?\\s([\\w\\W])+?\\s?", "g");
	var argPattern = /-([\w\W])+?\s([\w\W])+\s?/g;
	// console.log(text);
	let params = text.match(argPattern);
	if (params) {
		params.map((p) => {
			const pp = p.replace("-", "").trim().split(" ");
			if (pp.length > 1) {
				res[pp[0]] = pp[1];
			}
		});
	}
	// console.log(params, res);
	return res;
}


exports.getParams = getParams;
