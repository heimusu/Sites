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
		    var stop = busstop[0].name;
		    alert(stop);
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

