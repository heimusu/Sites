'use strict';

function shinmeiSwitch() {
    $("#shinmeiSwitch").html(
        '<form>'+
            '<p>'+
	            '<h4>行き先を選んでください</h4>'+
	            '<select name="dest">'+
	                '<option value="#"></option>'+
	                '<option value="./stop.html#16#1">神明駅行き</option>'+
	                '<option value="./stop.html#16#2">神明苑行き</option>'+
	                '<option value="./stop.html#16#3">JR鯖江駅行き</option>'+
	            '</select>'+
            '</p>'+
            '<input type="button" value="調べる" onClick="location.href = dest.value;location.reload();" class="btn1">'+
        '</form>'
    );

}
shinmeiSwitch();
