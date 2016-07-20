function Skin(name, skin, rarity, collection, minFloat, maxFloat, statTrak, souvenir, gun, image, price) {
	this.name = name;
	this.skin = skin;
	this.gun = gun;
	this.rarity = rarity;
	this.collection = collection;
	this.minFloat = minFloat;
	this.maxFloat = maxFloat;
	this.statTrak = statTrak;
	this.souvenir = souvenir;
	this.displayName = gun + " | " + skin;
	this.price = price;
	this.image = image;
	skins[name] = this;
}

function InventorySkin(skin, st) {
	this.skin = skin;
	this.st = st;
	this.exterior = "NaN";
	this.flt = Number((Math.random() * (skin.minFloat - skin.maxFloat) + skin.maxFloat).toFixed(8));
	
	if (this.flt <= 0.07)
		this.exterior = "Factory New";
	else if (this.flt <= 0.15)
		this.exterior = "Minimal Wear";
	else if (this.flt <= 0.38)
		this.exterior = "Field-Tested";
	else if (this.flt <= 0.45)
		this.exterior = "Well-Worn";
	else if (this.flt <= 1)
		this.exterior = "Battle-Scarred";
	else {
		throw new Error("Attempted to index a float value greater than 1.0");
		return;
	}
}