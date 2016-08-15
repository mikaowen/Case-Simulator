rollCaseName = "";
rollItems = [];
rollItemsST = [];
inventoryItemPosition = -1;

function addItemToRollList(contents, skin, st) {
	if (skin != null) {
		rollItems.push(contents[skin]);
		if (st != null) {
			rollItemsST.push(st);
		} else {
			if (Math.random() <= 0.1 && contents[skin].statTrak == true) {
				rollItemsST.push(true);
			} else {
				rollItemsST.push(false);
			}
		}
	} else {
    var t = [[],[],[],[],[]];
		for (var key in contents) {
			t[contents[key].rarity-2].splice(0, 0, contents[key].name);
		}
		var tier = 0;
		var rand = Math.random();
		if (rand <= 0.7879 ) {
			tier = 0;
		} else if (rand <= 0.9575) {
			tier = 1;
		} else if (rand <= 0.9857) {
			tier = 2;
		} else if (rand <= 0.9956) {
			tier = 3;
		} else {
			tier = 4;
		}

    var skin = t[tier][Math.floor(Math.random() * t[tier].length)];
		rollItems.push(contents[skin]);
		if (st != null) {
			rollItemsST.push(st);
		} else {
			if (Math.random() <= 0.1 && contents[skin].statTrak == true) {
				rollItemsST.push(true);
			} else {
				rollItemsST.push(false);
			}
		}
	}
}

function rollCase() {
	tab = "caseRoll";
	window.setTimeout(function() {
		rollItems = [];
		rollItemsST = [];
		var display = document.getElementById("caseRollDisplay");
		var divider = document.getElementById("caseRollDivider");
		var text = "";
		display.innerHTML="";
		$.post("/get_case_contents", {"case":rollCaseName}, function(contents) {
			for (var i = 0; i < 38; i++) {
				addItemToRollList(contents);
				text += "<div style='border:2px solid black; background-size:100% 100%; position:absolute; height:100%; top:0; left:"+
				(i*((divider.offsetWidth-8)/3))+"px; width:"+((divider.offsetWidth-8)/3)+"px;'><img src='graphics/misc/transparent.png' class='caseST'></img></div>";
			}
			for (var i = 0; i < 2; i++) {
				text += "<div style='border:2px solid black; background-size:100% 100%; position:absolute; height:100%; top:0; left:"+
			  ((i+38)*((divider.offsetWidth-8)/3))+"px; width:"+((divider.offsetWidth-8)/3)+"px;'><img src='graphics/misc/transparent.png' class='caseST'></img></div>";
			}

      $.post("/unlock_case", {"user":"kek", "case":rollCaseName}, function(data) {
        if (data != "err" && data != null) {
				  addItemToRollList(contents, data.skin, data.st);
          addItemToRollList(contents);
  				console.log("Waiting for server response...");
  				(function wait() {
  					if (rollItems.length >= 40 && rollItemsST.length >= 40) {
						  console.log("Got response from server!");
						  display.innerHTML=text;
						  for (var i = 0; i < 40; i++) {
							display.children[i].style.backgroundImage = "url("+rollItems[i].image+")";

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
							finishCase();
						} else {
							setTimeout(wait, 500);
  					}
  				})();
  			}
  		});
		});
	},5);
}

function finishCase() {
	rollCaseName = "unknown";
	var i = 0;
	$("#caseRollDisplay div").animate({
		left: "-="+(document.getElementById("caseRollDisplay").lastChild.offsetLeft-(document.getElementById("caseRollDisplay").firstChild.offsetWidth*2))
	}, 5000, function() {
		i++;
		if (i == 40) {
			//inspectSkin(inventory[inventory.length-1]);
		}
	});
}

function unlockCase() {
	$.post("/get_inventory",{"user":"kek"}, function(inventory) {
		rollCaseName = inventory[inventoryItemPosition].name;
	});
	tab = "unlockCase";
}
