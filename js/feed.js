$(function(){
    // $.get('http://heimusu.hatenablog.com/rss')
    $.get('//localhost:3000/php/rss.php')
    .done(function(data){
        console.log(data);
    })
    .fail(function(err){
        alert('load rss error!');
        console.log(err);
    });
});
