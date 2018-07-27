const webshot = require('webshot');
const BufferStream = require('./BufferStream');


function get(group = 'пз-21з') {
	const bufferStream = new BufferStream();
	const filename = 'shedule.png';
	const url = `http://lpnu.ua/rozklad-dlya-studentiv-zaochnykiv?group=${encodeURI(group)}`;
	return new Promise((resolve, reject) => {
		const renderStream = webshot(
			"http://lpnu.ua/rozklad-dlya-studentiv-zaochnykiv?group=1",
			{
				shotSize: {
					width: 1000,
					height: 'all'
				},
				customJS: 'document.body.innerHTML = document.querySelector("article").outerHTML;',
			},
		);
		renderStream.on('data', function(data) {
		  bufferStream.write(data.toString('binary'), 'binary');
		});
		renderStream.on('end', function() {
			resolve(bufferStream);
		});
		renderStream.on('error', function() {
			console.log("Error!!!");
		});
	});
}


exports.get = get;