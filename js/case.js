cases = {};
rollCaseName = "";
rollItems = [];
rollItemsST = [];

function Case(name, price, key, image, logo, collection, items) {
	this.items = items;
	this.collection = collection;
	this.name = name;
	this.logo = logo;
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
	if (Math.random() <= 0.1 && skin.statTrak == true)
		rollItemsST.push(true);
	else
		rollItemsST.push(false);
	rollItems.push(skin);
}

function rollCase(name) {
	tab = "caseRoll";
	rollCaseName = name;
	window.setTimeout(function() {
		if (cases[name] == null) {
			throw new Error("Attempted to find a case with the name '" + name + "' but it was not present");
			return;
		}
		rollItems = [];
		rollItemsST = [];
		var display = document.getElementById("caseRollDisplay");
		var divider = document.getElementById("caseRollDivider");
		var text = "";
		display.innerHTML="";
		for (var i = 0; i < 40; i++) {
			addItemToRollList();
			text += "<div style='border:2px solid black; background-size:100% 100%; position:absolute; height:100%; top:0; left:"+
			(i*((divider.offsetWidth-8)/3))+"px; width:"+((divider.offsetWidth-8)/3)+"px; background-image: url("+rollItems[i].image+
			");'><img src='graphics/misc/transparent.png' class='caseST'></img></div>";
		}
		display.innerHTML=text;
		for (var i = 0; i < 40; i++) {
			switch(rollItems[i].rarity) {
				case 0:
					document.getElementById("caseRollDisplay").children[i].style.backgroundColor="#ccccb3";
					break;
				case 1:
					document.getElementById("caseRollDisplay").children[i].style.backgroundColor="#809fff";
					break;
				case 2:
					document.getElementById("caseRollDisplay").children[i].style.backgroundColor="#0066ff";
					break;
				case 3:
					document.getElementById("caseRollDisplay").children[i].style.backgroundColor="#a64dff";
					break;
				case 4:
					document.getElementById("caseRollDisplay").children[i].style.backgroundColor="#ff4dc4";
					break;
				case 5:
					document.getElementById("caseRollDisplay").children[i].style.backgroundColor="#ff0000";
					break;
				case 6:
					document.getElementById("caseRollDisplay").children[i].style.backgroundColor="#ffff00";
					break;
			}
			document.getElementById("caseRollDisplay").children[i].firstChild += ((i*display.firstChild.offsetWidth)+"px");
			if (rollItemsST[i] == true)
				document.getElementById("caseRollDisplay").children[i].firstChild.src = "graphics/misc/stattrak.png";
		}
	},1);
}

function finishCase() {
	var i = 0;
	$("#caseRollDisplay div").animate({
		left: "-="+(document.getElementById("caseRollDisplay").lastChild.offsetLeft-(document.getElementById("caseRollDisplay").firstChild.offsetWidth*2))
	}, 5000, function() {
		i++;
		if (i == 40) {
			addSkinToInventory(rollItems[rollItems.length-2], rollItemsST[rollItemsST.length-2]);
			//inspectSkin(inventory[inventory.length-1]);
			rollCaseName = "unknown";
		}
	});
}