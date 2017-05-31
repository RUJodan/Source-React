const db = require("../lib/db");

export class Player {
	constructor(id, name, x=null, y=null, radius=5) {
		this.id = id;
		this.user = name;
		this.radius = radius;
		if (x === null || y === null) {
			this.x = Math.floor(Math.random() * 100) + 1;
			this.y = Math.floor(Math.random() * 100) + 1;
		} else {
			this.x = x;
			this.y = y;
		}
	}
}