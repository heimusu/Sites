var getLog;
getLog = function(){
    return $.ajax({
    url:"http://feeds.feedburner.com/naver/FqIS",
    dataType:"xml",
    type:"GET",
    success:function(data){
        var $xml = $.parseXML(data.responseText);
        var $result = $($xml);
        var realUrl = new Array();
        var realTitle = new Array();
        var count;
        var loop = 0;

        //単体のテキストとして抽出されるので区切って抽出
        $result.find("body").each(function(){
            var $text = $(this).text();
            var splitText = $text.split("GMT");
            var countUrl = splitText.length;
            for(var i=0; i<countUrl; i++){
                realUrl[i] = splitText[i].match("https?://[a-zA-Z0-9\-_\.:@!~*'\(¥);/?&=\+$,%#]+");
            }
            count = countUrl;
            });
        


        $result.find("title").each(function(loop){
            var $title = $(this).text();
            realTitle[loop] = $title;
            loop++;
        });
        console.log(realTitle);

        for(var i=0; i<count; i++){
            if(i === 0 && i === 1)
                $("#contents1").append("<a href=" + realUrl[i] + ">" + realTitle[i] + "</a>" + "<br>");
            else if(i >= 2)
                $("#contents1").append("<a href=" + realUrl[i] + ">" + realTitle[i-1] + "</a>" + "<br>");
        }
    }

    });
}

getLog();
