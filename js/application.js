var $j = jQuery.noConflict();

$j(document).ready(function() {
	"use strict";

    //variables for accessing DOM elements
    var help = $j("#help");
    var placeholder = $j("#placeholder");
    var strength = $j("#strength");
    var hunger = $j("#hunger");

    //room constructor
    function Room(items, monsters, availableRooms) {
        this.items = items;
        this.monsters = monsters;
        this.availableRooms = availableRooms;
    }
    //create rooms
    var room2 = new Room(
        [],
        [],
        [
            [1, "w", false], 
            [3, "e", false]
        ]
    );

    var room1 = new Room(
        ["sword"],
        [],
        [
            [2, "e", false], 
            [4, "s", false]
        ]
    );

    var room3 = new Room(
        [],
        ["hellhound"],
        [
            [2, "w", false], 
            [6, "s", false]
        ]
    );

    var room4 = new Room(
        ["food"],
        ["hellhound"],
        [
            [1, "n", false], 
            [7, "s", false]
        ]
    );

     var room5 = new Room(
        ["dragon"],
        ["king"],
        [
            [8, "s", false]
        ]
    );

    var room6 = new Room(
        ["food"],
        [],
        [
            [3, "n", false],
            [9, "s", false]
        ]
    );

    var room7 = new Room(
        ["ring"],
        [],
        [
            [4, "n", false],
            [8, "e", false]
        ]
    );

    var room8 = new Room(
        ["armor"],
        [],
        [
            [5, "n", false],
            [7, "w", false],
            [9, "e", false]
        ]
    );

    var room9 = new Room(
        ["key"],
        [],
        [
            [6, "n", false],
            [8, "w", false]
        ]
    );
    //put all the rooms in an array
    var rooms = [room1, room2, room3, room4, room5, room6, room7, room8, room9];

    //object for player
    var player = {
        inventory: [],
        strength: 10,
        hunger: 0,
        currentRoom: room2,
        kingIsDead: false,
        usedMagic: false,
        goToRoom: function(direction) {
            //console.log(direction);
            var availableRooms = this.currentRoom.availableRooms;
            var isAccessible  = false;
            for (var i = 0; i < availableRooms.length; i++) {
                if (availableRooms[i][1] == direction) {
                    this.strength --;
                    this.hunger ++;
                    this.currentRoom = rooms[availableRooms[i][0] - 1];
                    isAccessible = true;
                    insertMessage("There is a door. It opens. You enter Room" + availableRooms[i][0] + ".<br>");
                    //call describeCurrentRoom
                    this.describeCurrentRoom();
                }
            }
            if (!isAccessible) {
                this.strength --;
                this.hunger ++;
                insertMessage("There is no door in this direction.<br>")
            }
            //update status
            this.adjustStatus();
        },
        adjustStatus: function() {
            strength.empty().append(this.strength);
            hunger.empty().append(this.hunger);
            if (this.hunger > 10) {
                alert("You die from hunger! Game over!");
                insertMessage("Reload page to start over.<br>");
                 $j("form").hide();
            }
            else if (this.hunger == 5) {
                hunger.css("color", "red");
            }
            if (this.strength <= 0) {
                alert("You die from exhaustion! Game over!");
                insertMessage("Reload page to start over.<br>");
                $j("form").hide();
            }
        },
        describeCurrentRoom: function () {
            if (this.currentRoom.items.length > 0) {
                for (var i = 0; i < this.currentRoom.items.length; i++) {
                    appendMessage("There is a " + this.currentRoom.items[i] + ".<br>");
                }
            }
            if (this.currentRoom.monsters.length > 0) {
                for (var i = 0; i < this.currentRoom.monsters.length; i++) {
                    appendMessage("There is a " + this.currentRoom.monsters[i] + ".<br>");
                }
            }
        },
        pickUp: function (item) {
            //check if current room has item
            //yes -> move item to inventory
            //not handled yet --> more than one item per room
            if (this.currentRoom.items.length > 0) {
                for (var i = 0; i < this.currentRoom.items.length; i++) {
                    var temp = this.currentRoom.items[i];
                    this.currentRoom.items.pop();
                    //console.log(this.currentRoom.items);
                    if (temp == "sword") {
                        this.strength += 20;
                        this.inventory.push(temp);
                        appendMessage("<p>You picked up a " + temp + ".</p>");
                    } else if (temp == "food") {
                        this.hunger -=5;
                        appendMessage("<p>You picked up a " + temp + ".</p>");
                    } else if (temp == "armor" || temp == "ring" || temp == "key") {
                        this.strength += 5;
                        this.inventory.push(temp);
                        appendMessage("<p>You picked up a " + temp + ".</p>");
                    }
                    else if (temp == "dragon" && this.kingIsDead == true && this.usedMagic == true) {
                        insertMessage("You are a hero! You saved the dragon from the evil king! YOU WON!<br>");
                        $j("form").hide();
                    }
                    else if (temp == "dragon" && this.kingIsDead == false && this.usedMagic == true) {
                        appendMessage("You have to kill the king first in order to pick up the dragon!");
                    }
                    else if (temp == "dragon" && this.kingIsDead == true && this.usedMagic == false) {
                        appendMessage("You have to use magic to free the dragon!");
                    }
                }
                //update status
                this.adjustStatus();
            } else {
                appendMessage("<p>There is no item to pick up here.</pr>");
            }
        },
        showInventory: function () {
            var basket = "";
            if (this.inventory.length > 0) {
                for (var i = 0; i < this.inventory.length; i++) {
                    basket += this.inventory[i] + "<br>";
                }
                appendMessage("<br>Your inventory:<br>" + basket);
            }
            else {
                appendMessage("<br>Your inventory is empty.");
            }
        },
        fight: function () {
            //check if there is a monster in this room
            //not yet handled --> more than one monster per room
            if (this.currentRoom.monsters.length > 0) {
                for (var i = 0; i < this.currentRoom.monsters.length; i++) {
                    if (this.currentRoom.monsters[i] == "king") {
                        this.strength -= 40;
                        this.adjustStatus();
                        if (this.strength > 0) {
                            this.kingIsDead = true;
                            appendMessage("The King is dead!");
                        }
                        // else {
                        //     alert("You die! Game over!");
                        //     insertMessage("Reload page to start over.<br>");
                        //     $j("form").hide();
                        // }
                    }
                    else if (this.currentRoom.monsters[i] == "hellhound") {
                        this.strength -= 5;
                        this.adjustStatus();
                        if (this.strength > 0) {
                            appendMessage("You killed the hellhound");
                        }
                        this.currentRoom.monsters.pop();
                    }
                }
            }
        },
        useSpell: function () {
            //check if ring is in inventory and if dragon is in the room
            var ringIsThere = false;
            if (this.inventory.length > 0 && this.currentRoom.items[0] == "dragon") {
                for (var i = 0; i < this.inventory.length; i++) {
                    if (this.inventory[i] == "ring") {
                        ringIsThere = true;
                    } 
                }
            }
            if (!ringIsThere ) {
                appendMessage("You haven't found the magic ring yet.");
            } else {
                appendMessage("You broke the spell! Now you can save the dragon!");
            }
         }
         //TODO: useKey
     }

    function insertMessage(message) {
        placeholder.empty();
        placeholder.append(message);
    }

    function appendMessage(message) {
        placeholder.append(message);
    }
    
    //hide help section initially
    help.hide();
    //initial player status
    player.adjustStatus();

    //handle user input
    $j("form").submit(function () {
        //console.log('submitted');
        var input = $j("#user-input").val();

        if (input == "help") {
            help.show();
        }
        else if (input == "-h") {
            help.hide();
        }
        else if (input == "n" || input == "s" || input=="w" || input =="e") {
            player.goToRoom(input);
        }
        else if (input == "p") {
            player.pickUp(input);
        }
        else if (input =="i") {
            player.showInventory();
        }
        else if (input == "f") {
            player.fight();
        }
        else {
            insertMessage("I don't know what you mean by " + input + ".");
        }
        //empty text input field
        $j("#user-input").val("");
    });

});