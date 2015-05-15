var getInformation;

getInformation = function(){
    return $.ajax({
        //url: "http://feeds.feedburner.com/fukui/YCFt",
        url: "http://feeds.feedburner.com/google/westinthefareast",
        dataType: "xml",
        success: function(data){
            return console.log(data);
        }
    });
};

function processCode(){
    getInformation();
}

processCode();
