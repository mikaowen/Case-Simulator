// JAVASCRIPT (jQuery)

// Trigger action when the contexmenu is about to be shown
$(document).bind("contextmenu", function (event) {
    var open = "";
	if (isHovered("#inventoryTable img"))
		open = "#invContextMenu";
	
	if (open != "") {
		// Avoid the real one
		event.preventDefault();
    
		// Show contextmenu
		$(open).finish().toggle(0).
    
		// In the right position (the mouse)
		css({
			top: event.pageY + "px",
			left: event.pageX + "px"
		});
	}
});


// If the document is clicked somewhere
$(document).bind("mousedown", function (e) {
    
    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu").length > 0) {
        
        // Hide it
        $(".custom-menu").hide(0);
		hoverInventorySkin = 0;
		document.getElementById("invContextMenu").innerHTML="";
    }
});


// If the menu element is clicked
$(document).ready(function(){
	$(".custom-menu").on("click", "li", function() {
		// This is the triggered action name
		switch($(this).attr("data-action")) {
			// A case for each action. Your actions here
			case "sellInventoryItem":
				sellInventoryItem();
				break;
			case "unlockCase":
				unlockCase();
				break;
			default:
				throw new Error("A context menu found with an invalid data action: '"+$(this).attr("data-action")+"'");
		}
	
		// Hide it AFTER the action was triggered
		$(".custom-menu").hide(0);
		hoverInventorySkin = 0;
		document.getElementById("invContextMenu").innerHTML="";
	});
});