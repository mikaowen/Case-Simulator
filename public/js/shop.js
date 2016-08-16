shopPage = 0;

function drawShop() {
	var casesArray = Object.keys(cases);
	for (var i = 1; i < 11; i++) {
		var cn = (i > 5) ? 5+i : i;
		var kn = (i > 5) ? 10+i : 5+i;
		document.getElementById("shop"+cn+"img").src="graphics/misc/transparent.png";
		document.getElementById("shop"+kn+"img").src="graphics/misc/transparent.png";
		document.getElementById("shop"+cn+"b").firstChild.style.display="none";
		document.getElementById("shop"+kn+"b").firstChild.style.display="none";
		document.getElementById("shop"+cn+"img").parentElement.children[1].innerHTML="";
		document.getElementById("shop"+kn+"img").parentElement.children[1].innerHTML="";
		document.getElementById("shop"+cn+"b").firstChild.innerHTML="";
		document.getElementById("shop"+kn+"b").firstChild.innerHTML="";
	}
	for (var i = 1; i < Math.min(casesArray.length+1,11); i++) {
		var cn = (i > 5) ? 5+i : i;
		var kn = (i > 5) ? 10+i : 5+i;
		var c = cases[casesArray[i+(shopPage*20)-1]];
		var k = keys[c.key];
		document.getElementById("shop"+cn+"img").src=c.image;
		document.getElementById("shop"+kn+"img").src=k.image;
		document.getElementById("shop"+cn+"b").firstChild.style.display="inline";
		document.getElementById("shop"+kn+"b").firstChild.style.display="inline";
		document.getElementById("shop"+cn+"img").parentElement.children[1].innerHTML="0";
		document.getElementById("shop"+kn+"img").parentElement.children[1].innerHTML="0";
		document.getElementById("shop"+cn+"b").firstChild.innerHTML="$"+c.price.toFixed(2);
		document.getElementById("shop"+kn+"b").firstChild.innerHTML="$"+k.price.toFixed(2);
		if (inventoryCases[c.collection] != null)
			document.getElementById("shop"+cn+"img").parentElement.children[1].innerHTML=inventoryCases[c.collection];
		if (inventoryKeys[k.collection] != null)
			document.getElementById("shop"+kn+"img").parentElement.children[1].innerHTML=inventoryKeys[k.collection];
	}
}

function buyShopItem(index) {
	var i = index;
	//Key
	if ((index > 5 && index <= 10) || index > 15)
		i -= 5;
	var casesArray = Object.keys(cases);
	var c = cases[casesArray[i+(shopPage*20)-1]];
	var k = keys[c.key];
	//Case
	if (index <= 5 || (index > 10 && index <= 15)) {
		if (money >= c.price) {
			addMoney(c.price*-1);
			addCaseToInventory(c);
			document.getElementById("shop"+index+"img").parentElement.children[1].innerHTML=inventoryCases[c.collection];
		}
		if (money < c.price)
			document.getElementById("shop"+index+"b").firstChild.disabled=true;
	//Key
	} else {
		if (money >= k.price) {
			addMoney(k.price*-1);
			addKeyToInventory(k);
			document.getElementById("shop"+index+"img").parentElement.children[1].innerHTML=inventoryKeys[k.collection];
		}
		if (money < k.price)
			document.getElementById("shop"+index+"b").firstChild.disabled=true;
	}
}

function shopNextPage() {
	shopPage++;
	document.getElementById("shopPageText").innerHTML="Page "+(shopPage+1)+"/"+Math.max(Math.ceil((Object.keys(cases).length)*2/20),1);
	document.getElementById("shopLastPage").disabled = false;
	if (Object.keys(cases).length*2 > (shopPage+1)*20)
		document.getElementById("shopNextPage").disabled = false;
	else
		document.getElementById("shopNextPage").disabled = true;
	drawInventory();
}

function shopLastPage() {
	shopPage--;
	document.getElementById("shopPageText").innerHTML="Page "+(shopPage+1)+"/"+Math.max(Math.ceil((Object.keys(cases).length)*2/20),1);
	document.getElementById("shopNextPage").disabled = false;
	if (shopPage != 0)
		document.getElementById("shopLastPage").disabled = false;
	else
		document.getElementById("shopLastPage").disabled = true;
	drawInventory();
}

function openShop(page) {
	tab = "shop";
	shopPage = page;
	document.getElementById("shopPageText").innerHTML="Page "+(shopPage+1)+"/"+Math.max(Math.ceil((Object.keys(cases).length)*2/20),1);
	document.getElementById("shopLastPage").disabled = true;
	if (Object.keys(cases).length*2 > 20)
		document.getElementById("shopNextPage").disabled = false;
	else
		document.getElementById("shopNextPage").disabled = true;
	drawShop();
}

//Event handlers
subscribeEvent("money_change", function() {
	var casesArray = Object.keys(cases);
	for (var i = 1; i < Math.min(casesArray.length+1,11); i++) {
		var cn = (i > 5) ? 5+i : i;
		var kn = (i > 5) ? 10+i : 5+i;
		var c = cases[casesArray[i+(shopPage*20)-1]];
		var k = keys[c.key];
		if (money < c.price)
			document.getElementById("shop"+cn+"b").firstChild.disabled=true;
		else
			document.getElementById("shop"+cn+"b").firstChild.disabled=false;
		if (money < k.price)
			document.getElementById("shop"+kn+"b").firstChild.disabled=true;
		else
			document.getElementById("shop"+kn+"b").firstChild.disabled=false;
	}
});
