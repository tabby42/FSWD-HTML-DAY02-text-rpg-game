var $j = jQuery.noConflict();

$j(document).ready(function() {
	"use strict";
    //$j('#msg-board').hide();
    var currentRoom = "hallway";
    //items
    var sword, food, ring, armor, key = false;

    var help = $j("#help");

    help.hide();

    $j("form").submit(function () {
        console.log('submitted');
        var input = $j("#user-input").val();

        if (input == "help") {
            help.show();
        }


        $j("user-input").val("");

    });

});