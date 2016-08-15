hoverElement = "";
tab = "";
hoverInventorySkin = 0;
money = 0.00;
shopPrice = 0;
eventBus = {
	money_change:[],
}

function disableAllTabs() {
	document.getElementById("caseRollContainer").style.display = "none";
	document.getElementById("shop").style.display = "none";
	document.getElementById("inventory").style.display = "none";
	document.getElementById("unlockCase").style.display = "none";
}

//Main game clock
setInterval(function() {
	document.getElementById("caseRollDisplay").style.width=(document.getElementById("caseRollDivider").offsetWidth-8)+"px";
	document.getElementById("caseRollDisplay").style.height=(document.getElementById("caseRollDivider").offsetHeight-8)+"px";
	document.getElementById("moneyDisplay").innerHTML="$"+money.toFixed(2);
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
		case "unlockCase":
			document.getElementById("unlockCase").style.display = "inline";
			break;
		default:
			throw new Error("The tab variable has an invalid value.");
			break;
	}

	//Inventory tooltip
	var tooltip = document.getElementById("tooltip");
	if (tooltip != null && isNaN(Number(tooltip.innerHTML)) == false) {
		$.post("/get_inventory", {"user":"kek"}, function(inventory) {
			$.post("/get_skins_on_inventory_page", {"user":"kek", "page":inventoryPage}, function(inventorySkins) {
				var item = inventory[Number(tooltip.innerHTML)+(inventoryPage*25)-1];
				var skin = inventorySkin[Number(tooltip.innerHTML)-1];
				if (skin.type == "skin") {
					//Decides what color coresponds with the rarity value of the skin
					switch(skin.rarity) {
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
					var prices = skin.price[0];
					if (item.st == true) {
						stat = "StatTrak ";
						prices = skin.price[1];
					}

					//Looking up the price of the gun
					switch(item.exterior) {
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
							throw new Error("A skin with an invalid exterior was found: "+item.exterior);
					}

					//The layout of the inventory tooltip being inserted into the HTML input stream via javascript

					var text = "<div class='row text-center' id='tooltipHeader'><text style='font-size:1em;'>"+stat+skin.skin.displayName+
					"</text></div><div class='row text-left' style='width:100%;'><ul style='list-style-type:none; width:auto;'>"+
					"<li><text>Weapon: "+skin.gun+"</text></li><li><text>Skin: "+skin.skin+
					"</text></li><li><text>Collection: The "+cases[skin.collection].collection+
					" collection</li><li><text>Exterior: "+item.exterior+"</text></li><li><text>Float: "+
					item.flt+"</li></text><li><text>Price: $"+price.toFixed(2)+"</text></li></ul></div>"+
					"<div id='tooltipFloat' class='row text-center'><table id='tooltipFloatTable'><div class='tooltipFloatBG'></div><div class='tooltipFloatBG'></div>"+
					"<div id='tooltipFloatDivider'><tbody><tr><td style='width:7%;'><text style='font-size:0.3em'>FN</text></td><td style='width:8%;'><text style='font-size:0.3em'>MW</text></td>"+
					"<td style='width:23%;'><text>FT</text></td><td style='width:7%;'>"+
					"<text style='font-size:0.2em'>WW</text></td><td style='width:55%;'><text>BS</text></td></tr></tbody></table></div>"

					//Editing the style of the elements via javascript
					tooltip.innerHTML=text;
					document.getElementById("tooltipHeader").style.backgroundColor=color;
					var width = document.getElementById("tooltipFloatTable").offsetWidth;
					var height = document.getElementById("tooltipFloatTable").offsetHeight;
					var divider = document.getElementById("tooltipFloatDivider");
					var bg = document.getElementsByClassName("tooltipFloatBG");
					divider.style.height=height-4;
					divider.style.bottom="-"+(height-2)+"px";
					divider.style.right="-"+Math.floor((item.flt*100)*((width-4)/100)+2)+"px";
					divider.style.marginTop="-"+(height)+"px";
					bg[0].style.height=height-4;
					bg[1].style.height=height-4;
					bg[1].style.width=Math.floor(((1-skin.minFloat)*100)*((width-4)/100));
					bg[0].style.width=Math.floor(((skin.maxFloat)*100)*((width-4)/100));
					bg[0].style.right="-2px"
					bg[1].style.right="-"+((width-2)-Math.floor(((1-skin.minFloat)*100)*((width-4)/100)))+"px";
					bg[0].style.bottom="-"+(height-6)+"px";
					bg[1].style.bottom="-"+(height-6)+"px";
					bg[0].style.marginTop="-"+(height-4)+"px";
					bg[1].style.marginTop="-"+(height-4)+"px";
				}  else if (skin.type == "case" || skin.type == "key") {
					var text = "<div class='row text-center' id='tooltipHeader' style='background-color:#ccccb3;'><text style='font-size:1em;'>"+skin.displayName+
					"</text></div><div class='row text-left' style='width:100%;'><ul style='list-style-type:none; width:auto;'>"+
					"<li><text>Collection: The "+skin.collection+" collection</text></li><li><text>Price: $"+skin.price.toFixed(2)+"</text></li></ul></div>";
					tooltip.innerHTML=text;
				}	else {
					tooltip.innerHTML="Empty slot";
					tooltip.style.width="auto";
					tooltip.style.padding="1em";
				}
			});
		});
	}

	//Unlock case tab
	if (tab == "unlockCase") {
		var caseUnlock = document.getElementById("unlockCase").children[0].children[0].children;
		caseUnlock[0].children[0].children[0].src = keys[cases[rollCaseName].key].image;
		caseUnlock[0].children[2].children[0].src = cases[rollCaseName].image;
		caseUnlock[1].children[0].children[0].innerHTML=keys[cases[rollCaseName].key].displayName;
		caseUnlock[1].children[2].children[0].innerHTML=cases[rollCaseName].displayName;
	}

	if ((isHovered("#inventory img") || isHovered(".custom-menu")) && hoverElement != "") {
		var i = Number(hoverElement.id.substring(3,5));
		if (hoverElement.id.substring(4,5) == "i" || hoverElement.id.substring(4,5) == "s")
			i = Number(hoverElement.id.substring(3,4));
		if (i != hoverInventorySkin && hoverInventorySkin != 0) {
			hoverInventorySkin = 0;
			$("#invContextMenu").hide(0);
			document.getElementById("invContextMenu").innerHTML="";
		} else {
			hoverInventorySkin = i;
			if (i+(inventoryPage*25) <= inventory.length && !document.getElementById("invContextMenu").hasChildNodes()) {
				inventoryItemPosition = i+(inventoryPage*25)-1;
				var skin = inventory[i+(inventoryPage*25)-1];
				if (skin instanceof InventorySkin) {
					var price = 0.00;
					var prices = skin.skin.price[0];
					if (skin.st == true)
						prices = skin.skin.price[1];

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
					document.getElementById("invContextMenu").innerHTML = "<li data-action='sellInventoryItem'>Sell for $"+price.toFixed(2)+"</li>"
				} else if (skin instanceof Case) {
					document.getElementById("invContextMenu").innerHTML = "<li data-action='sellInventoryItem'>Sell for $"+skin.price.toFixed(2)+"</li><li data-action='unlockCase'>Unlock case</li>"
				} else if (skin instanceof Key) {
					document.getElementById("invContextMenu").innerHTML = "<li data-action='sellInventoryItem'>Sell for $"+skin.price.toFixed(2)+"</li>"
				}
			} else if (!(i+(inventoryPage*25) <= inventory.length)) {
				$("#invContextMenu").hide(0);
				document.getElementById("invContextMenu").innerHTML="";
				hoverInventorySkin = 0;
			}
		}
	} else {
		$("#invContextMenu").hide(0);
		document.getElementById("invContextMenu").innerHTML="";
		hoverInventorySkin = 0;
	}
}, 0);

function addMoney(amount) {
	money += amount;
	callEvent("money_change");
}

//////////////////////////////
//BEGIN OF THE EVENT HANDLER//
//////////////////////////////
function subscribeEvent(event, handler) {
	eventBus[event].splice(0, 0, handler);
}

function callEvent(event) {
	if (eventBus[event] != null) {
		for (var i = 0; i < eventBus[event].length; i++)
			eventBus[event][i]();
	} else
		throw new Error("Attempted to call invalid event name '"+event+"'");
}
////////////////////////////
//END OF THE EVENT HANDLER//
////////////////////////////

function postInitialize() {
	callEvent("money_change");
	openInventory(0);
}

function isHovered(id){
    return $(id+":hover").length > 0;
}

//jQuery
$("#headerInventoryButton").click(function() {
	openInventory(0);
});
$("#headerShopButton").click(function() {
	openShop(0);
});
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

$(function() {
	$('.onHover').mouseover(function() {
		if (!$(this).hasClass("custom-menu"))
			hoverElement = this;
	});
});
