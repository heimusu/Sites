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
		    var res = JSON.stringify(data);
		    console.log(res);
		    /*$.each(data,function(){
			alert(data.id);
		    });*/
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

