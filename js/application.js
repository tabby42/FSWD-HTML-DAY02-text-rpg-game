var $j = jQuery.noConflict();

$j(document).ready(function() {
	"use strict";
    //status
    var strength = 10;
    var hunger = 0;
    var stepsTaken = 0;
    var currentRoom = "hallway";
    //items
    var sword, food, ring, armor, key = false;
    //monsters
    var evilKing, hellhound, poisonousBat;
    //DOM elements
    var help = $j("#help");
    
    //hide help section initially
    help.hide();

    //TODO: functions for:
    //pickUp, eat, showInventory, useSpell, goToRoom, useKey, fight

    $j("form").submit(function () {
        console.log('submitted');
        var input = $j("#user-input").val();

        if (input == "help") {
            help.show();
        }


        $j("user-input").val("");

    });

});