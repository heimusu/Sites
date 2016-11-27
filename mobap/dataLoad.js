$(function(){
    $.ajax({
        type:'GET',
        //url:'http://ppdb.sekai.in/api/2/search.json?userID=67472921&callback=?',
        url:'http://ppdb.sekai.in/api/2/data.json?pretty=1&id=1',
        datatype:'json',
        success: function(data){
            //userID:'67472921';
            console.log(data);
            var length = data.data.length;
            /*
            var dataId = new Array();
            var dataName = new Array();
            for(var i = 0; i < length; i++){
                dataId = data.data[i].DataID;
                dataName = data.data[i].DataName;
                //console.log(i,id,name);
            }
            */
            var eventName = data.data[0].DataName;
            $('.eventName').html(eventName);
            var Id = data.data[0].DataID;
            getSearchData(Id);
        },
        error: function(){
            alert('fail');
        }
    });
});

getSearchData = function(Id){
    dataId = String(Id);
    $.ajax({
        type:'GET',
        url:'http://ppdb.sekai.in/api/2/search.json',
        datatype:'json',
        data:{
            //dataId:'110140818',
            dataId : dataId,
            pretty : '1',
            userID : '67472921',
        },
        success: function(Pdata){
            console.log(Pdata);
            //var length = Pdata.data.length;
            var producerName = Pdata.data.records[0].UserName;
            var unitName = Pdata.data.records[0].UnitName;
            var ranking = Pdata.data.records[0].Ranking;
            var score = Pdata.data.records[0].Score;

            $('.Pname').html(producerName);
            $('.unitName').html(unitName);
            $('.ranking').html(ranking+"位");
            $('.score').html(score+"点");
        },
        error: function(){
            alert('fail');
        }
    });
}


