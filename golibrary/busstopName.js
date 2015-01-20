$( function(){
    $.ajax({
	    url:'http://tutujibus.com/busstopLookup.php?rosenid=1&callback=?',
		type:'GET',
		dataType:'jsonp',
		jsonp:'callback',
		success:function(data){
            var stopname;
		    $(function(){
			var length = data.busstop.length;
			var n;
            var url = $.url();
            /*
			var hash = location.hash;
			hash = hash.substring(1);
            */
            var hash = url.fparam('dest');
			for(n=0;n<length;n++){
			    if(data.busstop[n].id == hash){
				stopname = data.busstop[n].name;
			    }
			}
			//console.log(stopname);
			$('title').html(stopname);
			$('#busstopname').html(stopname);
			$('#indicate').html(stopname + "発・中央線のバスの運行時間についてお知らせします");
		});
	    },
	    error:function(){
		alert("ng");
	    }
	});
});

