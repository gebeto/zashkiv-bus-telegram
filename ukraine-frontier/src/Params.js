
function getParams(text: string): Object {
	const res: Object = {};
	var argPattern: RegExp = /-([\w\W])+?\s([\w\W])+\s?/g;
	const params: RegExpMatchArray | null = text.match(argPattern);
	if (params) {
		params.map((p) => {
			const pp = p.replace('-', '').trim().split(' ');
			if (pp.length > 1) {
				res[pp[0]] = pp[1];
			}
		});
	}
	return res;
}


exports.getParams = getParams;