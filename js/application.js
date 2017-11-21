var room2 = {
    "items": [],
    "availableRooms": [
        [1, "w", false], 
        [3, "e", false]
    ]
}





var $j = jQuery.noConflict();

$j(document).ready(function() {
	"use strict";
    //status
    var strength = 10;
    var hunger = 0;
    var currentRoom = "room2";
    //items
    var sword, food, ring, armor, key = false;
    //monsters
    var evilKing, hellhound;
    //DOM elements
    var help = $j("#help");

    //hide help section initially
    help.hide();

    //TODO: functions for:
    //insertMessage, pickUp, eat, showInventory, useSpell, goToRoom(direction), useKey, fight(monster), checkHunger, checkStrength

    $j("form").submit(function () {
        console.log('submitted');
        var input = $j("#user-input").val();

        if (input == "help") {
            help.show();
        }


        $j("user-input").val("");

    });

});