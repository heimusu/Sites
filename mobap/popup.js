$(function(){
    $.ajax({
        type:'GET',
        url:'http://ppdb.sekai.in/api/2/search.json',
        datatype:'ison',
        success: function(data){
            //userID:'67472921',
            console.log(data);
        }
    });
});
