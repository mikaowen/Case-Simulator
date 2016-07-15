cases = [];

function Case(name, price, key, items) {
	this.items = items;
	this.name = name;
	this.price = price;
	this.key = key;
	cases.push(this);
}

function roll(name) {
	
}