const fs = require('fs');
const shedule = require('./Shedule');

shedule
	.get("ПЗ-31з")
	.then((bufferStream) => {
		const ws = fs.createWriteStream("test.png");
		ws.write(bufferStream.buffer)
	})
	.catch(err => console.log('Err', err));