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
			var text = "<text>Name: "+skin.skin.displayName+"</text><br><text>Weapon: "+
			skin.skin.gun+"</text><br><text>Skin: "+skin.skin.skin+"</text>";
			tooltip.innerHTML=text;
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

