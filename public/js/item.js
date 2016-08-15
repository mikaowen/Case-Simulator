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
	} else if (item instanceof Case || item instanceof Key) {
		prices = item.price;
		if (item instanceof Case)
			inventoryCases[item.collection]--;
		else
			inventoryKeys[item.collection]--;
	}

	addMoney(prices);
	inventory.splice(inventoryItemPosition, 1);
	openInventory(inventoryPage);
}
