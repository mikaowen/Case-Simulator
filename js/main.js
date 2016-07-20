function disableAllTabs() {
	document.getElementById("caseRollContainer").style.display = "none";
	//document.getElementById("shop").style.display = "none";
	document.getElementById("inventory").style.display = "none";
}

//Main game clock
setInterval(function() {
	
	//Current main_container tab
	disableAllTabs();
	switch(tab) {
		case "inventory":
			document.getElementById("inventory").style.display = "inline";
			break;
		case "shop":
			document.getElementById("shop").style.display = "inline";
			break;
		case "caseRoll":
			document.getElementById("caseRollContainer").style.display = "inline";
			break;
		default:
			throw new Error("The tab variable has an invalid value.");
			break;
	}
	
	//Inventory tooltip
	var tooltip = document.getElementById("tooltip");
	if (tooltip != null && isNaN(Number(tooltip.innerHTML)) == false) {
		var skin = inventory[Number(tooltip.innerHTML)+(inventoryPage*25)-1];
		if (skin instanceof InventorySkin) {
			//Decides what color coresponds with the rarity value of the skin
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
			
			var stat = "";
			var price = 0.00;
			var prices = skin.skin.price[0];
			if (skin.st == true) {
				stat = "StatTrak ";
				prices = skin.skin.price[1];
			}
			
			//Looking up the price of the gun
			switch(skin.exterior) {
				case "Factory New":
					price = prices[0];
					break;
				case "Minimal Wear":
					price = prices[1];
					break;
				case "Field-Tested":
					price = prices[2];
					break;
				case "Well-Worn":
					price = prices[3];
					break;
				case "Battle-Scarred":
					price = prices[4];
					break;
				default:
					throw new Error("A skin with an invalid exterior was found: "+skin.exterior);
			}
			
			//The layout of the inventory tooltip being inserted into the HTML input stream via javascript
			var text = "<div class='row text-center' id='tooltipHeader'><text style='font-size:1em;'>"+stat+skin.skin.displayName+
			"</text></div><div class='row text-left' style='width:100%;'><ul style='list-style-type:none; width:auto;'>"+
			"<li><text>Weapon: "+skin.skin.gun+"</text></li><li><text>Skin: "+skin.skin.skin+
			"</text></li><li><text>Collection: The "+cases[skin.skin.collection].collection+
			" collection</li><li><text>Exterior: "+skin.exterior+"</text></li><li><text>Float: "+
			skin.flt+"</li></text><li><text>Price: $"+price+"</text></li></ul></div>"+
			"<div id='tooltipFloat' class='row text-center'><table id='tooltipFloatTable'><div class='tooltipFloatBG'></div><div class='tooltipFloatBG'></div>"+
			"<div id='tooltipFloatDivider'><tbody><tr><td style='width:7%;'><text>FN</text></td><td style='width:8%;'><text>MW</text></td>"+
			"<td style='width:23%;'><text>FT</text></td><td style='width:7%;'>"+
			"<text>WW</text></td><td style='width:55%;'><text>BS</text></td></tr></tbody></table></div>"
			
			//Editing the style of the elements via javascript
			tooltip.innerHTML=text;
			document.getElementById("tooltipHeader").style.backgroundColor=color;
			var width = document.getElementById("tooltipFloatTable").offsetWidth;
			var height = document.getElementById("tooltipFloatTable").offsetHeight;
			var divider = document.getElementById("tooltipFloatDivider");
			var bg = document.getElementsByClassName("tooltipFloatBG");
			divider.style.height=height-4;
			divider.style.bottom="-"+(height-2)+"px";
			divider.style.right="-"+Math.floor((skin.flt*100)*((width-4)/100))+"px";
			divider.style.marginTop="-"+(height)+"px";
			bg[0].style.height=height-4;
			bg[1].style.height=height-4;
			bg[1].style.width=Math.floor(((1-skin.skin.minFloat)*100)*((width-4)/100));
			bg[0].style.width=Math.floor(((skin.skin.maxFloat)*100)*((width-4)/100));
			bg[0].style.right="-2px"
			bg[1].style.right="-"+((width-2)-Math.floor(((1-skin.skin.minFloat)*100)*((width-4)/100)))+"px";
			bg[0].style.bottom="-"+(height-6)+"px";
			bg[1].style.bottom="-"+(height-6)+"px";
			bg[0].style.marginTop="-"+(height-4)+"px";
			bg[1].style.marginTop="-"+(height-4)+"px";
		} else {
			tooltip.innerHTML="Empty slot";
			tooltip.style.width="auto";
			tooltip.style.padding="1em";
		}
	}
}, 0);

//jquery
$("#headerInventoryButton").click(function() {
	openInventory();
});
$("#headerShopButton").click(function() {
	openShop();
});
$("#caseButton").click(function() {
	tab="caseRoll";
});
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});