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

function sellInventoryItem() {
	var item = inventory[inventoryItemPosition];
	var prices = -1;
	if (item instanceof InventorySkin) {
		prices = item.skin.price;
		prices = (item.st) ? item.skin.price[1] : item.skin.price[0];
		switch(item.exterior) {
			case "Factory New":
				prices = prices[0];
				break;
			case "Minimal Wear":
				prices = prices[1];
				break;
			case "Field-Tested":
				prices = prices[2];
				break;
			case "Well-Worn":
				prices = prices[3];
				break;
			case "Battle-Scarred":
				prices = prices[4];
				break;
			default:
				throw new Error("A skin with an invalid exterior was found: "+skin.exterior);
		}
	} else if (item instanceof Case || item instanceof Key)
		prices = item.price;
	
	money += prices;
	inventory.splice(inventoryItemPosition, 1);
	openInventory(inventoryPage);
}