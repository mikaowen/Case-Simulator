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
}, 100);

$("#headerInventoryButton").click(function() {
	openInventory();
});
$("#headerShopButton").click(function() {
	openShop();
});
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

//Tooltip API
(function($){
	$(document).ready(function(){
		$("[title]").style_my_tooltips({
			tip_follows_cursor:true,
			tip_delay_time:0,
			tip_fade_speed:0,
		});
	});
})(jQuery);