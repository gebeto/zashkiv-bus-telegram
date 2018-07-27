const Stream = require("stream");
const Buffer = require("buffer").Buffer;


class BufferStream extends Stream.Writable {
	constructor(opts) {
		super(opts);
		this.chunks = [];
	}

	_write(chunk, encoding, done) {
		this.chunks.push(chunk);
		done();
	}

	get buffer() {
		return Buffer.concat(this.chunks);
	}
}

module.exports = BufferStream;