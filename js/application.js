var room2 = {
    items: [],
    availableRooms [
        [1, "w", false], 
        [3, "e", false]
    ]
}

var player = {
    inventory: [],
    strength: 10,
    hunger: 0,
    //showInventory
    //goTo Room(direction)
    //pickUp(item)
    //fight(monster)
    //useSpell()
    //useKey()
    //eat()

}







var $j = jQuery.noConflict();

$j(document).ready(function() {
	"use strict";
    //status
    var strength = 10;
    var hunger = 0;
    var currentRoom = "room2";
    var inventory = [];
    //items
    var sword, food, ring, armor, key;
    //monsters
    var evilKing, hellhound;
    //DOM elements
    var help = $j("#help");

    //Functions
    function insertMessage(message) {
        
    }

    //hide help section initially
    help.hide();

    //TODO: functions for:
    //insertMessage, checkHunger, checkStrength

    $j("form").submit(function () {
        console.log('submitted');
        var input = $j("#user-input").val();

        if (input == "help") {
            help.show();
        }


        $j("user-input").val("");

    });

});