$( function(){
    $('#ajax-button').click(
	function(){
	    $.ajax({
		url:'http://tutujibus.com/busstopLookup.php?rosenid=1&callback=?',
		type:'GET',
		dataType:'jsonp',
		jsonp:'callback',
		success:function(data){
		    alert("ok");
		    console.log(data);
		    /*var res = JSON.stringify(data);
		    console.log(res);*/
		    //alert(data.busstop[0].id);
		    for(var i=0;i<44;i++){
			var count=0;
			count += data.busstop[i].id;
		    }
		    alert(count);
		},
		error:function(data){
		    alert("ng");
		},
		complete:function(data){
		    alert("complete");
		}
	    });
	});
});

