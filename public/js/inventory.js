inventoryPage = 0;

function drawInventory() {
  console.log(inventorySkins);
  for (var i = 1; i < 26; i++) {
		document.getElementById("inv"+i+"bg").style.backgroundColor="#e1e1d0";
		document.getElementById("inv"+i+"img").src="";
		document.getElementById("inv"+i+"bg").children[0].innerHTML="";
		document.getElementById("inv"+i+"bg").children[2].innerHTML="";
		document.getElementById("inv"+i+"st").src="graphics/misc/transparent.png"
	}
	for (var i = 1; i < inventorySkins.length+1; i++) {
		var item = inventory[i+(inventoryPage*25)-1];
    var skin = inventorySkins[i-1];
		var rarity = 0;

		if (skin.type == "skin") {
			document.getElementById("inv"+i+"bg").children[0].innerHTML=skin.gun;
			document.getElementById("inv"+i+"bg").children[2].innerHTML=skin.skin;
			document.getElementById("inv"+i+"img").src=skin.image;
			rarity = skin.rarity;
		} else if (skin.type == "key" || skin.type == "case") {
			document.getElementById("inv"+i+"bg").children[0].innerHTML=skin.collection.substring(0,1).toUpperCase()+skin.collection.substring(1,skin.collection.length);
			document.getElementById("inv"+i+"img").src=skin.image;
			if (skin.type == "key")
				document.getElementById("inv"+i+"bg").children[2].innerHTML="Case Key";
			else if (skin.type == "case")
				document.getElementById("inv"+i+"bg").children[2].innerHTML="Case";
		}

		if (item.st == true)
			document.getElementById("inv"+i+"st").src="graphics/misc/stattrak.png"
		switch(rarity) {
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
	$.post("/get_inventory", {"user":"kek"}, function(inventory) {
		document.getElementById("inventoryPageText").innerHTML="Page "+(inventoryPage+1)+"/"+Math.max(Math.ceil(inventory.length/25),1);
		document.getElementById("inventoryLastPage").disabled = false;
		if (inventory.length > (inventoryPage+1)*25)
			document.getElementById("inventoryNextPage").disabled = false;
		else
			document.getElementById("inventoryNextPage").disabled = true;
		drawInventory();
	});
}

function inventoryLastPage() {
	inventoryPage--;
	$.post("/get_inventory", {"user":"kek"}, function(inventory) {
		document.getElementById("inventoryPageText").innerHTML="Page "+(inventoryPage+1)+"/"+Math.max(Math.ceil(inventory.length/25),1);
		document.getElementById("inventoryNextPage").disabled = false;
		if (inventoryPage != 0)
			document.getElementById("inventoryLastPage").disabled = false;
		else
			document.getElementById("inventoryLastPage").disabled = true;
		drawInventory();
	});
}

function openInventory(page) {
	tab = "inventory";
	inventoryPage = page;
	$.post("/get_inventory",{"user":"kek"}, function(inventory) {
		document.getElementById("inventoryPageText").innerHTML="Page "+(inventoryPage+1)+"/"+Math.max(Math.ceil(inventory.length/25),1);
		document.getElementById("inventoryLastPage").disabled = true;
		if (inventory.length > 25)
			document.getElementById("inventoryNextPage").disabled = false;
		else
			document.getElementById("inventoryNextPage").disabled = true;
		drawInventory();
	});
}
