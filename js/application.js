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


    var player = {
        inventory: [],
        strength: 10,
        hunger: 0,
        currentRoom: room2,
        goToRoom: function(direction) {
            //console.log(direction);
            var availableRooms = this.currentRoom.availableRooms;
            var isAccessible  = false;
            for (var i = 0; i < availableRooms.length; i++) {
                if (availableRooms[i][1] == direction) {
                    this.strength --;
                    this.hunger ++;
                    this.currentRoom = rooms[availableRooms[i][0] - 1];
                    //console.log(this.currentRoom);
                    isAccessible = true;
                    insertMessage("There is a door. It opens. You enter Room" + availableRooms[i][0] + ".");
                    //call describeCurrentRoom
                    this.describeCurrentRoom();
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
            if (this.hunger > 10) {
                alert("You die from hunger! Game over!");
                insertMessage("Reload page to start over.");
                 $j("form").hide();
            }
            else if (this.hunger == 5) {
                hunger.css("color", "red");
            }
            if (this.strength <= 0) {
                alert("You die from exhaustion! Game over!");
                insertMessage("Reload page to start over.");
                $j("form").hide();
            }
        },
        describeCurrentRoom: function () {
            if (this.currentRoom.items.length > 0) {
                for (var i = 0; i < this.currentRoom.items.length; i++) {
                    appendMessage(" There is a " + this.currentRoom.items[i] + ".");
                }
            }
            if (this.currentRoom.monsters.length > 0) {
                for (var i = 0; i < this.currentRoom.monsters.length; i++) {
                    appendMessage(" There is a " + this.currentRoom.monsters[i] + ".");
                }
            }
        }
        //showInventory
        //pickUp(item)
        //fight(monster)
        //useSpell()
        //useKey()
        //eat()
    
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
        else {
            insertMessage("I don't know what you mean by " + input + ".");
        }

        $j("#user-input").val("");
    });

});