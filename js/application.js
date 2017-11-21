var $j = jQuery.noConflict();

$j(document).ready(function() {
	"use strict";

//DOM elements
    var help = $j("#help");
    var placeholder = $j("#placeholder");
    var strength = $j("#strength");
    var hunger = $j("#hunger");

    var room2 = {
        items: [],
        availableRooms: [
            [1, "w", false], 
            [3, "e", false]
        ]
    }

    var player = {
        inventory: [],
        strength: 10,
        hunger: 0,
        currentRoom: room2,
        goToRoom: function(direction) {
            console.log(direction);
            var availableRooms = this.currentRoom.availableRooms;
            var isAccessible  = false;
            for (var i = 0; i < availableRooms.length; i++) {
                if (availableRooms[i][1] == direction) {
                    this.strength --;
                    this.hunger ++;
                    isAccessible = true;
                    insertMessage("There is a door. It opens. You enter Room" + availableRooms[i][0] + ".");
                }
            }
            if (!isAccessible) {
                this.strength --;
                this.hunger ++;
                insertMessage("There is no door in this direction.")
            }
            this.adjustStatus();
        },
        adjustStatus: function() {
            strength.empty().append(this.strength);
            hunger.empty().append(this.hunger);
            if (hunger > 10) {
                insertMessage("You die from hunger! Game over!");
                 $j("form").hide();
            }
            else if (hunger > 5) {
                insertMessage("You are going to need food soon");
            }
        }
         //showInventory
        
        //pickUp(item)
        //fight(monster)
        //useSpell()
        //useKey()
        //eat()
        // describeCurrentRoom: function () {

        // },
    }


    function insertMessage(message) {
        //console.log(message);
        placeholder.empty();
        placeholder.append(message);
    }
    //items
    var sword, food, ring, armor, key;
    //monsters
    var evilKing, hellhound;
    
    //hide help section initially
    help.hide();
    //initial player status
    player.adjustStatus();

    //TODO: functions for:
    //insertMessage, checkHunger, checkStrength

    $j("form").submit(function () {
        console.log('submitted');
        var input = $j("#user-input").val();

        if (input == "help") {
            help.show();
        }
        else if (input == "n" || input == "s" || input=="w" || input =="e") {
            player.goToRoom(input);
        }

        $j("#user-input").val("");


    });

});