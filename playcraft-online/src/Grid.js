const PImage = require('pureimage');


class ItemsRow {
	constructor(maxWidth, y = 0, elements = []) {
		this.maxWidth = maxWidth;
		this.y = y;
		this.elements = elements;
	}

	get currentWidth() {
		return this.elements.reduce((sum, el) => sum + el.width, 0);
	}

	get height() {
		return Math.max.apply(null, this.elements.map(el => el.height));
	}

	push(item) {
		if (this.currentWidth + item.width <= this.maxWidth) {
			item.x = this.currentWidth;
			item.y = this.y;
			this.elements.push(item);
			return true;
		}
		return false;
	}

	draw(ctx) {
		this.elements.forEach(el => {
			el.draw(ctx);
		});
	}
}

class Item {
	constructor(width = 0, height = 0, paint = () => {}, isRoot = false) {
		this.isRoot = isRoot;
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.rows = [];
		this.paint = paint;
	}

	push(item) {
		const rowsCount = this.rows.length;
		if (rowsCount) {
			const row = this.rows[rowsCount - 1];
			if (!row.push(item)) {
				const newRow = new ItemsRow(this.width, this.rows.reduce((sum, r) => sum + r.height, 0));
				newRow.push(item);
				this.rows.push(newRow);
			}
		} else {
			this.rows.push(new ItemsRow(this.width));
			this.push(item);
		}
		return this;
	}

	get recalculatedHeight() {
		return this.rows.reduce((sum, row) => sum + row.height, 0);
	}

	get recalculatedWidth() {
		return Math.max.apply(null, this.rows.map((row) => row.currentWidth));
	}

	draw(ctx) {
		const canvas = PImage.make(this.width, this.height);
		const canvasCtx = canvas.getContext('2d');
		if (this.isRoot) {
			this.paint(canvasCtx, this.recalculatedWidth, this.recalculatedHeight);
		} else {
			this.paint(canvasCtx, this.width, this.height);
		}
		this.rows.forEach((r) => {
			r.draw(canvasCtx);
		});
		ctx.drawImage(canvas, this.x, this.y);
	}
}


exports.ItemsRow = ItemsRow;
exports.Item = Item;