function Item(name, skin, rarity, collection, minFloat, maxFloat, statTrack, souvenir, gun, price) {
	this.name = name;
	this.skin = skin;
	this.gun = gun;
	this.rarity = rarity;
	this.collection = collection;
	this.minFloat = minFloat;
	this.maxFloat = maxFloat;
	this.statTrack = statTrack;
	this.souvenir = souvenir;
	this.displayName = gun + " | " + skin;
	this.price = price;
	skins[name] = this;
}