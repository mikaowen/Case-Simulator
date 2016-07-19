function disableAllTabs() {
	document.getElementById("case_draw").style.display = "none";
	//document.getElementById("shop").style.display = "none";
	document.getElementById("inventory").style.display = "none";
}

//Main game clock
setInterval(function() {
	disableAllTabs();
	switch(tab) {
		case "inventory":
			document.getElementById("inventory").style.display = "inline";
			break;
		case "shop":
			document.getElementById("shop").style.display = "inline";
			break;
		case "case_draw":
			document.getElementById("case_draw").style.display = "inline";
			break;
		default:
			throw new Error("The tab variable has an invalid value.");
			break;
	}
	
	var tooltip = document.getElementById("tooltip");
	if (tooltip != null && isNaN(Number(tooltip.innerHTML)) == false) {
		var skin = inventory[Number(tooltip.innerHTML)+(inventoryPage*25)-1];
		if (skin instanceof InventorySkin) {
			switch(skin.skin.rarity) {
				case 0:
					color = "#ccccb3";
					break;
				case 1:
					color = "#809fff";
					break;
				case 2:
					color = "#0066ff";
					break;
				case 3:
					color = "#a64dff";
					break;
				case 4:
					color = "#ff4dc4";
					break;
				case 5:
					color = "#ff0000";
					break;
				case 6:
					color = "#ffff00";
					break;
				default:
					color = "black";
					break;
			}
			
			var text = "<div class='row' style='width:15%;'><ul style='list-style-type:none; width:auto;'><li><text>Name: "+
			skin.skin.displayName+"</text></li><li><text>Weapon: "+
			skin.skin.gun+"</text></li><li><text>Skin: "+skin.skin.skin+
			"</text></li><li><text>Collection: The "+cases[skin.skin.collection].collection+
			" collection</li></ul></div>";
			
			tooltip.innerHTML=text;
			tooltip.style.color=color;
		} else {
			tooltip.innerHTML="Empty slot";
		}
	}
}, 0);

$("#headerInventoryButton").click(function() {
	openInventory();
});
$("#headerShopButton").click(function() {
	openShop();
});
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});