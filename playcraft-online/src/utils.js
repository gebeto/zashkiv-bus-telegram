const PImage = require('pureimage');
const BufferStream = require("./BufferStream");


function convertImageToStream(image) {
	return new Promise((resolve, reject) => {
		const pngStream = new BufferStream();
		PImage.encodePNGToStream(image, pngStream).then(() => {
			resolve(pngStream);
		}).catch(reject);
	});
}


exports.convertImageToStream = convertImageToStream;