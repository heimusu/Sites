$( function(){
    $('#ajax-button').click(
	function(){
	    $.ajax({
		url:'http://tutujibus.com/timetableLookup.php?rosenid=1&callback=?',
		type:'GET',
		dataType:'jsonp',
		jsonp:'callback',
		success:function(data){
		    alert("ok");
		    console.log(data);

		    /*data convert for text*/
		    /*var res = JSON.stringify(data);
		    console.log(res);*/
		    /*alert(data.timetable[0].destination);
		    alert(data.timetable[0].list[0].time);*/
		    
		    
		    for(var i=0;i<19;i++){
			var arraylistlength = data.timetable[i].list.length;
			for(var j=0;j<arraylistlength;j++){
			    if(data.timetable[i].list[j].busstopid == 1){
				console.log('%s,%s,%s',data.timetable[i].binid,data.timetable[i].list[j].time,data.timetable[i].destination);
			    }
			}
		    }

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

