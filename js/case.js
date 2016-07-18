cases = {};
rollCaseName = "";
rollingCaseSpeed = 1000000;
rollingCaseTimer = 0;
rollItems = [];

function Case(name, price, key, image, items) {
	this.items = items;
	this.name = name;
	this.price = price;
	this.key = key;
	this.image = image;
	this.t = [[],[],[],[],[],[],[]];
	for (var i = 0; i < this.items.length; i++) {
		switch(this.items[i].rarity) {
			case 0:
				this.t[0].push(this.items[i]);
				break;
			case 1:
				this.t[1].push(this.items[i]);
				break;
			case 2:
				this.t[2].push(this.items[i]);
				break;
			case 3:
				this.t[3].push(this.items[i]);
				break;
			case 4:
				this.t[4].push(this.items[i]);
				break;
			case 5:
				this.t[5].push(this.items[i]);
				break;
			case 6:
				this.t[6].push(this.items[i]);
				break;
			default:
				throw new Error("Attempted to get item rarity value of '" + this.items[i].name + "'but found an invalid specifier");
				return;
		}
	}
	cases[name] = this;
}

function updateCaseImages() {
	document.getElementById("caseImage1").src = rollItems[rollItems.length-3].image;
	document.getElementById("caseImage2").src = rollItems[rollItems.length-2].image;
	document.getElementById("caseImage3").src = rollItems[rollItems.length-1].image;
}

function addItemToRollList() {
	var t = 0;
	var rand = Math.random();
	if (rand <= 0.7879 ) {
		t = 2;
	} else if (rand <= 0.9575) {
		t = 3;
	} else if (rand <= 0.9857) {
		t = 4;
	} else if (rand <= 0.9956) {
		t = 5;
	} else {
		t = 6;
	}
	var count = cases[rollCaseName].t[t].length;
	var skin = cases[rollCaseName].t[t][Math.floor(Math.random() * count)];
	if (Math.random() <= 0.1 && skin.statTrak == true) {
		skin.st = true;
		console.log("yeey");
	}
		
	rollItems.push(skin);
	console.log(skin);
}

function rollCase(name) {
	if (cases[name] == null) {
		throw new Error("Attempted to find a case with the name '" + name + "' but it was not present");
		return;
	}
	rollCaseName = name;
	rollingCaseSpeed = 1;
	rollItems = [];
	rollingCaseTimer = 0;
	addItemToRollList();
	addItemToRollList();
	addItemToRollList();
}

setInterval(function updateCaseRoll() {
	if (rollingCaseSpeed < 40) {
		rollingCaseTimer++;
		if (Math.random() < 0.1) {
			rollingCaseSpeed++;
		}
		if (rollingCaseTimer >= rollingCaseSpeed) {
			rollingCaseTimer = 0;
			addItemToRollList();
			updateCaseImages();
		}
	} else if (rollingCaseSpeed == 40) {
		rollingCaseSpeed++;
		rollingCaseTimer = 0;
		var skin = rollItems[rollItems.length-2];
		addSkinToInventory(skin, skin.st);
		inspectSkin(inventory[inventory.length-1]);
		console.log("-----------------");
		console.log(skin);
	}
}, 10)