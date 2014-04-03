$( function(){
    $('#ajax-button2').click(
	function(){
	    $.ajax({
		url:'http://tutujibus.com/busstopLookup.php?rosenid=1&callback=?',
		type:'GET',
		dataType:'jsonp',
		jsonp:'callback',
		success:function(data){
		    alert("ok");
		    console.log(data);

		    /*
		    var length = data.timetable.length; 
		    for(var i=0;i<length;i++){
			var arraylistlength = data.timetable[i].list.length;
			for(var j=0;j<arraylistlength;j++){
			    if(data.timetable[i].list[j].busstopid == 1){
				console.log('%s,%s,%s',data.timetable[i].binid,data.timetable[i].list[j].time,data.timetable[i].destination);
			    }
			}
		    }
		    */

		    alert("end");

		},
		error:function(data){
		    alert("Access NG");
		},
		complete:function(data){
		    alert("complete");
		}
	    });
	});
});

