inventory = [];
inventoryPage = 0;

function inspectSkin(skin) {
	
}

function addSkinToInventory(name, st) {
	var skin = new InventorySkin(name, st);
	inventory.splice(0, 0, skin);
}

function drawInventory() {
	for (var i = 1; i < 26; i++) {
		document.getElementById("inv"+i+"bg").style.backgroundColor="#e1e1d0";
		document.getElementById("inv"+i+"img").src="";
		document.getElementById("inv"+i+"bg").children[0].innerHTML="";
		document.getElementById("inv"+i+"bg").children[2].innerHTML="";
	}
	for (var i = 1; i < Math.min(inventory.length+1, 26); i++) {
		var skin = inventory[i+(inventoryPage*25)-1];
		document.getElementById("inv"+i+"img").src=skin.skin.image;
		document.getElementById("inv"+i+"bg").children[0].innerHTML=skin.skin.gun;
		document.getElementById("inv"+i+"bg").children[2].innerHTML=skin.skin.skin;
		switch(inventory[i+(inventoryPage*25)-1].skin.rarity) {
			case 0:
				document.getElementById("inv"+i+"bg").style.backgroundColor="#ccccb3";
				break;
			case 1:
				document.getElementById("inv"+i+"bg").style.backgroundColor="#809fff";
				break;
			case 2:
				document.getElementById("inv"+i+"bg").style.backgroundColor="#0066ff";
				break;
			case 3:
				document.getElementById("inv"+i+"bg").style.backgroundColor="#a64dff";
				break;
			case 4:
				document.getElementById("inv"+i+"bg").style.backgroundColor="#ff4dc4";
				break;
			case 5:
				document.getElementById("inv"+i+"bg").style.backgroundColor="#ff0000";
				break;
			case 6:
				document.getElementById("inv"+i+"bg").style.backgroundColor="#ffff00";
				break;
		}
	}
}

function inventoryNextPage() {
	inventoryPage++;
	document.getElementById("inventoryPageText").innerHTML="Page "+(inventoryPage+1)+"/"+Math.max(Math.ceil(inventory.length/25),1);
	document.getElementById("inventoryLastPage").disabled = false;
	if (inventory.length > (inventoryPage+1)*25)
		document.getElementById("inventoryNextPage").disabled = false;
	else
		document.getElementById("inventoryNextPage").disabled = true;
	drawInventory();
}

function inventoryLastPage() {
	inventoryPage--;
	document.getElementById("inventoryPageText").innerHTML="Page "+(inventoryPage+1)+"/"+Math.max(Math.ceil(inventory.length/25),1);
	document.getElementById("inventoryNextPage").disabled = false;
	if (inventoryPage != 0)
		document.getElementById("inventoryLastPage").disabled = false;
	else
		document.getElementById("inventoryLastPage").disabled = true;
	drawInventory();
}

function openInventory() {
	tab = "inventory";
	inventoryPage = 0;
	document.getElementById("inventoryPageText").innerHTML="Page "+(inventoryPage+1)+"/"+Math.max(Math.ceil(inventory.length/25),1);
	document.getElementById("inventoryLastPage").disabled = true;
	if (inventory.length > 25)
		document.getElementById("inventoryNextPage").disabled = false;
	else
		document.getElementById("inventoryNextPage").disabled = true;
	drawInventory();
}